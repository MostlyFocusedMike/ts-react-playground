import React, { useEffect, useState } from 'react';
import './styles.css';

const TestAdapter = {
    getTest1: () => {
        return fetch('/test1').then(r=>r.json())
    },
    getTest2: () => {
        return fetch('/test2').then(r=>r.json())
    }
}

const TestExample: React.FC = () => {
    const [test1, setTest1] = useState<{msg: string} | null>(null);
    const [test2, setTest2] = useState<{msg: string} | null>(null);
    useEffect(() => {
        TestAdapter.getTest1().then(setTest1);
    }, [test1]);

    useEffect(() => {
        TestAdapter.getTest2().then(setTest2);
    }, [test2]);

    return (
        <>
            <h1>Hello test</h1>
            <h2>{test1 && test1.msg}</h2>
            <h2>{test2 && test2.msg}</h2>
        </>
    )
};

export default TestExample;
