module.exports = {
    method: 'GET',
    path: '/test2',
    options: {
        handler: async (request, h) => {
            return { msg: 'test2 goes here' };
        },
    },
};
