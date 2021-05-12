#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

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

// 1 Installing dependencies
console.info(chalk.cyan(`Installing dependencies`));
shell.exec(`yarn`);
// 2. removing .git dir
console.info(chalk.cyan(`Removing git directory at ${gitDirectory}`));
shell.rm("-rf", gitDirectory);
// 3. removing setup script
console.info(chalk.cyan(`Removing setup script file at ${setupScript}`));
shell.rm(setupScript);
// 4. overriding README
console.info(chalk.cyan(`Writing readme file at ${readmeFile}`));
shell.ShellString(readmeContent).to(readmeFile);
// 5. Removing setup dependencies
console.info(chalk.cyan(`Removing setup dependencies`));
const packageJsonContent = JSON.parse(shell.cat(packageJson).toString());
delete packageJsonContent.scripts.setup;
delete packageJsonContent.dependencies.shelljs;
shell.ShellString(JSON.stringify(packageJsonContent, null, 2)).to(packageJson);
shell.exec(`yarn`);
// 6. initialising a new git project
console.info(chalk.cyan(`Initialising new git project`));
shell.exec(`git init`);
shell.exec(`git add .`);
shell.exec(`git commit -m "Initial commit"`);
// Done
console.info(chalk.green(`Done. Enjoy!`));
