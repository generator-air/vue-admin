const $gulp = require('gulp');
const $execa = require('execa');
const $gulpUtil = require('gulp-util');
const $gulpConfirm = require('gulp-confirm');
const $qcloudUpload = require('gulp-qcloud-cos-upload');

const $config = require('./config');

// 生成filename文件，存入string内容
string_src = (filename, string) => {
	// eslint-disable-next-line new-cap
	let src = require('stream').Readable({objectMode: true})
	src._read = function ()
	{
		this.push(new $gulpUtil.File({cwd: "", base: "", path: filename, contents: new Buffer(string)}))
		this.push(null);
	}
	return src
}

// 存入不同的联调模式
switchMode = mode =>{
	// 生成prop.js文件
	const content = `const env = {};\renv.domain = "${mode}";\rmodule.exports = env;`;
	return string_src("./src/mods/model/env.js", content).pipe($gulp.dest('./'))
}


// =================
// cdn upload  tasks
// 在开发网执行腾讯云上传可能需要启动 proxifier：
// windows: http://km.oa.com/articles/show/340701?kmref=search&from_page=1&no=1
// macs: http://km.oa.com/articles/show/321457?kmref=search&from_page=1&no=2
// =====
$gulp.task('upload', () => $gulp.src([
	'**/*.{js,css,ttf,woff,svg,eot,png,jpg,jpeg,gif}'
], {
	// 本地静态资源地址
	cwd: $config.dist,
	// 上传cdn的地址（附加在prefix后面） 注：如果不加，prefix后面，会默认读取本机的文件夹目录
	base: $config.dist
}).pipe(
	$gulpConfirm({
		question: $gulpUtil.colors.yellow('Start upload dist ? [y/n]'),
		input: '_key:y'
	})
).pipe(
	$qcloudUpload($config.uploadConfig)
));

// =================
// common tasks
// =================

$gulp.task('mock', ()=>{ return switchMode($config.mock) });
$gulp.task('development', ()=>{ return switchMode($config.development) });
$gulp.task('production', ()=>{ return switchMode($config.production) });


$gulp.task('build', done => {
	$execa('vue-cli-service', [
		'build'
	], {
		stdio: 'inherit'
	});
	done();
});


$gulp.task('serve', done => {
	$execa('vue-cli-service', [
		'serve'
	], {
		stdio: 'inherit'
	});
	done();
});

// build 开发环境
$gulp.task('build-dev', $gulp.series(
	'development',
	'build'
));

// build mock环境
$gulp.task('build-mock', $gulp.series(
	'mock',
	'build'
));

// build 正式环境
$gulp.task('build-prod', $gulp.series(
	'production',
	'build'
));


// serve 开发环境
$gulp.task('dev', $gulp.series(
	'development',
	'serve'
));

// serve mock环境
$gulp.task('mock', $gulp.series(
	'mock',
	'serve'
));


// serve 正式环境
$gulp.task('prod', $gulp.series(
	'production',
	'serve'
));

$gulp.task('default', $gulp.series('serve'));
