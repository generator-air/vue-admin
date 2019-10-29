const $gulp = require('gulp');
const $execa = require('execa');
const $config = require('./config');
const $gutil = require('gulp-util');

//生成filename文件，存入string内容
string_src=(filename, string) => {
	let src = require('stream').Readable({ objectMode: true })
	src._read = function () 
	{
		this.push(new $gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
		this.push(null);
	}	
	return src
}

//存入不同的联调模式
switchMode = mode =>{
	//生成prop.js文件
	const content = `const env = {};\renv.domain = "${mode}";\rmodule.exports = env;`;
	return string_src("./src/mods/model/env.js", content).pipe($gulp.dest('./'))
}

// =================
// common tasks
// =================

$gulp.task('mock', ()=>{return switchMode($config.mock)});
$gulp.task('development', ()=>{return switchMode($config.development)});
$gulp.task('production', ()=>{return switchMode($config.production)});


$gulp.task('serve', done => {
	$execa('vue-cli-service', [
		'serve'
	], {
		stdio: 'inherit'
	});
	done();
});

//mock环境
$gulp.task('mock', $gulp.series(
	'mock',
	'serve'
));

//开发环境
$gulp.task('dev', $gulp.series(
	'development',
	'serve'
));

//正式环境
$gulp.task('prod', $gulp.series(
	'production',
	'serve'
));

$gulp.task('default', $gulp.series('serve'));
