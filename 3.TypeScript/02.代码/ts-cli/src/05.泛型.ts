// (function(){
//   /*
//     需求:根据指定的数量 count 和数据 value , 创建一个包含 count 个 value 的数组
//     createArray("a",6)=>["a","a","a","a","a","a"]
//     createArray(3,2)=>[3,3]
//   */
//   function createArray(value:any,count:number):any[]{
//     let arr:any[] = [];
//     for(let index:number =0;index<count;index++){
//       arr.push(value)
//     }
//     return arr;
//   }

//   console.log(createArray("a",6))
//   console.log(createArray(3,2))

//   // 问题:在写ts的函数声明时候,可能会出现数据类型暂时无法确定,只能等到用户传入的时候才能知道的情况
  
// })();

// (function(){
//   /*
//     需求:根据指定的数量 count 和数据 value , 创建一个包含 count 个 value 的数组
//     createArray("a",6)=>["a","a","a","a","a","a"]
//     createArray(3,2)=>[3,3]

//     let arr:number[]=[1,2,3]
//     let arr:Array<number>=[1,2,3]
//     泛型可以理解为是TS新增的一种形参,专门用于传递数据类型
//   */
//   function createArray<T>(value:T,count:number):T[]{
//     let arr:T[] = [];
//     for(let index:number =0;index<count;index++){
//       arr.push(value)
//     }
//     return arr;
//   }

//   console.log(createArray<string>("a",6))
//   console.log(createArray<number>(3,2))
//   // console.log(createArray<number>("3",2))

//   // 问题:在写ts的函数声明时候,可能会出现数据类型暂时无法确定,只能等到用户传入的时候才能知道的情况
  
// })();

// (function(){
//   /*
//     需求:现在有一个函数,接收两个实参,返回值是两个实参组成的数组
//   */
//   function map<KKK,VVV>(a:KKK,b:VVV):[KKK,VVV]{
//     return [a,b]
//   }

//   console.log(map<number,boolean>(1,true))
//   // console.log(map<number,string>(1,true))

// })();


// (function(){
//   class User {
//     id?: number; //id主键自增
//     name: string; //姓名
//     age: number; //年龄
  
//     constructor (name, age) {
//       this.name = name
//       this.age = age
//     }
//   }

//   interface IUserCRUD{
//     data: User[]
//     add:(user :User) => void
//     getById:(id :number) => User
//   }

//   interface IStudentCRUD{
//     data: Student[]
//     add:(user :Student) => void
//     getById:(id :number) => Student
//   }

//   interface IBaseCRUD<T>{
//     data: T[]
//     add:(user :T) => void
//     getById:(id :number) => T
//   }
  
//   class UserCRUD implements IBaseCRUD<User>{
//     data: User[] = []
    
//     add(user: User): void {
//       user = {...user, id: Date.now()}
//       this.data.push(user)
//       console.log('保存user', user.id)
//     }
  
//     getById(id: number): User {
//       return this.data.find(item => item.id===id)
//     }
//   }

  
//   class Student{
//     id?: number; //id主键自增
//     name: string; //姓名
//     age: number; //年龄
  
//     constructor (name, age) {
//       this.name = name
//       this.age = age
//     }
//   }

//   class StudentCRUD implements  IBaseCRUD<Student>{
//     data: Student[] = []
    
//     add(user: Student): void {
//       user = {...user, id: Date.now()}
//       this.data.push(user)
//       console.log('保存user', user.id)
//     }
  
//     getById(id: number): Student {
//       return this.data.find(item => item.id===id)
//     }
//   }
  
  
//   const userCRUD = new UserCRUD()
//   userCRUD.add(new User('tom', 12))
//   userCRUD.add(new User('tom2', 13))
//   console.log(userCRUD.data)
// })();

// (function(){
//   class GenericNumber<T> {
//     zeroValue: T
//     add: (x: T, y: T) => T
//   }
  
//   let myGenericNumber = new GenericNumber<number>()
//   myGenericNumber.zeroValue = 0
//   myGenericNumber.add = function(x, y) {
//     return x + y 
//   }
//   console.log(myGenericNumber.add(myGenericNumber.zeroValue, 1))
  
//   let stringNumeric = new GenericNumber<string>()
//   stringNumeric.zeroValue = 'abc'
//   stringNumeric.add = function(x, y) { 
//     return x + y
//   }
  
//   console.log(stringNumeric.add(stringNumeric.zeroValue, 1))
// })();


(function(){
  /*
    需求:现在具有一个函数,接收一个参数,返回该参数的length属性
  */
  interface ILength{
    length:number
  }

 function getLength<T extends ILength>(s:T){
  return s.length
 }

 let length = getLength<string>("123")

})();