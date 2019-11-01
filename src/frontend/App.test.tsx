import React from 'react'
import { render, fireEvent, cleanup, getByText } from '@testing-library/react';
import App from './App';
import { mediumTextDump } from '../mocks/utilities-test-mocks/mock-medium-text-dump';
import Constants from '../constants';


describe('App tests', () => {
    const setup = () => {
        const utils = render(<App />);
        const textarea = utils.getByLabelText('paste your Medium', { exact: false });
        const convertButton = utils.getByText('Convert');
        const mediumJSONlink = utils.getByText('Go here and click', { exact: false });
        return {
            textarea,
            convertButton,
            mediumJSONlink,
            ...utils,
        };
    }

    afterEach(cleanup)

    it('should render', () => {
        const { getByText } = setup();
        expect(getByText('Raw Medium Text Converter')).toBeTruthy();
    })

    it('Should link to the proper page for a given user', () => {
        const { mediumJSONlink } = setup();
        expect(mediumJSONlink.getAttribute('href')).toEqual(`https://medium.com/@${Constants.USERNAME}/latest?format=json`);
    })

    it('should take text in the controlled textarea', () => {
        const { textarea } = setup();
        fireEvent.change(textarea, { target: { value: 'dummy data' } });
        // remember: textarea has textContent, inputs have input.value
        expect(textarea.textContent).toBe('dummy data');
    });

    it('should submit and convert articles', () => {
        const { textarea, convertButton } = setup();
        fireEvent.change(textarea, { target: { value: mediumTextDump } });
        expect(textarea.textContent).toBe(mediumTextDump);
        fireEvent.click(convertButton);

        // TODO how do you want to use the formatted articles
    });
})