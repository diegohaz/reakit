#!/usr/bin/env node
const { join } = require("path");
const spawn = require("cross-spawn");
const {
  makeProxies,
  makeGitignore,
  cleanBuild,
  hasTSConfig
} = require("./utils");

const cwd = process.cwd();

cleanBuild(cwd);
makeGitignore(cwd);
makeProxies(cwd);

if (hasTSConfig(cwd)) {
  spawn.sync("tsc", ["--emitDeclarationOnly"], { stdio: "inherit" });
}

spawn.sync("rollup", ["-c", join(__dirname, "rollup.config.js")], {
  stdio: "inherit"
});