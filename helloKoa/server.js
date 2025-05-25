const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();

let subscriptions;

app.use(async (ctx, next) => {
	const origin = ctx.request.get('Origin')
	if (!origin) {
		return await next();
	}

	const headers = { 'Access-Control-Allow-Origin': '*', };

	if (ctx.request.method !== 'OPTIONS') {
		ctx.response.set({ ...headers });
		try {
			return await next();
		} catch(err) {
			err.headers = { ...e.headers, ...headers };
			throw e;
		};
	};

	if (ctx.request.get('Access-Control-Request-Method')) {
		ctx.response.set({
			...headers,
			'Access-Control-Request-Method': 'GET, POST, PUT, DELETE, PATCH',
		});

		if (ctx.request.get('Access-Control-Request-Headers')) {
			ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-'))
		};
		ctx.response.status = 204;
	};
});

const router = new Router();


router.get('/index', async (ctx) => {
	ctx.response.body = 'hello';
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
