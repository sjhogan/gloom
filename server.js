const Hapi          = require('hapi');
const Path          = require('path');
const handlebars    = require('handlebars');
const plugins       = require('./src/server/config/plugins');
const index         = require('./src/server/routes/index');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: 3000 });

server.register(plugins, function(error) {
    if (error) {
        return server.log(error);
    }

    server.views({
        engines: {
            'html': {
                module:     handlebars,
                isCached:   process.env.NODE_ENV === 'production'
            }
        },

        relativeTo: `${ __dirname }/src/server`,
        path:       './views'
    });

    server.route(index);

    server.start(() => server.log('info', `Server started on ${ server.info.uri }`));
});
