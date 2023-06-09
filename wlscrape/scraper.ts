

import axios from 'axios';
import cheerio from 'cheerio';

interface Product {
    title: string;
    description: string;
    price: string;
    discount: string;
}

export const scrapeWebsite = async (): Promise<Product[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'https://wltest.dns-systems.net/';
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            return resolve($('.pricing-table .package').map((_index, element) => {
                const title = $(element).find('.header h3').text().trim();
                const description = $(element).find('.package-features .package-description').text().trim();
                const price = $(element).find('.package-features .package-price span').text().trim();
                const discount = $(element).find('.package-features .package-price p').text().trim();
                return { title, description, price, discount };
            }).get().sort((a, b) => parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', ''))));

        } catch (error) {
            return reject('Connection Error');
        }
    });
};

scrapeWebsite().then(result => console.log(result)).catch(error => console.error('An error occurred while scraping the website:', error));
