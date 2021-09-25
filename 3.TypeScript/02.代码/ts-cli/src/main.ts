(function(){
    let num:number = 123;

    let str:string = "123";

    let flag:boolean = true;


    // 在非严格模式下,undefined和null是所有类型的子类
    // 在严格模式下,undefined和null是自己各自是一家人
    let un:undefined = undefined;

    let nu:null = null;

    let num1 :number = undefined;
    let num2 :number = null;

    let arr:number[] = [1,2,3];
    let arr1:string[] = ["1","2","3"];

    let arr3:Array<string> = ["1","2","3"];

    // arr1[0].

    // let arr2:any[]=["1","2"];

    // arr2[0].

    // 元组:数组内容的数据类型和数组的长度都限制死的数组
    let tArr:[number,number,string,boolean]=[1,2,"3",true];
    // tArr[4]=123


    // 枚举的所有属性值,从0开始自增长
    enum City{
        "beijing"=100,
        "shanghai"=10000,
        "shenzhen",
        "quanzhou"=9000
    }
    let obj= {
        name:"xiaoming",
        city:City["quanzhou"]
    }
    // console.log(obj,City[obj.city])
    console.log(City)

    let a:any=1;
    a="str";
    a=true;

    // void代表没有任何数据
    // let v1:void = undefined;

    let obj1:object={
        name:"xiaohong"
    }

    let b:number|string=123;


    // 类型断言->告诉TS你信我
    function getLength(value:number|string){
        if((value as string).length){
            return (<string>value).length
        }else{
            return value
        }
    }

    let aabb;
    aabb = "123";
    aabb=123;
})();