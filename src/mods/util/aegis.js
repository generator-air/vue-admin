import * as $emonitor from '@tencent/emonitor'

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$agis: {
			get() {
				return {
					// sdk初始化
					report: () => {}
			}
		}
	});
};

export default {
	install
};
