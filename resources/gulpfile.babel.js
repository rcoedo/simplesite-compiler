import gulp from "gulp";
import gulpif from "gulp-if";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import clean from "gulp-clean";

const volume = "/app/";

const stylesTask = env => () => {
  return gulp.src(`${volume}src/styles/main.scss`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(env === "dev", sourcemaps.write(".")))
    .pipe(gulp.dest(`${volume}dist/css`));
};

const htmlTask = env => () => {
  return gulp.src(`${volume}src/html/*`)
    .pipe(gulp.dest(`${volume}dist/`));
};

const register = env => {
  gulp.task(`styles-${env}`, stylesTask(env));
  gulp.task(`html-${env}`, htmlTask(env));
  gulp.task(env, [`styles-${env}`, `html-${env}`]);
}

["dev", "prod"].forEach(env => register(env));

gulp.task("watch", ["dev"], () => gulp.watch(`${volume}src/**/*`, ["dev"]));
gulp.task("clean", () => gulp.src(`${volume}dist`).pipe(clean({force: true})));
