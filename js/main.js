document.addEventListener('DOMContentLoaded', function() {
    // --- WOW Effect: Aurora Background ---
    document.body.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
        document.documentElement.style.setProperty('--glow-x', `${x}%`);
        document.documentElement.style.setProperty('--glow-y', `${y}%`);
    });

    // --- WOW Effect: Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.postlist-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Добавляем задержку на основе индекса для эффекта "волны"
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
});
