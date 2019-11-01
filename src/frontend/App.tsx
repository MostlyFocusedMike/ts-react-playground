import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import { ArticleAdapter } from './adapters';
import AppContext from './context';
import MediumJsonLink from './components/MediumLink';
import MediumForm from './components/MediumForm';
import ArticlesHolder from './components/ArticlesHolder';
import ArticleForm from './components/ArticleForm';

// export const MediumConverterContainer: React.FC<PropsItf> = (props) => {
const App: React.FC = () => {
    const {
        setArticles,
    } = useContext(AppContext);

    useEffect(() => {
        ArticleAdapter.getAllWithTags().then(setArticles);
    }, []);

    return (
        <div id='app'>
            <h1>Raw Medium Text Converter</h1>
            <MediumJsonLink />
            <MediumForm />
            <ArticleForm />
            <a href='/articles?tags=true' target="_self">
                <h2>Get JSON of all articles</h2>
            </a>
            <ArticlesHolder />
        </div>
    )
}

export default App;