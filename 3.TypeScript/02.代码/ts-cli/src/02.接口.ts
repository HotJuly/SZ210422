(function(){
    // 现在有一个对象
    // id是number类型, 必须有, 只读的
    // name是string类型, 必须有
    // age是number类型, 必须有
    // sex是string类型, 可以没有

    // 接口就是约束对象,可以对某些对象提出要求
    interface IObj{
        readonly id:number
        name:string
        age:number
        sex?:string
    }

    let obj :IObj = {
        id:1,
        name:"xiaoming",
        age:18,
        sex:"nan"
    }
    // obj.id=666;

    console.log(obj)

    // const obj1= {name:123}
    // obj1.name=666;


    interface IFn{
        (a:number,b:number,c:number):number
    }

    let fn:IFn = function(a:number,b:number):number{
        return a+b
    }
    fn(1,2,3)

    // let fn1 = function(a:number,b:number):void{
    // }
    // fn1(1,2)



})();

(function(){

    interface IPerson{
        name:string
        sayHello:(text:string)=>void
    }

    interface IStudent extends IPerson{
        price:number
    }

    class Student implements IStudent{
        name:string;
        price:number;
        sayHello(text:string){
            console.log(text)
        }
    }

})();