gulp     = require('gulp')
$        = require('gulp-load-plugins')()
config   = require('./config.json')



gulp.task 'scripts', ->
  gulp.src('./src/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('app.js'))
    .pipe($.babel())
    .pipe(gulp.dest('./app'))
    .pipe($.livereload())


gulp.task 'server', ->
  gulp.src('app')
    .pipe($.serverLivereload(
      host: config.server.host
      port: config.server.port
      livereload: on
    ))


gulp.task 'watch', ->
  $.livereload.listen(
    quiet: on
  )
  $.watch('./src/**/*.js', $.batch (cb) ->
    gulp.start('scripts')
    cb()
  )


gulp.task 'serve', [
  'scripts'
  'server'
  'watch'
]

gulp.task 'default', ['serve']