import RawMediumToJSON from './raw-medium-to-json';
import { mediumTextDump } from '../../mocks/utilities-test-mocks/mock-medium-text-dump';
// @ts-ignore
import mockOutput from '../../mocks/utilities-test-mocks/mock-output.json';

describe('RawMediumToJson Tests', () => {
    let converter: any;

    beforeEach(() => {
        converter = new RawMediumToJSON(mediumTextDump, 'mikecronin92');
    });

    it('should initialize', () => {
        expect(converter.userHandle).toEqual('mikecronin92');
        expect(converter.rawText).toEqual(mediumTextDump);
    });

    it('Should output json of all the articles', () => {
        expect(converter.niceJSONArticles).toEqual(mockOutput);
    })
});
