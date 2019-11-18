const store = {};

function setStore(name, value) {
	store[name] = value;
}

function getStore(name) {
	return store[name];
}

module.exports = {
	setStore,
	getStore
};
