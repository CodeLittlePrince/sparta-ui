const proxyConfig = require('../webpack-site/proxy.config')
const Koa = require('koa')
const send = require('koa-send')
const fs = require('fs')
const nodePath = require('path')
// 使用router
const Router = require('koa-router')
const Boom = require('boom')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')
// https://github.com/alexmingoia/koa-router
app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))
// 使用bodyparser 解析get,post的参数
app.use(bodyParser())
// cors
app.use(cors({
  origin: function() {
    return '*'
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
// 获取上传的文件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 100*1024*1024	// 设置上传文件大小最大限制，默认2M
  }
}))

// 模拟数据返回
const mockRoot = './mock'
app.use(async (ctx, next) => {
  if (ctx.path !== '/' &&
      ctx.path !== '/favicon.ico' &&
      ctx.path.indexOf('hot-update.json') === -1
  ) {
    // 模拟
    let path = ctx.path
    let params = {}
    const method = ctx.method
    // console.log(ctx.query.id)         // get获取参数
    // console.log(ctx.request.body.id)  // post获取参数
    params = method.toLowerCase() === 'get' ?
      ctx.query :
      ctx.request.body
    // 调用对应的模拟数据

    // 上传文件
    if (ctx.url === '/api/upload' && 'POST' === ctx.method) {
      const file = ctx.request.files.myFile || ctx.request.files.file	// 获取上传文件
      const reader = fs.createReadStream(file.path)	// 创建可读流
      const ext = file.name.split('.').pop()		// 获取上传文件扩展名
      const uploadDir = nodePath.resolve(__dirname, 'uploadFiles')
      const exists = fs.existsSync(uploadDir)
      if (!exists) {
        fs.mkdirSync(uploadDir)
      }
      const upStream = fs.createWriteStream(`${uploadDir}/${Math.random().toString()}.${ext}`)		// 创建可写流
      reader.pipe(upStream)	// 可读流通过管道写入可写流
      ctx.body = {
        fileUrl: `${upStream.path.replace(uploadDir, '/uploadFiles')}`
      }
      ctx.set('Content-Type', 'text/plain; charset=utf-8')
    // 返回文件
    } else if (ctx.path.startsWith('/uploadFiles') && 'GET' === ctx.method) {
      await send(
        ctx,
        ctx.path,
        { root: nodePath.resolve(__dirname, './') }
      )
    // 其它模拟数据
    } else {
      const mockHandle = require(`${mockRoot}${path}.js`)
      // 返回数据
      ctx.body = mockHandle(params)
    }
    await next()
  }
})

// log error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

// 注意：这里的端口要和webpack里devServer的端口对应
app.listen(proxyConfig.port)