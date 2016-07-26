var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    port: 9000,
    host: 'server-mi'
  });
});
 
gulp.task('default', ['webserver']);
