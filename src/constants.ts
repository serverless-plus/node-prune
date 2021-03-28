const DEFAULT_FILES: string[] = [
  'Jenkinsfile',
  'Makefile',
  'Gulpfile.js',
  'Gruntfile.js',
  'gulpfile.js',
  '.DS_Store',
  '.tern-project',
  '.gitattributes',
  '.editorconfig',
  '.eslintrc',
  'eslint',
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yml',
  '.eslintignore',
  '.stylelintrc',
  'stylelint.config.js',
  '.stylelintrc.json',
  '.stylelintrc.yaml',
  '.stylelintrc.yml',
  '.stylelintrc.js',
  '.htmllintrc',
  'htmllint.js',
  '.lint',
  '.npmrc',
  '.npmignore',
  '.jshintrc',
  '.flowconfig',
  '.documentup.json',
  '.yarn-metadata.json',
  '.travis.yml',
  'appveyor.yml',
  '.gitlab-ci.yml',
  'circle.yml',
  '.coveralls.yml',
  'CHANGES',
  'changelog',
  'LICENSE.txt',
  'LICENSE',
  'LICENSE-MIT',
  'LICENSE.BSD',
  'license',
  'LICENCE.txt',
  'LICENCE',
  'LICENCE-MIT',
  'LICENCE.BSD',
  'licence',
  'AUTHORS',
  'CONTRIBUTORS',
  '.yarn-integrity',
  '.yarnclean',
  '_config.yml',
  '.babelrc',
  '.yo-rc.json',
  'jest.config.js',
  'karma.conf.js',
  'wallaby.js',
  'wallaby.conf.js',
  '.prettierrc',
  '.prettierrc.yml',
  '.prettierrc.toml',
  '.prettierrc.js',
  '.prettierrc.json',
  'prettier.config.js',
  '.appveyor.yml',
  'tsconfig.json',
  'tslint.json',
];

const DEFAULT_DIRS: string[] = [
  '__tests__',
  'test',
  'tests',
  'powered-test',
  'docs',
  'doc',
  '.idea',
  '.vscode',
  'website',
  'images',
  'assets',
  'example',
  'examples',
  'coverage',
  '.nyc_output',
  '.circleci',
  '.github',
];

const DEFAULT_EXTS: string[] = [
  'markdown',
  'md',
  'mkd',
  'ts',
  'jst',
  'coffee',
  'tgz',
  'swp',
];

const DEFAULT_FILES_MAP: Record<string, boolean> = {};
DEFAULT_FILES.forEach((item: string) => {
  DEFAULT_FILES_MAP[item] = true;
});

const DEFAULT_DIRS_MAP: Record<string, boolean> = {};
DEFAULT_DIRS.forEach((item: string) => {
  DEFAULT_DIRS_MAP[item] = true;
});

const DEFAULT_EXTS_MAP: Record<string, boolean> = {};
DEFAULT_EXTS.forEach((item: string) => {
  DEFAULT_EXTS_MAP[item] = true;
});

const IS_MOCK = process.env.MOCK;

export {
  IS_MOCK,
  DEFAULT_FILES_MAP,
  DEFAULT_DIRS_MAP,
  DEFAULT_EXTS_MAP,
};
