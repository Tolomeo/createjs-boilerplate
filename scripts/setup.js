#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const rootDirectory = fs.realpathSync(process.cwd());
const gitDirectory = path.join(rootDirectory, ".git");
const setupScript = path.resolve(rootDirectory, path.join("scripts", "setup.js"));
const readmeFile = path.resolve(rootDirectory, "README.md");
const readmeContent = `
# Project README

It is nice to document properly your project here, so other developers won't struggle getting on board.
Even your future self will benefit from this.

Have a look [here](https://github.com/othneildrew/Best-README-Template) for a nice starting template.
`;

// 1. removing .git dir
console.info(chalk.blueBright(`Removing git directory at ${gitDirectory}`));
shell.rm("-rf", gitDirectory);
// 2. removing setup script
console.info(chalk.blueBright(`Removing setup script file at ${setupScript}`));
shell.rm(setupScript);
// 3. overriding README
console.info(chalk.blueBright(`Writing readme file at ${readmeFile}`));
shell.ShellString(readmeContent).to(readmeFile);
// 4. initialising a new git project
console.info(chalk.blueBright(`Initialising new git project`));
shell.exec(`git init`);
shell.exec(`git add .`);
shell.exec(`git commit -m "Initial commit"`);
// Done
console.info(chalk.green(`Done. Enjoy!`));
