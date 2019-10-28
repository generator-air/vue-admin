const $gulp = require('gulp');
const $execa = require('execa');
const $sporeMock = require('spore-mock');

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
