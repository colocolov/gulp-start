import fileInclude from "gulp-file-include";
import webpHtml from "gulp-webp-html";

export const html = () => {
  return app.gulp
    .src([
      app.path.src.html,
      //'!./src/html/docs/**/*.*',
    ])
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(app.plugins.replace(/@img\//g, "images/"))
    .pipe(app.plugins.if(app.isBuild, webpHtml({
				extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
				retina: {
					1: '',
					2: '@2x',
				},
			})))
    // копирование готовой версии в другую папку
    // .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.done.html)))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
