function Observer(data) {
    // data就是$options.data,vm._data
    // this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // data就是$options.data,vm._data
        // this->ob对象
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
        
        // ["name","msg"].forEach(function(key) {
        //     ob.convert("name", "xiaoming");
        // });
    },
    convert: function(key, val) { 
        //     ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val);  
        // this.defineReactive(vm._data, "msg", "hello mvvm");  
    },

    defineReactive: function(data, key, val) { 
        // vm._data, "msg", "hello mvvm"

        // 目前看来,data中每有一个直系属性就会生成一个Dep的实例对象
        // 最终总结:data中的每一个属性都会生成一个dep对象
            // 每一个响应式属性都会对应一个dep对象
        var dep = new Dep();

        // 如果属性值是一个对象数据类型,对当前这个对象进行深度递归劫持
        var childObj = observe(val); 
        // var childObj = observe("hello mvvm"); 
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                childObj = observe(newVal);
                dep.notify();
            }
        });


        // value值和get/set方法冲突,两者只能存在一个
        // 数据劫持虽然重写了所有的属性,但是通过闭包的方式保留了当前属性的属性值
        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
            //         如果当前的值和之前的旧值相同,不会触发视图更新
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;

        /*
            响应式属性的创建时机:
                1.组件在初始化的时候,就会将data中的所有属性都进行数据劫持,变成响应式属性
                2.当修改一个响应式属性的属性值的时候,如果传入的新值是一个对象,那么会进行深度数据劫持
        */
        //         childObj = observe(newVal);
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    // value=>data对象
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        
        // dep.addSub(watcher);
        this.subs.push(sub);
        // dep.subs.push(watcher);
        // 每个响应式属性都收集了与他相关的插值语法
    },

    depend: function() {
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
        
    }
};

Dep.target = null;