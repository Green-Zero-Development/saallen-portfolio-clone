const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchBottomCta() {
    urlToCache = metaData.apiUrl + '/global-sections?_fields=id,acf&slug=contact-cta-section';
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

async function processBottomCta(bottomCta) {
    return await {
        id: bottomCta[0].id,
        title: bottomCta[0].acf.title,
        paragraph: bottomCta[0].acf.paragraph,
        buttonText: bottomCta[0].acf.button.text,
        buttonLink: bottomCta[0].acf.button.link,
    };
}

module.exports = async () => {
    const bottomCta = await fetchBottomCta();
    const processedBottomCta = await processBottomCta(bottomCta);
    return processedBottomCta;
};