const path = require("path");
const fs = require("fs");

const TREE_HOLDER = "<!--folder tree-->";
const README_TEMPLATE_PATH = path.join(__dirname, "README_TEMPLATE.md");
const README_PATH = path.join(__dirname, "README.md");

const basePath = path.resolve(__dirname, "./SmallDemos");

function isDirectory(...paths) {
  return fs.statSync(path.join(basePath, ...paths)).isDirectory();
}

function isExist(...paths) {
  return fs.existsSync(path.join(basePath, ...paths));
}

function normalizeLink(...paths) {
  const pathname = paths.join("/");
  return `https://github.com/StarZer0/SmallCases/blob/master/SmallDemos/${pathname}`;
}

const folders = fs.readdirSync(basePath);
folders.sort();

let markdown = "";
folders.forEach((folder) => {
  if (isDirectory(folder)) {
    markdown += `- ${folder}\n`;
    const dirs = fs.readdirSync(path.resolve(basePath, folder));
    dirs.forEach((dir) => {
      const paths = [folder, dir];
      if (isDirectory(...paths)) {
        if (isExist(...paths, "README.md")) paths.push("README.md");
        markdown += `  - [${dir}](${normalizeLink(...paths)})\n`;
      }
    });
  }
});

let readmeText = fs.readFileSync(README_TEMPLATE_PATH, { encoding: "utf-8" });
readmeText = readmeText.replace(TREE_HOLDER, markdown);

fs.writeFileSync(README_PATH, readmeText, { encoding: "utf-8" });
