import React, { useEffect, useState } from 'react';
import './styles.css';

const TestAdapter = {
    getTest1: () => {
        return fetch('/test/1').then(r=>{
            if (r.ok) return r.json()
            console.log('r1', r);
            throw new TypeError('Failed to fetch')
        })
    },
    getTest2: () => {
        return fetch('/test/2').then(r=>{
            if (r.ok) return r.json()
            throw new TypeError('Failed to fetch')
        })
    },
}
console.log('hi')
const TestExample: React.FC = () => {
    const [test1, setTest1] = useState<{msg: string} | null>(null);
    const [test2, setTest2] = useState<{msg: string} | null>(null);
    useEffect(() => {
        TestAdapter.getTest1()
            .then((res) => {
                setTest1(res);
            })
            .then(() => {
                TestAdapter.getTest2().then(setTest2)
            })
            .catch(console.log);
    }, []);

    return (
        <>
            <h1>Hello test</h1>
            <h2>{test1 && test1.msg}</h2>
            <h2>{test2 && test2.msg}</h2>
        </>
    )
};

export default TestExample;
