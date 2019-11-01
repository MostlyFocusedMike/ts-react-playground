const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/articles',
    options: {
        validate: {
            query: {
                tags: Joi.boolean().optional().description('Whether or not you want tags included with each article'),
            },
        },
        handler: async (request, h) => {
            const { Article } = request.server.app.Database;
            const articles = request.query.tags
                ? await Article.getArticlesWithTags()
                : await Article.all();
            return articles.sort((a, b) => new Date(b.first_published_at) - new Date(a.first_published_at));
        },
    },
};
