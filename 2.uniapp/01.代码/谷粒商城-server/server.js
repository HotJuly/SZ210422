const Koa = require('koa');
const KoaRouter = require('koa-router');

// 1.创建服务器应用实例对象
// const app = express();
const app = new Koa();

/*
	3.注册路由并成功请求
	app.get(path,callback)

*/

// 3.1使用koa-router生成路由器实例
const router = new KoaRouter()

// 3.2通知koa服务器使用koarouter的所有路由
app.use(router.routes());

// 3.3创建注册路由接口
/*
	express
		回调函数接收三个参数
			1.request->请求报文对象
			2.response->响应报文对象  response.send(返回的数据)
			3.next->执行下一个中间件
				中间件本质是函数,它可以检测权限,或者设置请求头或者响应头等操作
				
	koa
		回调函数接收两个参数
			1.ctx->request+response
				ctx.body=想要返回的数据(该数据会被json化)
			2.next->执行下一个中间件
*/

router.get('/test',function(ctx){
	console.log('/test success');
	ctx.body="/test success";
})

// 该接口用于返回首页所需要的数据
const indexDatas = require('./datas/index.json');
router.get('/getIndexData',function(ctx){
	// console.log('/test success');
	ctx.body=indexDatas;
})

// 该接口用于返回分类页面所需要的数据
const categoryDatas = require('./datas/categoryDatas.json');
router.get('/getCategoryDatas',function(ctx){
	// console.log('/test success');
	ctx.body=categoryDatas;
})

// 2.将服务器应用实例挂载到电脑的某个端口上,并监视该端口
app.listen('5000',function(error,msg){
	if(error){
		console.log('服务器启动失败',error)
	}else{
		console.log('服务器成功启动,启动于:http://localhost:5000')
	}
})