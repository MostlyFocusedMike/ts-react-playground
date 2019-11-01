import React from "react";
import './styles.css';

interface cardsHolderIntf {
    article: any, // TODO use real interface
}

export const ArticleCard: React.FC<cardsHolderIntf> = ({article}) => {
    const {
        medium_id,
        title,
        link,
        image,
        subtitle,
        tags,
    } = article;
    return (
        <div className="article-card">
            <img src={image} alt="image" />
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
        </div>
    )
}

export default ArticleCard;
