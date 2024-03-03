import pkg from 'gulp'
const { task, src, dest } = pkg

task('copy-assets', function () {
  return src('src/main/resources/assets/**/*')
    .pipe(dest('dist/resources/assets'))
})
