//Html
import htmlmin from "gulp-htmlmin";
//Css
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
//Javascript
import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";
//Pug
import pug from "gulp-pug";
//Sass
import sass from "gulp-sass";
//Clean CSS
import clean from "gulp-purgecss";
//Caché bust
import cacheBust from "gulp-cache-bust";
//Optimizacion imagenes
import imagemin from "gulp-imagemin";
//BrowserSync
import { init as server, stream, reload } from "browser-sync";
//Plumber
import pumbler from "gulp-plumber";
//Concat
import concat from "gulp-concat";
//Variables/constantes
const cssPlugins = [cssnano(), autoprefixer()];
const production = false;

gulp.task("html-min", () => {
  return gulp
    .src("./src/*.html")
    .pipe(pumbler())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("styles", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(pumbler())
    .pipe(concat("styles-min.css"))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("./public/css"))
    .pipe(stream());
});

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(pumbler())
    .pipe(concat("scripts-min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/views/pages/*.pug")
    .pipe(pumbler())
    .pipe(
      pug({
        pretty: production ? false : true,
      })
    )
    .pipe(
      cacheBust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/styles.scss")
    .pipe(pumbler())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("./public/css"))
    .pipe(stream());
});

gulp.task("clean", () => {
  return gulp
    .src("./public/css/styles.css")
    .pipe(pumbler())
    .pipe(
      clean({
        content: ["./public/*.html"],
      })
    )
    .pipe(gulp.dest("./public/css"));
});

gulp.task("imgmin", () => {
  return gulp
    .src("./src/images/*")
    .pipe(pumbler())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 30, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 }),
      ])
    )
    .pipe(gulp.dest("./public/assets/img"));
});

gulp.task("default", () => {
  server({
    server: "./public",
  });
  //gulp.watch("./src/*.html", gulp.series("html-min").on('change',reload));
  //gulp.watch("./src/css/*.css", gulp.series("styles").on('change',reload));
  gulp.watch("./src/views/**/*.pug", gulp.series("views")).on("change", reload);
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/js/*.js", gulp.series("babel")).on("change", reload);
});
