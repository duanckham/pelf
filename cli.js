#!/usr/bin/env node

const copydir = require('copy-dir');

if (process.argv.length >= 3) {
  let projectName = process.argv[2];

  console.log('Processing...');
  copydir.sync(`${__dirname}/materials`, `${process.env.PWD}/${projectName}`);
  console.log('Done.\n');
  console.log('  - Create development config file:');
  console.log(`    \`mv ${projectName}/app/project/config/development.new.js ${projectName}/app/project/config/development.js\`\n`);
  console.log('  - Start web (http://localhost:10001):');
  console.log(`    \`cd ${projectName}/app/project && npm run build-dev\`\n`);
  console.log('  - Start endpoints:');
  console.log(`    \`cd ${projectName}/app/project && npm run start-endpoints\`\n`);
  console.log('  - Deploy on production:');
  console.log(`    \`docker-compose build && docker-compose -f docker-compose.yml up --no-deps -d\`\n`);
  console.log('Have a good time.');
} else {
  console.log('Please provide the folder name of the project.');
}
