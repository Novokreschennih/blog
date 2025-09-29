import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// --- НАША КЛЮЧЕВАЯ НАСТРОЙКА ---
	// Копируем папки css и js в итоговый сайт.
	// Папка public уже копируется стандартной конфигурацией ниже.
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	// ------------------------------------

	// Стандартные настройки из шаблона (оставляем их)
	eleventyConfig.addPassthroughCopy({ "./public/": "/" });
	eleventyConfig.addWatchTarget("css/**/*.css");
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");
	
	eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, { formats: ["avif", "webp", "auto"], htmlOptions: { imgAttributes: { loading: "lazy", decoding: "async" } }, sharpOptions: { animated: true } });
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(IdAttributePlugin);

	// Остальные плагины и шорткоды из шаблона...
	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// Drafts logic
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) data.title = `${data.title} (draft)`;
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
	});

	// Feed Plugin (для RSS)
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed/feed.xml",
		collection: { name: "posts", limit: 10 },
		metadata: {
			language: "ru",
			title: "Блог SetHubble",
			subtitle: "Новости, обновления и инсайты от команды SetHubble.",
			base: "https://blog.sethubble.ru/",
			author: { name: "SetHubble" }
		}
	});
};

export const config = {
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "content",
		includes: "../_includes",
		data: "../_data",
		output: "_site"
	},
};
