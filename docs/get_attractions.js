const https = require('https');
const fs = require('fs');
const path = require('path');

// URL страницы для скачивания
const url = 'https://yandex.ru/maps/11062/kislovodsk/?l=sat%2Cskl&ll=42.723857%2C43.905043&mode=usermaps&source=constructorLink&um=constructor%3A28894a6b481fdfd243034587fde216b811bf491268774c427686de89050c7497&z=15';

// Имя файла для сохранения
const fileName = path.join(__dirname, 'map.html');

// Функция для скачивания страницы
https.get(url, (res) => {
  // Проверка статуса ответа
  if (res.statusCode !== 200) {
    console.error(`Не удалось скачать страницу. Статус-код: ${res.statusCode}`);
    return;
  }

  // Создание потока записи в файл
  const fileStream = fs.createWriteStream(fileName);

  // Запись данных в файл
  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Страница успешно сохранена в ${fileName}`);
  });
}).on('error', (err) => {
  console.error(`Произошла ошибка: ${err.message}`);
});
