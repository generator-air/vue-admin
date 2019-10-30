import $request from '@/mods/io/request';
import $api from '@/mods/model/api';
import $notify from '@/mods/util/notify';

const Api = {};

// 电话列表
Api.list = () => $request({
	url: $api['mobile-common'],
	method: 'get'
}).then(
	rs => rs.data.list
).catch(
	err => $notify.error(err)
);

export default Api;
