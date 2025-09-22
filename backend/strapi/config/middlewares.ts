export default ({ env }) => ([
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {},
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [env('FRONTEND_URL', 'http://localhost:3000')],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]);
