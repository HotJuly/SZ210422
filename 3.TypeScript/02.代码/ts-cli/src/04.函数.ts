(function(){
  function add(x:number,y:number=9,z?:number):string{
    return x+y+z+""
  }

  // let a = 1;
  // a="striung"

  let cheng:(a:number,b:number)=>number = function(x:number,y:number):number{
    return x*y
  }

  function log(x:number,...args: number[]){
    console.log(x,args.toString())
  }

  // let (cheng:(a:number,b:number)=>number) 
  // =
  //  function(x:number,y:number):number{
  //   return x*y
  // }

  add(1)

  cheng(3,4)


  log(1,2,23,4,5,6,6,7,8,9,0)

})();

(function(){
  /*
    现在有一个函数,他能接收两个实参,实参的数据类型可以是数字或者字符串
    如果两个都是数字,就返回相乘的结果
    如果两个都是字符串,就返回拼接的结果

    实参必须同时是number,或者同时是string
  */

  function getLength(a:number,b:number)
  function getLength(a:string,b:string)
  function getLength(a:number|string,b:number|string){
    if(typeof a==="number"&&typeof b==="number"){
      return a*b
    }else if(typeof a==="string"&&typeof b==="string"){
      return a+b
    }
  }

  console.log(getLength("2","2"))
  console.log(getLength(1,9))
  console.log(getLength(1,"2"))

})();