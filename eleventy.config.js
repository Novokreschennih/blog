import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// --- ПЛАГИНЫ ---
	eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation);

	// --- КОПИРОВАНИЕ СТАТИЧНЫХ ФАЙЛОВ ---
	// Это самая важная часть для нашего дизайна
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy({ "public/": "/" });

	// --- RSS ЛЕНТА ---
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed/feed.xml",
		collection: { name: "posts", limit: 10, },
		metadata: {
			language: "ru",
			title: "Блог SetHubble",
			subtitle: "Новости, обновления и инсайты от команды SetHubble.",
			base: "https://blog.sethubble.ru/",
			author: { name: "SetHubble" }
		}
	});

	// Фильтры для дат (стандартные)
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return new Date(dateObj).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
	});
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return new Date(dateObj).toISOString().split('T')[0];
	});
};

export const config = {
	templateFormats: ["md", "njk", "html", "liquid"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "content",
		includes: "../_includes",
		data: "../_data",
		output: "_site"
	},
};
