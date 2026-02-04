const selectors = require('../page-objects/DashboardObjects.js'); // Adjust path as needed

class PDP {
    constructor(page) {
        this.page = page;
        this.selectors = selectors;
    }

    async openCategory(category = "Electronics") {
        const categoryMap = {
            "Books": "books",
            "Computers": "computers",
            "Electronics": "electronics",
            "Apparel & Shoes": "apparel_and_shoes",
            "Apparel Shoes": "apparel_and_shoes",
            "Digital Downloads": "digital_downloads",
            "Jewelry": "jewelry",
            "Gift Cards": "gift_cards"
        };

        const normalizedCategory = categoryMap[category] || category.toLowerCase().replace(/ /g, "_");
        const categorySelector = this.selectors.categories[normalizedCategory];

        if (!categorySelector) {
            throw new Error(`Category "${category}" not found`);
        }

        await this.page.click(categorySelector);
        await this.page.waitForLoadState('networkidle');
    }

    async openFirstItemFromCategory() {
        await this.page.waitForSelector(this.selectors.pdp.product_item);
        const firstProduct = this.page.locator(this.selectors.pdp.product_title).first();
        await firstProduct.click();
        await this.page.waitForLoadState('networkidle');
    }

    async addProductToWishList() {
        await this.page.waitForSelector(this.selectors.pdp.product_essential);
        await this.page.click(this.selectors.pdp.add_to_wishlist);
        await this.page.waitForSelector(this.selectors.pdp.success_notification);
    }

    async getWishlistCount() {
        const countElement = this.page.locator(this.selectors.pdp.wishlist_count);
        if (await countElement.isVisible()) {
            const text = await countElement.textContent();
            return parseInt(text.replace(/[()]/g, '')) || 0;
        }
        return 0;
    }
}

module.exports = { PDP };