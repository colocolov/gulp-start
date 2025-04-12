// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path, projectName } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  projectName: projectName,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { sass } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { html } from "./gulp/tasks/html.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprite } from "./gulp/tasks/svg.js";
import { ttfToWoff } from "./gulp/tasks/fonts.js";
import { server } from "./gulp/tasks/server.js";
import { favicon } from "./gulp/tasks/favicon.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.sass, sass);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.images, svgSprite);
  gulp.watch(path.watch.files, copy);
}
// Последовательная обработка шрифтов
// const fonts = gulp.series(otfToTtf, ttfToWoff);
const fonts = gulp.series(ttfToWoff);

// Основные задачи
const mainTasks = gulp.parallel(copy, sass, html, js, images, svgSprite);

// Построение сценариев выполнения задач
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { dev };
export { build };

// Выполнение сценария ро умолчанию
gulp.task("default", dev);
gulp.task("fonts", fonts);
gulp.task("svg", svgSprite);
gulp.task("favicon", favicon);
