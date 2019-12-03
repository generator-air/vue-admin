import $env from '@/model/env'

const route = {}
route.api = ''
route.local = $env.domain

const API = {}
const MOCK = {}

MOCK['ad-update'] = route.local + '/updateAd'
MOCK['ad-del'] = route.local + '/deleteAd'
MOCK['ad-add'] = route.local + '/addAd'
MOCK['ad-update'] = route.local + '/updateAd'
MOCK['ad-search-key'] = route.local + '/selectAdByKey'
MOCK['ad-search-id'] = route.local + '/selectAdById'
MOCK['ad-export'] = route.local + '/excel/export'
MOCK['ad-upload'] = route.local + '/excel/upload'

Object.keys(MOCK).forEach(key => {
	if (!API[key] || $env.mock) {
		API[key] = MOCK[key]
	}
})

export default API
