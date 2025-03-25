//import fs from "fs";
import fonter from "gulp-fonter-2";
import ttf2woff2 from "gulp-ttf2woff2";

// export const otfToTtf = () => {
  // Ищем шрифты .otf
//   return (
//     app.gulp
//       .src(`${app.path.srcFolder}/resources/fonts/*.otf`)
//       .pipe(
//         app.plugins.plumber(
//           app.plugins.notify.onError({
//             title: "FONTS",
//             message: "Error: <%= error.message %>",
//           })
//         )
//       )
//       // конвертируем в .ttf
//       .pipe(
//         fonter({
//           formats: ["ttf"],
//         })
//       )
//       // выгрузка в папку с результатом
//       .pipe(app.gulp.dest(`${app.path.srcFolder}/resources/fonts/`))
//   );
// };

export const ttfToWoff = () => {
  // Ищем шрифты .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/resources/fonts/*.ttf`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // конвертируем в .woff. расскоментрировать строку ниже если надо
      // .pipe(fonter({formats: ["woff"],}))
      // .pipe(app.gulp.src(`${app.path.scrFolder}/fonts/*.ttf`))
      // конвертируем в .woff2
      .pipe(ttf2woff2())
      // выгрузка в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};
