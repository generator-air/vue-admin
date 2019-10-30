import $request from '@/mods/io/request';
import $api from '@/mods/model/api';

const Api = {};

// 电话列表
Api.list = () => $request({
	url: $api['mobile-common'],
	method: 'get'
}).then(
	rs => rs.data.list
).catch(
	err => console.error(err)
);

export default Api;
