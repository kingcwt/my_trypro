'use strict';

require('./db/connect_db');
const AuthBearer = require('hapi-auth-bearer-token');

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
(async () => {

    let corsConfig = {
        "maxAge": 86400,
        "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match","cross-origin"],
        "additionalHeaders": [],
        "exposedHeaders": ["WWW-Authenticate", "Server-Authorization"],
        "additionalExposedHeaders": [],
        "credentials": true,
        "origin" : ['*'],
    };
    const server = await new Hapi.Server({
        host: '192.168.1.124',
        port: 3000,
        routes: { cors: corsConfig }
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.00',
        },
    };
    await server.register(AuthBearer);
        server.auth.strategy('simple', 'bearer-access-token', {
            allowQueryToken: true,
            validate:  require('./service/validate').validateFunc
        });
    server.auth.default('simple');

    await server.register([
    require('hapi-auto-route'),
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
})();