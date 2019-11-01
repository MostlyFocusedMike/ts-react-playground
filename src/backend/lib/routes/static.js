module.exports = {
    method: 'GET',
    path: '/{param*}',
    options: {
        description: 'Static asset delivery directory',
        notes: "This route uses hapi's Inert plugin to serve static content, mainly the actual build html file",
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
            },
        },
    },
};
