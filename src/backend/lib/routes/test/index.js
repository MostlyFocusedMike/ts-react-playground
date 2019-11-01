module.exports = {
    method: 'GET',
    path: '/test',
    options: {
        handler: async (request, h) => {
            return { msg: 'ok' };
        },
    },
};
