const $gulp = require('gulp');
const minimist =  require('minimist');
const gutil = require('gulp-util');

require('./task/serve');

//默认development环境
const knowOptions = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'mock'
	}
};

const options = minimist(process.argv.slice(2), knowOptions);

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

$gulp.task('constants', function() {
  //读入config.json文件
	let myConfig = require('./config.json');
	//取出对应的配置信息
	let envConfig = myConfig[options.env];
	let conConfig = JSON.stringify(envConfig);
	//生成config.js文件
	const content = `const prop={};prop.domain=${conConfig};export default prop;`;
	return string_src("./src/mods/model/prop.js", content).pipe($gulp.dest('./'))
});

// =================
// common tasks
// =================

$gulp.task('serve', $gulp.series(
	'constants',
	'serve-dev'
));

$gulp.task('default', $gulp.series('serve'));
