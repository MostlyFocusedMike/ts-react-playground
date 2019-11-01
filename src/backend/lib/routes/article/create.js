const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/articles',
    options: {
        validate: {
            payload: Joi.object({
                medium_id: Joi.string().description('A uuid like id assigned by medium'),
                title: Joi.string().description("The article's title"),
                link: Joi.string().uri().description('Link to the article itself'),
                image: Joi.string().uri().description("Link to the article's cover image"),
                subtitle: Joi.string().allow(null, '').description('An optional subtitle of the article'),
                first_published_at: Joi.string().description('ISO timestring of when medium first published the article'),
                tags: Joi.array().items(Joi.object(
                    {
                        name: Joi.string().description('Display text for the tag'),
                        slug: Joi.string().description('Display but with lowercase and no spaces, used to identify duplicates in db'),
                    },
                )),
            }),
        },
        handler: async (request, h) => {
            const { Article } = request.server.app.Database;
            console.log('request.payload: ', request.payload);
            const article = await Article.createOrUpdateWithTags(request.payload);
            console.log('article: ', article);
            return article;
        },
    },
};
