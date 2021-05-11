#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const shell = require("shelljs");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const README_CONTENT = `
# This is README of you project

Some informations
`;

const callback = (string) => (err) => {
  if (err) {
    throw err;
  }

  console.log(string);
};

shell.rm("-rf", ".git");
fs.unlink(path.join(__dirname, "setup.js"), () => {});
fs.unlink(path.join(__dirname, "README.md"), () => {});
fs.writeFile("README.md", README_CONTENT, () => {});
exec(
  // eslint-disable-next-line
  'git init && git add . && git commit -m "Initial commit"',
  callback("Repository initialized"),
);
