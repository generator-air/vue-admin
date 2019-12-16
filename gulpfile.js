const $gulp = require('gulp');
const $execa = require('execa');
const $gulpUtil = require('gulp-util');
const $gulpConfirm = require('gulp-confirm');
const $qcloudUpload = require('gulp-qcloud-cos-upload');
// const $del = require('del');
const $config = require('./config');
const $colors = $gulpUtil.colors;

// 生成filename文件，存入string内容
string_src = (filename, string) => {
	// eslint-disable-next-line new-cap
	let src = require('stream').Readable({ objectMode: true })
	src._read = function ()
	{
		this.push(new $gulpUtil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
		this.push(null);
	}
	return src
}

// 存入不同的联调模式
switchMode = mode =>{
	// 生成prop.js文件
	const content = `// @param:domain 启动后切换环境后生成的域名\rconst env = {};\renv.domain = "${mode}";\rmodule.exports = env;`;
	return string_src('./src/model/env.js', content).pipe($gulp.dest('./'))
}

// $gulp.task('clean-dev', () => $del(['./dist/', './online/']));

// 杀掉正在执行的 server 进程，确保同一时间只有一个开发服务存在
$gulp.task('tool-kill-running', done => {
	let getPids = (rs, keyword) => rs.stdout.split(/\n/).filter(
		str => (str.indexOf(keyword) > 0)
	).map(str => str.split(/\s+/)[1]);

	let getPromise = name => $execa.shell('ps aux | grep ' + name).then(
		rs => getPids(rs, 'bin/' + name)
	).then(pids => {
		if (!pids.length) {
			console.info($colors.green('[process check] no working ' + name));
			return Promise.resolve();
		}
		return Promise.all(pids.map(pid => {
			console.info($colors.yellow('[process check] working ' + name + ' killed:' + pid));
			return $execa.shell('kill -9 ' + pid, { stdio: 'inherit' });
		}));
	});

	if (process.platform.indexOf('win32') >= 0) {
		done();
	} else {
		Promise.all(
			[
				'spore-mock' // 关闭相同端口号的进程
			].map(
				key => getPromise(key)
			)
		).then(() => done());
	}
});

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

// json-server 启动
$gulp.task('json-server', done => {
	$execa('node', [
		'./mock/mock-server.js'
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


// serve 开发环境
$gulp.task('dev', $gulp.series(
	'development',
	'tool-kill-running',
	'serve'
));

// serve mock环境
$gulp.task('mock', $gulp.series(
	'mock',
	'tool-kill-running',
	// 'json-server',
	'serve'
));


$gulp.task('default', $gulp.series('serve'));
