function Compile(el, vm) {
    // "#app", vm
    // this->compile实例
    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        // this.$fragment = this.node2Fragment(app元素);

        // beforeMount的执行时机!!!!!!!!!!

        this.init();
        // 挂载
        this.$el.appendChild(this.$fragment);
        
        // mounted的执行时机!!!!!!!!!!!!!!!
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // app元素
        var fragment = document.createDocumentFragment(),
            child;

        while (child = el.firstChild) {
            // 将app中所有的元素都移动到文档碎片中,抄家了
            // 将html中的节点移动到文档碎片中,移入文档碎片的DOM节点,会从页面上消失
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->fragment文档碎片
        // 获取el中所有的子节点组成的伪数组
        // [text节点,p标签,text节点]
        var childNodes = el.childNodes,
            me = this;
            // this->compile实例

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [text节点,p标签,text节点].forEach(function(node) {
            // text=>"{{person.name}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (complie.isElementNode(node)) {
        //         me.compile(p标签);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(text节点, "person.name");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(p标签);
        //     }
        // });

        
    },

    compile: function(node) {
        // node=>p标签

        // nodeAttrs => [{name:"id",nodeValue:"a"},{name:"v-on:click",nodeValue:"handleClick"}]
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                // dir=>on:click
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // text节点, "person.name"
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "person.name");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // 每有一个插值语法就会调用一次bind
        // compileUtil.text(text节点, vm, "person.name");
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "person.name", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // text节点, vm, "person.name", 'text'
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        //watcher对于首次渲染没有任何作用,他的作用在于更新视图
        // 每一个watcher对应一个插值语法
        // watcher会使用闭包缓存对应的节点
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        
        // var updaterFn = updater['textUpdater'];
        // var updaterFn = function(node, value) {
    //     node.textContent = typeof value == 'undefined' ? '' : value;
    // }

        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "person.name"));
        // updaterFn && updaterFn(text节点, "xiaoming");

        // new Watcher(vm, "person.name", function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // vm, "person.name"
        var val = vm._data;
        // exp=["person","name"]
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
            // val = vm._data["person"]
            // val = person["name"]
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // text节点, "xiaoming"
        
        // this.cb.call(vm, atguigu, xiaoming);
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};