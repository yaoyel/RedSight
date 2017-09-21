const gulp=require("gulp");
const exec=require("child_process").exec;

gulp.task("build",["compile"],function () {
    return gulp.src(["./config/**/*"])
        .pipe(gulp.dest("./dist/config"));
});

gulp.task("compile",function (done) {
    exec("d:\\home\\site\\wwwroot\\node_modules\\.bin\\tsc.cmd",function (err,stdOut,stdErr) {
        console.log(stdOut);
        if(err)
            done(err);
        else
            done();
    });
});