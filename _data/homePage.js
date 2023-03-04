const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchHomePage() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&slug=home-page';
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

async function processHomePage(homePage) {
    return await {
        id: homePage[0].id,
        title: homePage[0].title.rendered,
        slug: homePage[0].slug,
        yoast: homePage[0].yoast_head,
        template: homePage[0].template,
        hasHero: homePage[0].acf.hero_section_question,
        heroImg: homePage[0].acf.hero_section.background_image.url,
        heroImgAlt: homePage[0].acf.hero_section.background_image.alt,
        heroTitle: homePage[0].acf.hero_section.title,
        heroTitleColor: homePage[0].acf.hero_section.title_color,
        heroParagraph: homePage[0].acf.hero_section.paragraph,
        heroButtonText: homePage[0].acf.hero_section.button.text,
        heroButtonLink: homePage[0].acf.hero_section.button.link,
        servicesSection: homePage[0].acf.services_section,
        processSection: homePage[0].acf.process_section,
        aboutSection: homePage[0].acf.about_section,
    };
}

module.exports = async () => {
    const homePage = await fetchHomePage();
    const processedHomePage = await processHomePage(homePage);
    return processedHomePage;
};