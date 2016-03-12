var config  = require('./config');
var env     = process.env.NODE_ENV || 'development';

console.log(__dirname + '/../client/styles');

module.exports = [
    require('inert'),
    require('vision'),

    {
        register: require('hapi-couchdb'),

        options: {
            url:    config[env].datasource.url,
            db:     config[env].datasource.database
        }
    },

    {
        register: require('good'),

        options: {
            reporters: [
                {
                    reporter: require('good-console'),

                    events: {
                        log:        '*',
                        response:   '*'
                    }
                }
            ]
        }
    }
];