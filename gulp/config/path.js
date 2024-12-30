// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());
export const projectName = rootFolder;

const buildFolder = `./${rootFolder}`;
// const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    favicon: `${buildFolder}/images/favicon/`,
  },
  done: {
    html: `./build/`,
  },
  src: {
    sass: `${srcFolder}/sass/style.sass`,
    js: `${srcFolder}/js/main.js`,
    html: `${srcFolder}/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/icons/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
    favicon: `${srcFolder}/images/favicon/favicon.svg`,
  },
  watch: {
    sass: `${srcFolder}/sass/**/*.sass`,
    js: `${srcFolder}/js/**/*.js`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  // clean: buildFolder,
  clean: [
    `${buildFolder}/css/`,
    `${buildFolder}/js/`,
    `${buildFolder}/images/`,
  ],
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
