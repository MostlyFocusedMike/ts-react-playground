interface rawTagIntf {
    name: string,
    slug: string,
    postCount: number,
    metadata: object,
    type: string,
}

interface rawArticleIntf {
    id: string;
    title: string;
    uniqueSlug: string;
    firstPublishedAt: number;
    virtuals: {
        previewImage: {
            imageId: string;
        },
        tags: rawTagIntf[];
    };
    content: {
        subtitle: string;
    };
}

export interface niceJSONArticlesIntf {
    medium_id: string;
    title: string;
    link: string;
    image: string;
    subtitle: string;
    tags: {
        name: string;
        slug: string;
    }[];
}[]

class RawMediumToJSON {
    rawText: string;
    userHandle: string;
    constructor(rawText: string, userHandle: string) {
        this.userHandle = userHandle;
        this.rawText = rawText;
    }

    checkForImage = (imageId: string) => (
        imageId
            ? `https://miro.medium.com/max/1400/${imageId}`
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pictogram_voting_question.svg/440px-Pictogram_voting_question.svg.png'
    );

    formatTags = (tags: rawTagIntf[]) => tags.map((tag) => ({ name: tag.name, slug: tag.slug }));

    formatArticle = (rawArticle: rawArticleIntf) => {
        const {
            id: medium_id,
            title,
            uniqueSlug,
            virtuals: { previewImage: { imageId }, tags },
            content: { subtitle },
            firstPublishedAt,
        } = rawArticle;

        const link = `https://medium.com/@${this.userHandle}/${uniqueSlug}`;

        return {
            medium_id,
            title,
            link,
            image: this.checkForImage(imageId),
            subtitle,
            first_published_at: new Date(firstPublishedAt).toISOString(),
            tags: this.formatTags(tags),
        };
    };

    get roughJSONArticles() {
        return JSON.parse(this.rawText.slice(this.rawText.indexOf('{'))).payload.references.Post;
    }

    get niceJSONArticles() {
        return Object.keys(this.roughJSONArticles).map(article => this.formatArticle(this.roughJSONArticles[article]));
    }
}

export default RawMediumToJSON;
