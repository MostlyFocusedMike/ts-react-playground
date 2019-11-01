import React, { useEffect } from 'react';
import './styles.css';

const TestAdapter = {
    get: () => {
        return fetch('/test').then(r=>r.json())
    }
}

const TestExample: React.FC = () => {
    useEffect(() => {
        TestAdapter.get().then(console.log);
    }, []);

    return (
        <h1>Hello test</h1>
    )
};

export default TestExample;
