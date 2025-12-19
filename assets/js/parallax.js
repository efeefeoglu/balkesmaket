(function() {
    const bg = document.getElementById('parallax-bg');
    if (!bg) return;

    let isDesktop = window.innerWidth >= 1024;
    let bodyHeight = 0;
    let windowHeight = 0;

    function updateDimensions() {
        isDesktop = window.innerWidth >= 1024;
        bodyHeight = document.body.scrollHeight;
        windowHeight = window.innerHeight;

        if (isDesktop) {
            bg.style.position = 'fixed';
            // Formula: H_bg = H_view + 0.5 * (H_doc - H_view)
            // This ensures we have enough background to cover the scroll movement at 50% speed.
            const requiredHeight = windowHeight + 0.5 * (bodyHeight - windowHeight);
            bg.style.height = `${requiredHeight}px`;
            bg.style.width = '100%';
            updateParallax(); // Initial position update
        } else {
            bg.style.position = 'absolute';
            // Mobile: Stretch to full document height and scroll naturally
            bg.style.height = '100%';
            bg.style.width = '100%';
            bg.style.transform = 'none';
        }
    }

    function updateParallax() {
        if (!isDesktop) return;
        const scrollY = window.scrollY;
        // Move up by 0.5 * scrollY relative to viewport top (since fixed)
        // Since it's fixed at top:0, translateY moves it relative to that.
        bg.style.transform = `translateY(-${scrollY * 0.5}px)`;
    }

    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', () => {
        updateDimensions();
        updateParallax();
    });

    // Observer for content changes (dynamic product loading)
    const observer = new ResizeObserver(() => {
        updateDimensions();
    });
    observer.observe(document.body);

    // Initial call
    updateDimensions();
})();
