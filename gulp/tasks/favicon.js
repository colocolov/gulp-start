import favicons from "gulp-favicons";
import filter from "gulp-filter";

export const favicon = () => {
  return (
    app.gulp
      .src(app.path.src.favicon)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FAVICON",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.favicon))
      .pipe(favicons({
        appName: app.projectName,
        appShortName: app.projectName,
        appDescription: `This is favicon for ${app.projectName}`,
        icons: {
          favicons: true,
          appleIcon: true,
          android: true,
          windows: false,
          yandex: false,
          coast: false,
          firefox: false,
          appleStartup: false,
        },
        path: "images/favicon/"
      }))
      .pipe(app.gulp.dest(app.path.build.favicon))
      .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'manifest.webmanifest']))
      .pipe(app.gulp.dest(app.path.build.html))
  );
};
