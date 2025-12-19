document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('assets/data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        const products = await response.json();

        // Render Featured Products (Index Page)
        const featuredContainer = document.getElementById('featured-products');
        if (featuredContainer) {
            const featuredItems = products.filter(p => p.featured);
            renderProducts(featuredItems, featuredContainer);
        }

        // Render Gemi Products (Gemi Page)
        const gemiContainer = document.getElementById('product-grid');
        if (gemiContainer) {
            // Note: The original page only showed "Gemi Maketleri" but the JSON has other categories.
            // We strictly filter for "Gemi Maketleri" as per the page title.
            // However, looking at the JSON, IDs 1,4,7,10-15 are Gemi.
            const gemiItems = products.filter(p => p.category === 'Gemi Maketleri');
            renderProducts(gemiItems, gemiContainer);
        }

    } catch (error) {
        console.error('Error loading products:', error);
    }
});

function renderProducts(items, container) {
    container.innerHTML = items.map(product => `
        <div class="group cursor-pointer">
            <div class="relative overflow-hidden aspect-[4/3] bg-brand-secondary/20 mb-4">
                <div class="absolute inset-0 bg-brand-primary/10 group-hover:bg-brand-primary/0 transition-colors duration-500"></div>
                <!-- Placeholder Icon/Text -->
                <div class="absolute inset-0 flex items-center justify-center text-brand-secondary/40">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            <h3 class="text-xl text-brand-dark font-heading font-semibold text-center group-hover:text-brand-primary transition-colors">${product.title}</h3>
            ${product.category ? `<p class="text-brand-secondary text-sm text-center font-body mt-1">${product.category}</p>` : ''}
        </div>
    `).join('');
}
