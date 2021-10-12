function MVVM(options) {
  /*
    options={
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          },
        }
    }
    this->vm对象(MVVM的实例对象)
  */

    // beforeCreate的执行时机!!!!!!!


   //把配置对象保存给vm一份
    this.$options = options;
    //把配置对象的data保存到vm的_data 地址一样
    var data = this._data = this.$options.data;
    
    // var data = (this._data = this.$options.data);

    var me = this; //保存vm给me

    /*
      响应式:当某些属性的属性值发生变化之后,会更新页面
      拆解需求:
          1.如何知道属性值发生变化?
            监视用户对属性值的修改?
            可以通过Object.defineProperty来设置属性的get和set方法,从而监视用户的属性值的读取和修改
          2.如何更新页面?
            需要做好准备:
              1.每个响应式属性都会生成一个dep对象
              2.每个插值语法或者指令都会生成一个watcher对象
              3.dep和watcher之间会收集到与自身相关联的对方
            流程:
              1.用户修改data中的数据
              2.经过数据代理和数据劫持
              3.数据劫持中的set方法监视到数据变化,调用dep.notify方法
              4.notify方法通知所有与当前响应式属性相关的wacther更新视图
            注意:
              1.Vue1中更新范围的最小单位:节点
                Vue2中更新范围的最小单位:组件
                从字面上理解,Vue2更新范围更大,似乎性能更低,但其实不然,
                  实际上Vue2也考虑到这种问题,所以才有了diff算法和虚拟DOM

      1.数据代理
      目的:主要是为了减少书写的代码量,方便开发者书写代码,与响应式无关(读取或者设置属性都不需要this.$data了)
      注意:
        只有data对象的直系属性名才会被数据代理
    */
    Object.keys(data).forEach(function(key) {
      // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
        me._proxy(key);
    });

    
    // ["msg","person"].forEach(function(key) {
    //   // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
    //     vm._proxy("msg");
    // });

    /*
      2.数据劫持
      目的:主要是为了监视用户对data数据的修改
      间接目的:通知视图更新
      注意:
        data对象中具有多少个直接或者间接属性,都会被劫持
    */

    observe(data, this);

    // created的执行时机!!!!!!!!!!!!!

    /*
      3.模版解析
      目的:解析模版,将模版结构中的指令,插值语法替换成对应的data数据或者事件
      注意点:
        1.Vue1中如果没有传入el属性,会自动挂载在body身上
          Vue2中如果没有传入el或者调用$mount,组件不会挂载到页面上
    */
    this.$compile = new Compile(options.el || document.body, this)
    // this.$compile = new Compile("#app" || document.body, vm)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
      //     vm._proxy("msg");
      // key=>"msg" this=>vm对象
      // 保存vm以方便下面的函数中也可以找到vm
        var me = this;

        //正儿八经的数据代理
        //在vm身上添加一个和data当中同名的属性
        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
              //当访问vm身上的属性值的时候，会去返回data的同名属性值
                return me._data[key];
            },
            set: function proxySetter(newVal) {
              //当设置vm身上的属性值的时候，会去设置data的同名属性值
                me._data[key] = newVal;
            }
        });

        // obj.name=123
        // console.log(obj.name)
      //   Object.defineProperty(vm, "msg", {
      //     configurable: false, //不能重复定义
      //     enumerable: true, //可以遍历
      //     get: function proxyGetter() {
      //       //当访问vm身上的属性值的时候，会去返回data的同名属性值
      //         return vm._data["msg"];
      //     },
      //     set: function proxySetter(newVal) {
      //       //当设置vm身上的属性值的时候，会去设置data的同名属性值
      //         vm._data["msg"] = newVal;
      //     }
      // });
      }

};