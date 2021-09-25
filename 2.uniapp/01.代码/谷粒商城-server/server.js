const Koa = require('koa');
const KoaRouter = require('koa-router');
const Fly = require("flyio/src/node");
const jwt = require('jsonwebtoken');

const fly = new Fly();

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
				query参数:ctx.query(自动将路径中的query字符串转换为query对象)
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

// 该接口用于返回首页分类所需要的数据
const indexCateList = require('./datas/indexCateList.json');
router.get('/getIndexCateList',async function(ctx){
	// console.log('/test success');
	// koa服务器,无法使用定时器延迟返回数据的操作
	// koa服务器要求,如果想要延迟返回数据的操作,路由的回调函数必须返回一个promise对象
	await new Promise((resolve)=>{
		setTimeout(()=>{
			resolve()
		},2000)
	})
	
	ctx.body=indexCateList;
})



// 该接口用于请求商品详细信息数据
const goods = require('./datas/goods.json');
router.get('/getGoodDetail',function(ctx){
	console.log('/getGoodDetail',ctx.query);
	const goodId = ctx.query.goodId;
	
	// 通过goodId找到对应的商品对象
	const good = goods.find((good)=>{
		return good.id === goodId>>>0 ;
	})
	
	if(good){
		ctx.body=good;
	}else{
		ctx.body={
			errMsg:"查无此商品"
		}
	}
	
})




// 该接口用于获取用户唯一标识openId
router.get('/getOpenId',async function(ctx){
	const code = ctx.query.code;
	const appId = 'wxe5931a68ea66cece';
	const appSecret = '8cd19df8abaac742313e5294b85b8c4d';
	
	const url= `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
	
	const result = await fly.get(url);
	const {openid} = JSON.parse(result.data);
	// console.log(openid)
	// jwt.sign(需要加密的数据, 盐)
	const salt = 'atguigu';
	const token = jwt.sign(openid, salt);
	// console.log(token)
	
	// const newOpenId = jwt.verify(token,salt);
	// console.log(newOpenId,openid)
	
	ctx.body=token
})


// 2.将服务器应用实例挂载到电脑的某个端口上,并监视该端口
app.listen('5000',function(error,msg){
	if(error){
		console.log('服务器启动失败',error)
	}else{
		console.log('服务器成功启动,启动于:http://localhost:5000')
	}
})