const Article = require('../../models/article');

exports.seed = async (knex) => {
    await knex('tags').del();
    await knex('articles').del();

    // 'software-engineering',
    // 'software-development',
    // multiple create (all objects, even relationships must be new)
    await Article.createManyWithTags([
        {
            medium_id: '16f1a7e639a0',
            title: 'Attention New Devs: Professionals Google Stuff. A Lot.',
            link: 'https://medium.com/@mikecronin92/attention-new-devs-professionals-google-stuff-a-lot-16f1a7e639a0',
            image: 'https://miro.medium.com/max/1400/1*_vTEr9GqtFOUmhS3Cvjp2Q.jpeg',
            subtitle: 'And that’s a good thing',
            first_published_at: '2019-08-19T11:37:28.949Z',
            tags: [
                {
                    name: 'JavaScript',
                    slug: 'javascript',
                },
                {
                    name: 'Coding Bootcamp',
                    slug: 'codingbootcamp',
                },
                // should be ignored, move to test in the future you BUM
                {
                    name: 'Software Engineering',
                    slug: 'software-engineering',
                },
                {
                    name: 'Software Development',
                    slug: 'software-development',
                },
            ],
        },
        {
            medium_id: 'b39840f75c4f',
            title: 'How to Build a Dynamic, Controlled Form with React Hooks (2019)',
            link: 'https://medium.com/@mikecronin92/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f',
            image: 'https://WRONGLINK',
            subtitle: 'React Hooks help simplify a tricky concept',
            first_published_at: '2019-07-31T23:42:42.647Z',
            tags: [
                {
                    name: 'JavaScript', // this should not get created again
                    slug: 'javascript',
                },
                {
                    name: 'React',
                    slug: 'react',
                },
            ],
        },
        // move this to a test
        {
            medium_id: 'b39840f75c4f',
            title: 'How to Build a Dynamic, Controlled Form with React Hooks (2019)',
            link: 'https://medium.com/@mikecronin92/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f',
            image: 'https://miro.medium.com/max/1400/1*cElSU8pY7J_Ky6pg9bEe_w.jpeg',
            subtitle: 'React Hooks help simplify a tricky concept',
            first_published_at: '2019-07-31T23:42:42.647Z',
            tags: [
                {
                    name: 'JavaScript', // this should not get created again
                    slug: 'javascript',
                },
                {
                    name: 'React',
                    slug: 'react',
                },
            ],
        },
    ]);


    const articles = await Article.all();

    // see what was made
    for (let i = 0; i < articles.length; i++) {
        console.log('\nArticle: ', articles[i]);
        const tags = await articles[i].listRelations('tags'); // eslint-disable-line no-await-in-loop
        console.log('\nTags: ', tags);
    }
};
