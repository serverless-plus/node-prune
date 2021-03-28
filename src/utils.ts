import { Stats, statSync, readdirSync, rmdir, unlink } from 'fs';
import { basename, resolve as pathResolve, relative as pathRelative } from 'path';
import minimatch from 'minimatch';
import glob from 'fast-glob';
import { IS_MOCK, DEFAULT_DIRS_MAP, DEFAULT_FILES_MAP, DEFAULT_EXTS_MAP } from './constants';

export function getFileExtention(filename: string) {
  const dotArr = filename.split('.');
  return dotArr[dotArr.length - 1];
}

export function getDirStats(dirPath: string) {
  const info = {
    size: 0,
    total: 0,
  };
  const items = readdirSync(dirPath);
  for (const item of items) {
    const itemPath = pathResolve(dirPath, item);

    try {
      const fileStats = statSync(itemPath);

      if (fileStats.isDirectory()) {
        const { size, total } = getDirStats(itemPath);
        info.size += size;
        info.total += total;
      } else {
        info.size += fileStats.size;
        info.total++;
      }
    } catch (e) {
      // no op
    }
  }
  return info;
}

export function isPrune(filePath: string, fileStats: Stats, include: string[] = []): boolean {
  const filename = basename(filePath);
  const ext = getFileExtention(filename);

  for (let i = 0, len = include.length; i < len; i++) {
    if (minimatch(filePath, include[i])) {
      return true;
    }
  }

  // default dir
  if (fileStats.isDirectory()) {
    return DEFAULT_DIRS_MAP[filename];
  }

  if (include.indexOf(filePath) !== -1) {
    return true;
  }

  // default file
  if (DEFAULT_FILES_MAP[filename]) {
    return true;
  }

  // default extention
  if (DEFAULT_EXTS_MAP[ext]) {
    return true;
  }

  return false;
}

export async function pruneDir({
  dirPath,
  include = [],
  exclude = [],
}: {
  dirPath: string;
  include?: string[];
  exclude?: string[];
}) {
  const info = {
    size: 0,
    total: {
      dir: 0,
      file: 0,
    },
  };

  const items = await glob('**/*', {
    cwd: dirPath,
    dot: true,
    onlyFiles: false,
    ignore: exclude,
  });

  for (const item of items) {
    const itemPath = pathResolve(dirPath, item);
    const relativeItemPath = pathRelative(dirPath, itemPath);

    try {
      const fileStats = statSync(itemPath);

      if (isPrune(relativeItemPath, fileStats, include)) {
        if (fileStats.isDirectory()) {
          info.total.dir++;
          const { size } = getDirStats(itemPath);
          info.size += size;
          if (IS_MOCK) {
            continue;
          }
          rmdir(itemPath, { recursive: true }, () => {
            // no op
          });
        } else {
          info.size += fileStats.size;
          info.total.file++;
          if (IS_MOCK) {
            continue;
          }
          unlink(itemPath, () => {
            // no op
          });
        }
      } else if (fileStats.isDirectory()) {
        const subInfo = await pruneDir({ dirPath: itemPath, include, exclude });
        info.size += subInfo.size;
        info.total.dir += subInfo.total.dir;
        info.total.file += subInfo.total.file;
      }
    } catch (e) {
      // no op´
    }
  }

  return info;
}
