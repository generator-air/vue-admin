export default {
	state: {
		userInfo: {},
		auth: {}
	},
	mutations: {
		setUserInfo (state, info) {
			state.userInfo = info
		},
		setAuth (state, authObj) {
			state.auth = authObj
		}
	}
}
