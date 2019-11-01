import React, { useState, useContext } from 'react';
import Constants from '../../../constants'
import RawMediumToJSON from '../../utilities/raw-medium-to-json';
import { ArticleAdapter } from '../../adapters';
import AppContext from '../../context';
import './styles.css';

const MediumForm: React.FC = () => {
    const [rawText, setRawText] = useState('');
    const {setArticles } = useContext(AppContext);

    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        setRawText(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const madeArticles = new RawMediumToJSON(rawText, Constants.USERNAME).niceJSONArticles;
        ArticleAdapter.createAll(madeArticles).then((res => {
            setArticles(res);
        }));
    };

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='raw-medium-text-input'>Paste your Medium text into here:</label>
            <textarea
                id='raw-medium-text-input'
                value={rawText}
                onChange={handleChange}
            />
            <input
                type='submit' value='Convert'
            />
        </form>
    )
};

export default MediumForm;
