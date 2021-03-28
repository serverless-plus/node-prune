import { program } from 'commander';
import { join, resolve as pathResolve } from 'path';
import prettyBytes from 'pretty-bytes';
import { spinner } from './spinner';
import { pruneDir } from './utils';

export interface PruneOptions {
  cwd?: string;
  exclude?: string[];
  include?: string[];
}

export async function prune(options: PruneOptions) {
  spinner.start('Start pruning...');
  const cwd = pathResolve(options.cwd || process.cwd());
  const cwdNodeModules = join(cwd, 'node_modules');

  const start = process.hrtime();
  const info = await pruneDir({
    dirPath: cwdNodeModules,
    include: options.include,
    exclude: options.exclude,
  });
  const [seconds, nanoSeconds] = process.hrtime(start);

  const prettySize = prettyBytes(info.size);

  const diffMiliSeconds = (seconds * 1000 + nanoSeconds / 1e6).toFixed(3);
  spinner.succeed(
    `Pruned ${info.total.dir} dirs, ${info.total.file} files, size: ${prettySize}, cost: ${diffMiliSeconds}ms`,
  );

  return info;
}

function commaSeparatedList(value: string) {
  return value.split(',');
}

const pruneCommand = (): void => {
  program
    .description('Prune command for project')
    .option(
      '-e --exclude <exclude>',
      'Glob of files that should not be pruned. Multiple exclude use , to separate.',
      commaSeparatedList,
    )
    .option(
      '-i --include <include>',
      'Globs of files that should always be pruned in addition to the defaults. Multiple include use , to separate.',
      commaSeparatedList,
    )
    .action((options: PruneOptions) => {
      prune(options);
    });
};

export { pruneCommand };
