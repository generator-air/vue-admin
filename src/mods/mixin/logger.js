import $logger from '@/mods/util/logger';
import $env from '@/mods/model/env';

/**
 * VueLogger
 * @example
 * import $logger from '@/mixin/logger';
 *
 * Vue.use($logger);
 *
 * // 在组件里面直接输出日志
 * // component.vue
 * export default {
 *  data() {
 *  	return {
 *  		// 存在这个属性，则每个方法调用时自动输出日志
 *  		// 过滤函数名前缀为 $ 与 _ 的方法
 *  		logger: 'filename'
 *  	};
 *  }
 * 	created() {
 * 		this.$info('log message');
 * 	}
 * }
 */
let logger = $logger();

const VueLogger = Vue => {
	let loggerInstance = {};
	Object.keys(logger).forEach(method => {
		if ($env.enableLogger) {
			loggerInstance['$' + method] = function (...args) {
				let fname = '';
				if (this.logger) {
					fname = '===>[' + this.logger + ']';
				}
				if (fname) {
					logger[method](fname, ...args);
				} else {
					logger[method](...args);
				}
			};
		} else {
			loggerInstance['$' + method] = () => {};
		}
	});

	Object.assign(Vue.prototype, loggerInstance);
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueLogger);
}

export default VueLogger;
