const jsonServer = require('json-server');

const $db = require('./db');

const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const router = jsonServer.router($db);

server.use(router);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// 拦截客户端请求，进行自定义处理
server.use((req, res, next) => {
	// 手动映射，更改请求url（/demo1/list => /demo1_list）
	req.url = req.url.replace(/\//g, '_').replace('_', '/');
	next();
});

server.listen(3001, () => {
	console.log('JSON Server is running at 3001');
});
