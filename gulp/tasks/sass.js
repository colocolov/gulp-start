 import * as extSass from "sass"; // раскоментировать в случае ошибки
// import extSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";

import cleanCss from "gulp-clean-css"; // Сжатие CSS файла
//import webpCss from "gulp-webpcss"; // Вывод WEBP изображения
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import cssGroupMedia from "gulp-group-css-media-queries"; // Группировка медиа запросов

const sassGulp = gulpSass(extSass);

export const sass = () => {
  return (
    app.gulp
      .src(app.path.src.sass, {})
      // .pipe(app.plugins.if(sourcemaps.init()))
      .pipe(app.plugins.if(app.isDev, sourcemaps.init()))
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SASS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        sassGulp({
          outputStyle: "expanded",
        })
      )
      .pipe(app.plugins.replace(/@img\//g, "../images/"))
      .pipe(app.plugins.if(app.isBuild, cssGroupMedia()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            cascade: true,
          })
        )
      )
      // Расскоментировать строку ниже, если нужен не сжатый дублль файла стилей
      .pipe(app.plugins.if(app.isDev, sourcemaps.write()))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      // .pipe(app.plugins.if(sourcemaps.write())
      // вернуть сюда sourcemap
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
