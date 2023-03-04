const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPages() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,modified,yoast_head,template,acf&per_page=100&exclude=15,94';
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

async function processPages(wpages) {
    return Promise.all(
        wpages.map(async (wpage) => {
            if (wpage.template == "templates/thank-you.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_section.title,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link
                };
            } else if (wpage.template == "templates/contact-us.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            } else if (wpage.template == "templates/services.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    hasHero: wpage.acf.hero_section_question,
                    heroImg: wpage.acf.hero_section.background_image.url,
                    heroImgAlt: wpage.acf.hero_section.background_image.alt,
                    heroTitle: wpage.acf.hero_section.title,
                    heroTitleColor: wpage.acf.hero_section.title_color,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link,
                    serviceList: wpage.acf.services
                };
            } else if (wpage.template == "templates/process.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    hasHero: wpage.acf.hero_section_question,
                    heroImg: wpage.acf.hero_section.background_image.url,
                    heroImgAlt: wpage.acf.hero_section.background_image.alt,
                    heroTitle: wpage.acf.hero_section.title,
                    heroTitleColor: wpage.acf.hero_section.title_color,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link,
                };
            } else if (wpage.template == "templates/about.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    hasHero: wpage.acf.hero_section_question,
                    heroImg: wpage.acf.hero_section.background_image.url,
                    heroImgAlt: wpage.acf.hero_section.background_image.alt,
                    heroTitle: wpage.acf.hero_section.title,
                    heroTitleColor: wpage.acf.hero_section.title_color,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link,
                    contentBoxes: wpage.acf.content_boxes,
                    founders: wpage.acf.founders,
                    teamMembers: wpage.acf.team_members.team_member
                };
            } else if (wpage.template == "templates/privacy-and-terms.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    hasHero: wpage.acf.hero_section_question,
                    heroImg: wpage.acf.hero_section.background_image.url,
                    heroImgAlt: wpage.acf.hero_section.background_image.alt,
                    heroTitle: wpage.acf.hero_section.title,
                    heroTitleColor: wpage.acf.hero_section.title_color,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link,
                    policyText: wpage.acf.policy_text
                };
            } else {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            }
        })
    );
}

module.exports = async () => {
    const wpages = await fetchPages();
    const processedWPages = await processPages(wpages);
    return processedWPages;
};