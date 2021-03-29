# @slsplus/node-prune

[![npm](https://img.shields.io/npm/v/@slsplus/node-prune)](http://www.npmtrends.com/@slsplus/node-prune)
[![NPM downloads](http://img.shields.io/npm/dm/@slsplus/node-prune.svg?style=flat-square)](http://www.npmtrends.com/@slsplus/node-prune)
[![Build Status](https://github.com/serverless-plus/node-prune/workflows/Release/badge.svg?branch=master)](https://github.com/serverless-plus/node-prune/actions?query=workflow:Release+branch:master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Node prune tool, prune unnecessary files from ./node_modules, such as markdown, typescript source files, and so on. **Inspired by golang version [tj/node-prune](https://github.com/tj/node-prune)**.

## Installation

```bash
$ npm i @slsplus/node-prune -g
```

## Usage

```bash
$ np -h
Usage: np [options]

Prune command for project

Options:
  -v, --version           output the current version
  -e --exclude <exclude>  Glob of files that should not be pruned. Multiple exclude use , to separate.
  -i --include <include>  Globs of files that should always be pruned in addition to the defaults. Multiple include use , to separate.
  -h, --help              display help for command

Example call:
  $ np --help
```

Start to prune:

```bash
$ np
```

## License

MIT License

Copyright (c) 2020 Serverless Plus
