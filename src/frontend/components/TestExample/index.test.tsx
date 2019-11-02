import React from 'react'
import { render, fireEvent, cleanup, getByText, findByText, waitForElement } from '@testing-library/react';
import TestExample from '.';
const fetchMock = require('fetch-mock');

// import { act } from 'react-dom/test-utils';

// function mockFetch(data: any) {
//     return jest.fn().mockImplementation(() => Promise.resolve({
//         ok: true,
//         json: () => data,
//     }));
// }

// window.fetch = mockFetch({msg: 'test1'})


interface AdaptersIntf {
    [ key: string ]: {
        [ key: string ]: {
            route: string;
            response: any;
            method?: string;
            status?: number;
        }
    }
}

const adapters: AdaptersIntf = {
    TestAdapter: {
        getOne: {
            route: '/test/1',
            response: { msg: 'test 1 val' },
        },
        getOneID2: {
            route: '/test/2',
            response: { msg: 'test 2 here' },
        },
    },
};

export const defaultRoutes = () => {
    fetchMock.config.overwriteRoutes = true;

    const defaultOpts = {
        status: 200,
        method: 'GET',
    };

    const arr = Object.values(adapters).forEach(adapter => {
        Object.values(adapter).forEach((properties) => {
            const { route, response, method, status } = {...defaultOpts, ...properties}
            fetchMock.mock(route, {body: response, status}, { method }); // success
            // fetchMock.mock(route, new TypeError('Failed to fetch')); // error? doesn't seem to work
        })
    })
};

const overrideRoute = (adapter: string, adapterFunction: string, newResponse: any, status = 200, method = 'GET',) => {
    if (adapters[adapter] && adapters[adapter][adapterFunction]) {
        const defaultOpts = {
            status: 200,
            method: 'GET',
        };
        const route = adapters[adapter][adapterFunction].route;
        fetchMock.mock(route, {body: newResponse, status}, { method });
    };
}

describe('Fetch mock tests', () => {
    beforeAll(defaultRoutes)

    const setup = () => {
        // fetchMachine();
        const utils = render(<TestExample />);
        return {
            ...utils,
        };
    }

    afterEach(cleanup)

    it('runs', async () => {
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        await waitForElement(() => getByText(/test 2/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs and catches overrid', async () => {
        overrideRoute('TestAdapter', 'getOneID2', {msg: 'test 2 override'})
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        await waitForElement(() => getByText(/test 2 override/));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });
});
