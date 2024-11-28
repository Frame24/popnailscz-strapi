const fs = require('fs');
const axios = require('axios');
const path = require('path');

const locales = ['cs-CZ', 'en', 'ru'];
const API_BASE_URL = 'http://localhost:1337';

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('finish', resolve)
      .on('error', reject);
  });
}

async function processImages(images) {
  for (const image of images) {
    // Основное изображение
    const mainImageUrl = image.url;
    const mainImagePath = path.join('public', 'images', path.basename(mainImageUrl));
    await downloadImage(`${API_BASE_URL}${mainImageUrl}`, mainImagePath);
    image.url = `/images/${path.basename(mainImageUrl)}`;

    // Форматы изображений
    if (image.formats) {
      for (const formatKey of Object.keys(image.formats)) {
        const formatUrl = image.formats[formatKey].url;
        const formatPath = path.join('public', 'images', path.basename(formatUrl));
        await downloadImage(`${API_BASE_URL}${formatUrl}`, formatPath);
        image.formats[formatKey].url = `/images/${path.basename(formatUrl)}`;
      }
    }
  }
}

async function exportData() {
  for (const locale of locales) {
    const endpoints = {
      heroSection: `/api/hero-sections?locale=${locale}&populate[0]=Button`,
      studioInfos: `/api/studio-infos?locale=${locale}&populate[0]=StudioComponents&populate[1]=StudioComponents.Icon`,
      priceList: `/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP`,
      reviewSection: `/api/review-sections?locale=${locale}&populate[0]=Review&populate[1]=Button`,
      faq: `/api/faqs?locale=${locale}&populate[0]=QA`,
      blog: `/api/blog-sections?locale=${locale}&populate[0]=Blog`,
      contact: `/api/contacts?locale=${locale}&populate[0]=Contact`,
      bookingSection: `/api/booking-sections?locale=${locale}&populate[0]=Button`,
      socials: `/api/socials?locale=${locale}&populate=*`,
      footer: `/api/footers?locale=${locale}`,
      navbar: `/api/navbars?locale=${locale}`,
      heroImage: `/api/first-section-background?locale=${locale}&populate=*`,
      galleryImages: `/api/gallery-of-work?locale=${locale}&populate=*`,
      studioImages: `/api/studio?locale=${locale}&populate=*`,
      seoData: `/api/seos?locale=${locale}&populate=*`
    };

    for (const [key, endpoint] of Object.entries(endpoints)) {
      try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        let data = response.data;

        if (key === 'galleryImages' || key === 'studioImages') {
          // Обработка изображений в галереях
          const galleryData = data.data;
          for (const galleryItem of galleryData.Images) {
            await processImages(galleryItem.Images || []);
          }
        } else {
          // Стандартная обработка для других типов данных
          if (Array.isArray(data.data)) {
            for (const item of data.data) {
              const imageUrl = item.attributes?.image?.url || item.attributes?.icon?.url;
              if (imageUrl) {
                const localImagePath = path.join('public', 'images', path.basename(imageUrl));
                await downloadImage(`${API_BASE_URL}${imageUrl}`, localImagePath);
                if (item.attributes.image) item.attributes.image.url = `/images/${path.basename(imageUrl)}`;
                if (item.attributes.icon) item.attributes.icon.url = `/images/${path.basename(imageUrl)}`;
              }
            }
          } else if (data.data) {
            // Обработка объектов (не массивов)
            const item = data.data;
            const imageUrl = item.attributes?.image?.url || item.attributes?.icon?.url;
            if (imageUrl) {
              const localImagePath = path.join('public', 'images', path.basename(imageUrl));
              await downloadImage(`${API_BASE_URL}${imageUrl}`, localImagePath);
              if (item.attributes.image) item.attributes.image.url = `/images/${path.basename(imageUrl)}`;
              if (item.attributes.icon) item.attributes.icon.url = `/images/${path.basename(imageUrl)}`;
            }
          }
        }

        // Сохранение данных в JSON-файл
        const dataDir = path.join(process.cwd(), 'data', locale);
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(path.join(dataDir, `${key}.json`), JSON.stringify(data, null, 2));
        console.log(`Данные для ${key} (${locale}) успешно сохранены.`);
      } catch (error) {
        console.error(`Ошибка при получении данных с ${endpoint}: ${error.message}`);
      }
    }
  }
}

exportData()
  .then(() => console.log('Экспорт данных и изображений завершен'))
  .catch((err) => console.error('Ошибка при экспорте данных:', err));
