import $env from '@/model/env'

const methods = [
	'log',
	'info',
	'error',
	'warn'
]

const Logger = fname => {
	let instance = {}
	methods.forEach(name => {
		instance[name] = function (...args) {
			if ($env.enableLogger) {
				if (fname) {
					args.unshift('===>[' + fname + ']')
				}
				try {
					window.console[name](...args)
				} catch (err) {
					args.forEach(arg => {
						window.console[name](arg)
					})
				}
			}
		}
	})
	return instance
}

export default Logger
