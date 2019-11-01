module.exports = {
    method: 'GET',
    path: '/test1',
    options: {
        handler: async (request, h) => {
            return { msg: 'test1 is first' };
        },
    },
};
