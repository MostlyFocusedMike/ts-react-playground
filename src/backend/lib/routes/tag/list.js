module.exports = {
    method: 'GET',
    path: '/tags',
    options: {
        handler: async (request, h) => {
            const { Tag } = request.server.app.Database;
            return Tag.all();
        },
    },
};
