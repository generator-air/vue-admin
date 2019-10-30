import $env from '@/mods/model/env';
const route = {};
const API = {};
route.api = $env.domain;
API['mobile-common'] = route.api + '/content/mobiles/';
export default API;
