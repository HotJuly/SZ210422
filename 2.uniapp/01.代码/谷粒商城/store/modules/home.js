import req from '../../utils/req.js'
import {SETINDEXDATAMUTATION} from '../mutation-types.js'
const state={
	initData:"我是初始化的数据",
	indexData:{}
};

const actions={
	async getIndexData({commit}){
		let result = await req('/getIndexData');
		commit(SETINDEXDATAMUTATION,result)
	}
};

const mutations={
	[SETINDEXDATAMUTATION](state,indexData){
		// console.log('SETINDEXDATAMUTATION')
		state.indexData	= indexData
	}
};

const getters={
	
};


export default{
	state,
	actions,
	mutations,
	getters
}