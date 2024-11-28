module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  url: 'http://185.22.232.20:1337', // замените YOUR_SERVER_IP на IP-адрес вашего VPS
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});

