import gulp from "gulp";
import gulpif from "gulp-if";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import clean from "gulp-clean";
import livereload from "gulp-livereload";
import watch from "gulp-watch";
import sequence from "run-sequence";

const volume = "/app/";

gulp.task("clean", () => gulp.src(`${volume}dist`).pipe(clean({force: true})));

const stylesTask = env => () => {
  return gulp.src(`${volume}src/styles/main.scss`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(env === "dev", sourcemaps.write(".")))
    .pipe(gulp.dest(`${volume}dist/css`));
};

const staticTask = env => () => {
  return gulp.src(`${volume}src/static/**/*`)
    .pipe(gulp.dest(`${volume}dist/`));
};

gulp.task("reload", () => livereload.reload());

const register = env => {
  gulp.task(`styles-${env}`, stylesTask(env));
  gulp.task(`static-${env}`, staticTask(env));
  gulp.task(env, () => {
    const tasks = ["clean", `styles-${env}`, `static-${env}`];
    if (env === "dev") {
      tasks.push("reload");
    }
    sequence(...tasks);
  });
}

["dev", "prod"].forEach(env => register(env));

gulp.task("watch", ["dev"], () => {
  livereload.listen();
  watch(`${volume}src/**/*`, () => gulp.start("dev"));
});
