const $gulp = require('gulp');
const $execa = require('execa');
const gutil = require('gulp-util');

//生成filename文件，存入string内容
string_src=(filename, string) => {
	let src = require('stream').Readable({ objectMode: true })
	src._read = function () 
	{
		this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
		this.push(null);
	}	
	return src
}

//存入不同的联调模式
switchMode = mode =>{
	//读入config.json文件
	let myConfig = require('./config.json');
	//取出对应的配置信息
	let envConfig = myConfig[mode];
	let conConfig = JSON.stringify(envConfig);
	//生成config.js文件
	const content = `const prop = {};\rprop.domain = ${conConfig};\rprop.port = 8090;\rmodule.exports = prop;`;
	return string_src("./src/mods/model/prop.js", content).pipe($gulp.dest('./'))
}

// =================
// common tasks
// =================

$gulp.task('mock', ()=>{return switchMode('mock')});
$gulp.task('development', ()=>{return switchMode('development')});
$gulp.task('production', ()=>{return switchMode('production')});


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
