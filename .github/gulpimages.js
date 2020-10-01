// 引入需要的模块
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

// 压缩图片
gulp.task('minify-images', function() {
    return gulp.src(['../images/*.png','../images/*.jpg','../images/*.gif','../images/*.bmp'])
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.mozjpeg({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 5}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('../images'))
});
// gulp 4.0 适用的方式
gulp.task('default', gulp.parallel('minify-images'
));