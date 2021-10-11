const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  // 此处正在浅拷贝callbacks数组
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  //返回一个成功的promise对象
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  //所有的nextTick共用一个callbacks回调数组,内部存放所有的回调函数cb
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点:
    1.由于nextTick有开关pending的存在,所以在主线程中无论调用多少次nextTick,都只会开启一个.then
    2.虽然nextTick只开启一个微任务,但是他会通过for循环遍历callbacks中所有的回调函数,并调用
    3.Vue更新视图流程
      1.当用户更新响应式属性时,会触发update方法
      2.update方法内部会调用queueWatcher函数
      3.queueWatcher函数会将更新视图的方法交给nextTick,延迟执行

      
      为什么nextTick的回调函数内部一定能得到最新的DOM节点
        因为更新视图的本质也是nextTick,所以后执行的nextTick可以获取到前面nextTick执行的结果

*/
