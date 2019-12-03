import $dictionary from './dictionary';

const obj = {};

// 对key进行类型格式化 返回string/number类型的key
function getTypedKey(key, isNumber) {
	return isNumber ? parseInt(key, 10) : key;
}

// // 部分option数据使用了color字段，根据不同状态设置显示颜色
// function setColor(optionList) {
// 	optionList.forEach(option => {
// 		switch (option.type) {
// 			case 'Submit':
// 				option.color = 'success';
// 				break;
// 			case 'Back':
// 				option.color = 'warning';
// 				break;
// 			case 'Reject':
// 				option.color = 'danger';
// 				break;
// 			case 'Published':
// 				option.color = 'primary';
// 				break;
// 			case 'Deleted':
// 				option.color = 'warning';
// 				break;
// 			default:
// 				option.color = '';
// 				break;
// 		}
// 	});
// 	return optionList;
// }

/**
 * optionObj: 选项字典值
 * 格式:
 * {
 *	key1: value1,
 *	key2: value2
 * }
 * keyName: 页面option key的名称（即: 区分选项的唯一值的名字） string —— 【注】开发时没有统一字段名称，后期使用function动态创建options，考虑兼容开发者不同命名，设置keyName字段
 * type: options的类型
 * type: undefined/'' —— 不做其他处理，直接读取stateObj的所有key
 * type: 'normal' —— 添加'':'全部'
 * type: 'audit' —— 添加'1,2,3': '全部'
 * type: 'specialAudit' —— 添加'Submit,Published,Reject': '全部' —— 【注】后台定义状态值不统一，有的地方用0,1,2等，有的地方用Submit,Published等。使用骚操作兼容一下
 * numberKey: key是否要求是数字
 * true/false
 *  */
function createOptions(optionDictionary, {
	keyName = 'id',
	labelName = 'label',
	type,
	numberKey
}) {
	const optionObj = Object.assign({}, optionDictionary);
	const options = [];
	Object.keys(optionObj).forEach(key => {
		options.push({
			[keyName]: getTypedKey(key, numberKey),
			[labelName]: optionObj[key]
		});
	});
	if (type === 'normal') {
		options.unshift({ [keyName]: '', label: '全部' });
	} else if (type === 'audit') {
		options.unshift({ [keyName]: '1,2,3', label: '全部' });
	} else if (type === 'specialAudit') {
		options.unshift({ [keyName]: 'Submit,Published,Reject', label: '全部' });
	}
	return options;
}

// 通用状态
obj.COMMON_STATE = createOptions($dictionary.COMMON_STATE, { type: 'normal' });

export default obj;
