// (function(){
//     class Person{
//         public name:string;
//         protected age:number;
//         private phone:number;

//         constructor(name,age,phone){
//             this.name=name;
//             this.age=age;
//             this.phone=phone;
//         }

//         sayHello(text){
//             console.log(text)
//         }
//     }

//     class Student extends Person{
//         readonly price:number
//         constructor(name,age,phone,price){
//             // Person.call(this,name,age,phone)
//             super(name,age,phone)
//             this.price=price;
//         }

//         sayHello(){
//             console.log(`我是${this.name},我今年${this.age},我有${this.price}钱,我的联系方式${this.phone}`)
//         }
//     }

//     let p1 = new Person('小明',18,177777);
//     let s1 = new Student('小王',17.99,10000,10000000000);
//     console.log(s1.name,s1.age,s1.phone,s1.price)
//     s1.sayHello();
//     // s1.price+=1000000;

//     // 公共，私有与受保护的修饰符

// })();

// (function(){
//     class Person {
//         static name1:string="小王";
//         firstName: string = 'A'
//         lastName: string = 'B'
//         get fullName () {
//           return this.firstName + '-' + this.lastName
//         }
//         set fullName (value) {
//           const names = value.split('-')
//           this.firstName = names[0]
//           this.lastName = names[1]
//         }
//       }
      
//       const p = new Person()
//       console.log(p.fullName)
      
//     //   p.firstName = 'C'
//     //   p.lastName =  'D'
//     //   console.log(p.fullName)
      
//       p.fullName = 'E-F'
//       console.log(p.firstName, p.lastName)
// })();

(function(){
    // 抽象类
    // 现在有一个人类的类,他必须要有sayHello方法和name属性

    // interface IPerson{
    //     name:string;
    //     sayHello:(text:string)=>void;
    // }

    // class Perosn implements IPerson{
    //     name:string;
    //     sayHello(text){
    //         console.log(text)
    //     }
    // }

    // abstract class M{
    //     name:string;
    //     sayHello(text:string):void;
    //     cry(){
    //         console.log('crycrycrycrycrycry')
    //     }
    // }

    // class Perosn extends M{
    //     name:string;
    //     sayHello(text){
    //         console.log(text)
    //     }
    // }

    // 抽象类>=接口
    // 可以在约束子类的同时,给子类提供一些可调用的方法和属性
    abstract class Animal {

        abstract cry ():void
      
        run () {
          console.log('run()')
        }
      }
      
      class Dog extends Animal {
        cry () {
          console.log(' Dog cry()')
        }
      }
      
      const dog = new Dog()
      const dog1 = new Animal()
      dog.cry()
      dog.run()


})();