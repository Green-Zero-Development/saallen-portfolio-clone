const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchQuestions() {
    urlToCache = metaData.apiUrl + '/questions?per_page=100&_fields=acf';
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

async function processQuestions(siteQuestions) {
    return Promise.all(
        siteQuestions.map(async (question) => {
            return await {
                question: question.acf.question,
                answer: question.acf.answer
            }
        })
    );
}

module.exports = async () => {
    const siteQuestions = await fetchQuestions();
    const processedQuestions = await processQuestions(siteQuestions);
    return processedQuestions;
};