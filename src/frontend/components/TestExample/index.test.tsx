import React from 'react'
import { render, fireEvent, cleanup, getByText, findByText, waitForElement } from '@testing-library/react';
import TestExample from '.';
import { APIRequest } from './apiRequest'

// import { act } from 'react-dom/test-utils';

// function mockFetch(data: any) {
//     return jest.fn().mockImplementation(() => Promise.resolve({
//         ok: true,
//         json: () => data,
//     }));
// }

// window.fetch = mockFetch({msg: 'test1'})

describe('Fetch mock tests', () => {
    const setup = () => {
        const utils = render(<TestExample />);
        return {
            ...utils,
        };
    }
    beforeEach(() => {
    })

    afterEach(cleanup)

    it('runs', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({msg: 'test1'}));
        fetchMock.mockResponseOnce(JSON.stringify({msg: 'test2'}));
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText('test1'));
        await waitForElement(() => getByText('test2'));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });

});