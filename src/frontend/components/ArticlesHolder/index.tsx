import React, { useEffect, useState, useContext } from "react";
import AppContext from '../../context';
import './styles.css';
import ArticleCard from "../ArticleCard";

const ArticlesHolder: React.FC = () => {
    const { articles } = useContext(AppContext);
    const sortedArticles = articles.sort((a: any, b: any) => new Date(b.first_published_at).getTime() - new Date(a.first_published_at).getTime());
    console.log(sortedArticles)
    return (
        <div id="articles-holder">
            {
                sortedArticles
                    ? sortedArticles.map((article: any) => {
                        return (
                            <div
                                key={`${article.medium_id}`}
                            >
                                <ArticleCard article={article}/>
                            </div>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default ArticlesHolder;
