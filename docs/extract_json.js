const fs = require('fs');

// Путь к HTML-файлу
const htmlFilePath = 'map.html';

// Путь для сохранения JSON-файла
const jsonFilePath = 'map.json';

// Чтение содержимого HTML-файла
fs.readFile(htmlFilePath, 'utf8', (err, html) => {
  if (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    return;
  }

  // Поиск тега <script> с классом "state-view"
  const scriptTagStart = html.indexOf('class="state-view">');
  const scriptTagEnd = html.indexOf('</script>', scriptTagStart);

  if (scriptTagStart !== -1 && scriptTagEnd !== -1) {
    // Извлечение содержимого тега <script>
    const scriptContent = html.substring(
      scriptTagStart + 'class="state-view">'.length,
      scriptTagEnd
    ).trim();

    // Сохранение содержимого тега <script> в файл JSON
    fs.writeFile(jsonFilePath, scriptContent, 'utf8', (err) => {
      if (err) {
        console.error(`Ошибка при записи файла: ${err.message}`);
      } else {
        console.log(`Содержимое успешно сохранено в ${jsonFilePath}`);
      }
    });
  } else {
    console.log('Тег <script> с классом "state-view" не найден.');
  }
});
