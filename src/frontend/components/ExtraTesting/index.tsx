import React, {useEffect} from 'react';
import './styles.css';
import Constants from '../../../constants';

const MediumJsonLink: React.FC = () => {

    useEffect(() => {

        fetch('/test')
            .then((res) => {
                console.log(res);
            });
    }, []);

    return (
        <a
            href={`https://medium.com/@${Constants.USERNAME}/latest?format=json`}
            target='_source'
        >
            Go here and click cmd + a to select everything
        </a>
    )
};

export default MediumJsonLink;
