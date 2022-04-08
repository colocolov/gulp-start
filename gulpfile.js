const { notifyBrowser } = require("browser-sync");

let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    js: project_folder + "/js",
    images: project_folder + "/images",
    fonts: project_folder + "/fonts",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/sass/style.sass",
    cssadd: source_folder + "/css/libs.scss",
    js: source_folder + "/js/scripts/*.js",
    jsadd: [source_folder + "/js/l-ibs.js"],
    images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/sass/**/*.sass",
    js: source_folder + "/js/**/*.js",
    images: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
    svg: source_folder + "/images/icons/*.svg",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest, task } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  fileinclude = require("gulp-file-include"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  mediagroup = require("gulp-group-css-media-queries"),
  concat = require("gulp-concat"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  replace = require("gulp-replace"),
  imagemin = require("gulp-imagemin"),
  newer = require("gulp-newer"),
  svgsprite = require("gulp-svg-sprite"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  htmlmin = require("gulp-htmlmin"),
  //ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  uglify = require("gulp-uglify-es").default,
  del = require("del");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notifyBrowser: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(
      fileinclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(replace(/@img\//g, "images/"))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// build version html
function htmlBuild() {
  return src(path.src.html)
    .pipe(
      fileinclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(webphtml())
    .pipe(
      htmlmin({
        // collapseWhitespace: true, // удаляем все переносы
        removeComments: true, // удаляем все комментарии
      })
    )
    .pipe(dest(path.build.html));
}

function css() {
  return src(path.src.css)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(replace(/@img\//g, "../images/"))
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        grid: true,
        cascade: false,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// build version CSS
function cssBuild() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(mediagroup())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 7 versions"],
        grid: true,
        cascade: false,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleancss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css));
}

// копирование доп. стилей из src в готовый проект
function cssAdd() {
  return (
    src(path.src.cssadd)
      // .pipe(concat("adv.css"))
      // .pipe(dest(path.build.css))
      // .pipe(
      //   cleancss({
      //     level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      //   })
      // )
      // .pipe(
      //   scss({
      //     outputStyle: "compact",
      //   })
      // )
      .pipe(dest(path.build.css))
  );
}

function js() {
  return src(path.src.js)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "JS",
          message: error.message,
        })),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// build version JS
function jsBuild() {
  return src(path.src.js)
    .pipe(concat("main.js"))
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// копирование дополнительных JS фалйов из src в готовый проект
function jsAdd() {
  return (
    src(["node_modules/swiper/swiper-bundle.js"])
      // src(path?.src.jsadd)
      .pipe(concat("libs.js"))
      // .pipe(uglify())
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
  );
}

//--- конвертирование JPG в WEBP + копирование JPG в dist
function images() {
  return src(path.src.images)
    .pipe(newer(path.build.images))
    .pipe(
      webp({
        quality: 75,
      })
    )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))
    .pipe(newer(path.build.images))
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream());
}
//---END

//--- сжатие JPG
function imagesConvert() {
  return src(path.src.images)
    .pipe(newer(path.build.images))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
        verbose: true,
      })
    )
    .pipe(dest(path.build.images));
}
//---END

//--- ОТДЕЛЬНЫЙ TASK - создание SVG sprite
gulp.task("svgSprite", function () {
  return gulp
    .src([source_folder + "/images/icons/*.svg"])
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.images));
});
//---END

function svgSprit() {
  return src([source_folder + "/images/icons/*.svg"])
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../icons/sprite.svg",
            //example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream());
}

//--- конвертер шрифтов OTF в TTF -> WOFF
function fonts() {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/"))
    .pipe(src(path.src.fonts))
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
  // .pipe(src(path.src.fonts))
  // .pipe(ttf2woff())
  // .pipe(dest(path.build.fonts));
}
//---END

// очистка папки с готовым проектом
function cleanDist() {
  return del(path.clean);
}

function cleanIcons() {
  return del("!" + path.build.images + "/icons/sprite.svg");
}

// отслеживание файлов
function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.svg], svgSprit);
}

let build = gulp.series(
  gulp.parallel(css, html, js, jsAdd, fonts, images, svgSprit)
);
let watch = gulp.parallel(build, watchFiles, browserSync);
// выгрузка в готовый проект
let done = gulp.series(
  cleanDist,
  gulp.parallel(
    cssBuild,
    cssAdd,
    htmlBuild,
    jsBuild,
    jsAdd,
    fonts,
    images,
    svgSprit
  ),
  imagesConvert
);

exports.css = css;
exports.html = html;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.done = done;
