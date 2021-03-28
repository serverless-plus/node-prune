import { program } from 'commander';
import { pruneCommand } from './prune';

// eslint-disable-next-line
const { version } = require('../package.json');

async function run() {
  program.storeOptionsAsProperties(false).passCommandToAction(false);
  program.version(`CLI Version: ${version}`, '-v, --version', 'output the current version');

  pruneCommand();

  program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ np --help');
  });

  program.parse(process.argv);
}

run();
