import gulp from 'gulp-task-doc';

/* eslint-disable max-len */

/**
 * Patch patched libs
 */
gulp.task('patch-libs', ['patch:rnn']);

gulp.task('patch:rnn', () => gulp.src('../src/patched-libs/react-native-navigation/RNNTopBarOptions.m')
  .pipe(gulp.dest('../node_modules/react-native-navigation/lib/ios/')));
