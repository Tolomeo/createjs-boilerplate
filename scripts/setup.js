#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const shell = require("shelljs");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const rootDirectory = fs.realpathSync(process.cwd());
const gitDirectory = path.join(rootDirectory, ".vscode")
const setupScript = path.resolve(rootDirectory, path.join("scripts", "setup.js"));
const readMeFile = path.resolve(rootDirectory, "README.md");
const readmeContent = `
# Project README

It is nice to document properly your project here, so other developers won't struggle getting on board.
Even your future self will benefit from this.

Have a look [here](https://github.com/othneildrew/Best-README-Template) for a nice starting template.
`;

// 1. removing .git dir
shell.rm("-rf", gitDirectory);
// 2. removing setup script 
fs.unlinkSync(setupScript);
// 3. overriding README
fs.writeFileSync(readMeFile, readmeContent);
// 4. initialising a new git project
// exec('git init && git add . && git commit -m "Initial commit"', (err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Done. Enjoy!");
// });
