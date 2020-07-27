const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require('@paralect/node-mongo').connect('mongodb://db/docker');

const router = new Router();
const app = new Koa();

const userService = db.createService('users');
const logService = db.createService('logs');

router
  .get('/me', async (context, next) => {
    context.body = await userService.findOne();
  })
  .post('/logs', async (context, next) => {
    if (!context.request.body.event) {
      context.throw(400);
    }
    console.log(context.request.body);
    context.body = await logService.create({
      event: context.request.body.event
    });
  })
  .get('/logs', async (context, next) => {
    context.body = await logService.find();
  });

app
  .use(bodyParser())
  .use(router.routes());

app.listen(3234);