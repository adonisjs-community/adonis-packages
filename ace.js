/* eslint-disable import/first */
/*
|--------------------------------------------------------------------------
| JavaScript entrypoint for running ace commands
|--------------------------------------------------------------------------
|
| Since, we cannot run TypeScript source code using "node" binary, we need
| a JavaScript entrypoint to run ace commands.
|
| This file runs "bin/console.ts" file as a child process and uses "ts-node/esm"
| loader to run TypeScript code.
|
| Executing this file is same as running the following command.
| "node --loader=ts-node/esm bin/console.js"
|
*/

process.env.TS_NODE_PROJECT = 'tsconfig.node.json'

import { aceShell } from '@adonisjs/core/ace/shell'

await aceShell(new URL('./', import.meta.url)).handle(process.argv.splice(2))
