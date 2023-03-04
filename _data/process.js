const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchProcesses() {
    urlToCache = metaData.apiUrl + '/processes?per_page=100&_fields=acf';
    cacheInterval = metaData.cacheInterval;
    try {
        return AssetCache(
            urlToCache,
            {
                duration: cacheInterval,
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processProcesses(siteProcesses) {
    return Promise.all(
        siteProcesses.map(async (process) => {
            return await {
                icon: process.acf.icon.url,
                iconAlt: process.acf.icon.alt,
                title: process.acf.title,
                paragraph: process.acf.paragraph,
                stepNumber: process.acf.step_number
            }
        })
    );
}

module.exports = async () => {
    const siteProcesses = await fetchProcesses();
    const processedProcesses = await processProcesses(siteProcesses);
    return processedProcesses;
};