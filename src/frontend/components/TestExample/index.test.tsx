import React from 'react'
import { render, fireEvent, cleanup, getByText, findByText, waitForElement } from '@testing-library/react';
import TestExample from '.';
import {setDefaultRoutes, overrideRoute, resetFetch} from './fetchMachine';

describe('Fetch mock tests', () => {
    beforeAll(setDefaultRoutes)

    const setup = () => {
        // fetchMachine();
        const utils = render(<TestExample />);
        return {
            ...utils,
        };
    }

    afterEach(cleanup)
    afterAll(resetFetch)

    it('runs', async () => {
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        await waitForElement(() => getByText(/test 2/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs and catches overrid', async () => {
        overrideRoute('TestAdapter', 'getOneID2', {msg: 'test 2 override'})
        const { getByText, debug } = setup();
        await waitForElement(() => getByText(/test 1/));
        await waitForElement(() => getByText(/test 2 override/));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });
});
