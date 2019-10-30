import {
	Button,
	Col,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	MenuItem,
	Submenu,
} from 'element-ui'

const UI = Vue => {
	Vue.use(Button)
	Vue.use(Col)
	Vue.use(Dropdown)
	Vue.use(DropdownMenu)
	Vue.use(DropdownItem)
	Vue.use(Menu)
	Vue.use(MenuItem)
	Vue.use(Submenu)
}

export default UI
