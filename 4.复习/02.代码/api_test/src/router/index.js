import Vue from 'vue';
import MyRouter from '../july-router';
// import VueRouter from 'vue-router';

import A from '../components/A.vue';
import B from '../components/B.vue';

Vue.use(MyRouter);

export default new MyRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:A
        },
        {
            path:"/about",
            component:B
        }
    ]
})