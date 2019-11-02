
interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: {
            route: string;
            response: any;
            method?: string;
            status?: number;
        }
    }
}

const mockAdapters: MockAdaptersIntf = {
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

export default mockAdapters;
