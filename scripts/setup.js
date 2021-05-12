#!/usr/bin/env node
/* eslint-disable no-console */

const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const chalk = require("chalk");

const rootDirectory = fs.realpathSync(process.cwd());
const packageJson = path.join(rootDirectory, "package.json");
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
console.info(chalk.cyan(`Removing git directory at ${gitDirectory}`));
shell.rm("-rf", gitDirectory);
// 2. removing setup script
console.info(chalk.cyan(`Removing setup script file at ${setupScript}`));
shell.rm(setupScript);
// 3. overriding README
console.info(chalk.cyan(`Writing readme file at ${readmeFile}`));
shell.ShellString(readmeContent).to(readmeFile);
// 4. Removing setup dependencies
console.info(chalk.cyan(`Removing setup dependencies`));
const packageJsonContent = JSON.parse(shell.cat(packageJson).toString());
delete packageJsonContent.scripts.presetup;
delete packageJsonContent.scripts.setup;
delete packageJsonContent.dependencies.shelljs;
delete packageJsonContent.dependencies.chalk;
shell.ShellString(JSON.stringify(packageJsonContent, null, 2)).to(packageJson);
// 5. Initialising a new git project
console.info(chalk.cyan(`Initialising new git project`));
shell.exec(`git init`);
shell.exec(`git add .`);
shell.exec(`git commit -m "Initial commit"`);
// 6. Installing dependencies
console.info(chalk.cyan(`Installing project dependencies`));
shell.exec(`yarn`);
// Done
console.info(chalk.green(`Done. Enjoy!`));
