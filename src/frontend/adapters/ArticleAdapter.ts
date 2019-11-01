import { niceJSONArticlesIntf } from '../utilities/raw-medium-to-json';

class ArticleAdapter {
    static url = '/articles';
    static options: RequestInit = { // RequestInit is fetch's options interface
        method: 'GET',
        credentials: 'include', // fetch doesn't include cookies by default
        headers: {
            accepts: 'application/json',
        },
    };

    static getAll() {
        return fetch(this.url, this.options).then(response => response.json());
    }

    static getAllWithTags() {
        return fetch(`${this.url}?tags=true`, this.options).then(response => response.json());
    }

    static createAll(niceJSONArticles: niceJSONArticlesIntf[]) {
        const postOptions = {
            ...this.options,
            method: 'POST',
            body: JSON.stringify(niceJSONArticles)
        };
        return fetch('/create-from-medium', postOptions).then(response => response.json());
    }

    static createOne(niceJSONArticle: niceJSONArticlesIntf) {
        const postOptions = {
            ...this.options,
            method: 'POST',
            body: JSON.stringify(niceJSONArticle)
        };
        return fetch(this.url, postOptions).then(response => response.json());
    }
}

export default ArticleAdapter;