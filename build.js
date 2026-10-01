const fs = require('fs');
const path = require('path');

const root = __dirname;
const output = path.join(root, 'dist');
const files = ['index.html', 'services.html', 'styles.css', 'script.js', 'services.js'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

console.log(`Built ${files.length} files into ${path.relative(root, output)}/`);
