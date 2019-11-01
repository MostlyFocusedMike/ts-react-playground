import React, { useState, useContext } from 'react';
import { ArticleAdapter } from '../../adapters';
import AppContext from '../../context';
import './styles.css';


interface formStateIntf {
    articleLink: string;
    articleTitleSubtitle: string;
    articleImage: string;
    articlePublished: string;
    articleTags: string;
}

const ArticleForm: React.FC = () => {
    const defaultState = {
        articleLink: '',
        articleTitleSubtitle: '',
        articleImage: '',
        articlePublished: '',
        articleTags: '',
    }

    const [formState, setFormState] = useState<formStateIntf>(defaultState);
    const { articles, setArticles } = useContext(AppContext);

    const pullOutTitleAndSubtitle = () => {
        const [title, subtitle] = formState.articleTitleSubtitle.split('\n');
        return { title, subtitle };
    }

    const pullOutTags = () => {
        const rawTags = formState.articleTags.split('\n');
        const tags = rawTags.map(tag => ({
            name: tag,
            slug: tag.toLowerCase().replace(' ', '-').replace("'",''),
        }));
        return { tags };
    }

    const formatArticle = () => {
        const { articleImage, articlePublished } = formState;
        return {
            medium_id: formState.articleLink.split('-').slice(-1)[0],
            link: formState.articleLink,
            image: articleImage,
            first_published_at: new Date(articlePublished).toISOString(),
            ...pullOutTitleAndSubtitle(),
            ...pullOutTags(),
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>): void => {
        setFormState({
            ...formState,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        ArticleAdapter.createOne(formatArticle())
            .then((newArticle) => setArticles([...articles, newArticle]))
            .then(() => setFormState(defaultState));
    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>Individual Article Form</h2>
            <label htmlFor='article-url'>Article URL</label>
            <input
                type='text'
                id='article-url'
                name='articleLink'
                onChange={handleChange}
                value={formState.articleLink}
            />
            <label htmlFor='article-title-subtitle'>Article Title and Subtitle</label>
            <p>The title and subtitle should be separated by a newline</p>
            <textarea
                id='article-title-subtitle'
                name='articleTitleSubtitle'
                onChange={handleChange}
                value={formState.articleTitleSubtitle}
            />
            <label htmlFor='article-published'>Article First Published at</label>
            <input
                type='text'
                id='article-published'
                name='articlePublished'
                onChange={handleChange}
                value={formState.articlePublished}
            />
            <label htmlFor='article-image'>Article Image Link</label>
            <input
                type='text'
                id='article-image'
                name='articleImage'
                onChange={handleChange}
                value={formState.articleImage}
            />
            <label htmlFor='article-tags'>Paste your tags, each separated with a newline:</label>
            <textarea
                id='article-tags'
                name='articleTags'
                value={formState.articleTags}
                onChange={handleChange}
            />
            <input
                type='submit' value='Save Article'
            />
        </form>
    )
};

export default ArticleForm;
