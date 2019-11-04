export default arg => {
	const typeStr = Object.prototype.toString.call(arg)
	return typeStr.slice(8, -1).toLowerCase()
}
