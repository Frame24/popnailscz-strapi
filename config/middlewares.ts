export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      timeout: 300000, // Устанавливаем таймаут в миллисекундах (5 минут)
      maxFileSize: 100000000, // Устанавливаем максимальный размер файла (опционально, например, 100 MB)
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
