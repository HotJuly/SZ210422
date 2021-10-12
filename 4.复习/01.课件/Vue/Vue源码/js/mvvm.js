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

    /*
      3.模版解析
    */
    this.$compile = new Compile(options.el || document.body, this)
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

        obj.name=123
        console.log(obj.name)
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