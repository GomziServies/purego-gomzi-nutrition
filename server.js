// Yash sutariya
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

const routes = require('./src/routes');

const hostname = 'https://www.gomzilifesciences.in/';

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname });

    routes.forEach((route) => {
        sitemap.write({ url: route.path, changefreq: 'monthly', priority: 0.7 });
    });

    sitemap.end();

    const xmlString = await streamToPromise(sitemap);
    fs.writeFileSync('public/sitemap.xml', xmlString);
    console.log('Sitemap generated successfully!');
}

generateSitemap();
