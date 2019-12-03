import $env from '@/model/env'

const route = {}
route.api = ''
route.local = $env.domain

const API = {}
const MOCK = {}

MOCK['list'] = route.local + '/selectAdByKey'


Object.keys(MOCK).forEach(key => {
	if (!API[key] || $env.mock) {
		API[key] = MOCK[key]
	}
})

export default API
