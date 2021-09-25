import Vue from 'vue';
const state={
	cartList:[
    {
		"selected":true,
		"count":2,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1535004,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1535004,
        "sellVolume": 4001,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101761748,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575893634989,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "男式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1636062,
        "displaySkuId": 1636056,
        "productPlace": "",
        "itemSizeTableFlag": false
    },
    {
		"selected":false,
		"count":6,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1536001,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1536001,
        "sellVolume": 3634,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101896296,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575894115275,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "女式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1634105,
        "displaySkuId": 1634104,
        "productPlace": "",
        "itemSizeTableFlag": false
    }]
};

const actions={
};

const mutations={
	ADDTOCARTMUTATION(state,good){
		// 商品详情页面,将自己的商品信息对象传递到该mutation中,并将数据添加到购物车中
		/*
			需求:当用户点击添加至购物车功能
				如果购物车中没有存在该商品,就将当前商品推入购物车中,数量默认为1
				如果购物车中存在该商品,就将该商品的数据+1
		
		*/
	   const shopItem = state.cartList.find((shopItem)=>{
		   return shopItem.id === good.id;
	   })
	   
	   // 有一个属性,修改该属性的值,但是页面没有展示最新数据
	   
	   if(shopItem){
		   console.log('+1',shopItem)
		   shopItem.count+=1
	   }else{
		   console.log('=1',good)
		   // good.count=1;
		   Vue.set(good,'count',1);
		   Vue.set(good,'selected',true);
		   state.cartList.push(good);
	   }
	   
		// console.log('ADDTOCARTMUTATION')
	},
	CHANGECOUNTMUTATION(state,{flag,index}){
		// console.log('CHANGECOUNTMUTATION',flag,index)
		/*
			需求:当用户点击商品+/-号时,将对应商品的数量进行加一或者减一
				注意:如果当前商品数量已经是1,在触发减号按钮,对应商品应该被删除
		*/
	   const shopItem = state.cartList[index];
	   if(flag){
		shopItem.count++;
	   }else{
		   if(shopItem.count>1){
			shopItem.count--;
		   }else{
			   state.cartList.splice(index,1);
		   }
	   }
	},
	CHANGESELECTEDMUTATION(state,{selected,index}){
		// console.log('CHANGESELECTEDMUTATION')
		state.cartList[index].selected=selected;
	},
	CHANGEALLSELECTEDMUTATION(state,selected){
		// console.log('CHANGEALLSELECTEDMUTATION')
		/*
			将所有商品的选中状态都变成当前selected相同状态
		*/
	   state.cartList.forEach((shopItem)=>{
		   shopItem.selected=selected
	   })
	}
};

const getters={
	isSelectedAll(state){
		/*
			如果当前购物车中所有商品都处于选中状态,全选按钮也处于选中状态
			如果当前购物车中有一个及以上商品处于未选中状态,全选按钮处于未选中状态
			如果当前购物车中没有商品,全选按钮处于未选中状态
			函数返回值类型:布尔值
			
			every
				数组中所有的元素都满足条件,就返回true,否则返回false
			some
				数组中至少有一个满足条件,就返回true,否则返回false
		*/
	   if(state.cartList.length){
		const result = state.cartList.every((shopItem)=>{
			return shopItem.selected
		})
		// console.log(result)
		return result;
	   }
	   return false;
	}
};


export default{
	state,
	actions,
	mutations,
	getters
}