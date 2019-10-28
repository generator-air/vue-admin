const $gulp = require('gulp');
const $execa = require('execa');

// =================
// serve
// =================

$gulp.task('serve-dev', done => {
	$execa('vue-cli-service', [
		'serve'
	], {
		stdio: 'inherit'
	});
	done();
});
