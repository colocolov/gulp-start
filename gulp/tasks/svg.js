import svgSprit from "gulp-svg-sprite";
import svgO from "gulp-svgo";

export const svgSprite = () => {
  return app.gulp
    .src(app.path.src.svg)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
  )
    .pipe(svgO({
      plugins: [{
        removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
      }]
    }))
    .pipe(
      svgSprit({
        mode: {
          symbol: {
            // stack: {
            sprite: `../icons/sprite.svg`,
            //example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.images));
  //.pipe(app.plugins.browserSync.stream())
};
