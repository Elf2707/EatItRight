import gulp from 'gulp-task-doc';
import './bump';
import './hooks-install';
import './patch-libs';

gulp.task('help', gulp.help());

// @internal
gulp.task('default', ['help']);
