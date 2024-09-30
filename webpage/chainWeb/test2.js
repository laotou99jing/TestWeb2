class 类名 {  
  constructor(){
      ...
    }
  ...
}

// 定义类
class ClassName {
  // 构造方法
  constructor(name) {
    this.name = name; // 实例属性
  }
  static author = "zyl"; // 静态属性

  #attr = 10; // 私有属性

  // 静态方法
  static sFn(data) {
    return `我是静态方法，只能通过类名调用，接收的参数为${data}；`;
  }

  // 普通方法
  fn(data) {
    console.log(`私有属性的值为${this.#attr}；`);   // 访问私有属性
    return `我是普通方法，通过实例调用，接收的参数为${data}；`;
  }
}
// 实例化
const class1 = new ClassName("第一个类");
console.log(class1); // ClassName {name: '第一个类'}

// 访问静态属性
console.log(ClassName.author); // zyl

// 访问实例属性
console.log(class1.name); // 第一个类

// 访问静态方法
console.log(ClassName.sFn("arg")); // 我是静态方法，只能通过类名调用，接收的参数为arg；

// 访问实例方法
console.log(class1.fn("123")); // 私有属性的值为10； 我是普通方法，通过实例调用，接收的参数为123；


// 定义类
class ClassName {
  // 构造方法
  constructor(name) {
    this.name = name; // 实例属性
  }
  static author = "zyl"; // 静态属性

  #attr = 10; // 私有属性
  fn() {
    return this.#attr;
  }
}
// 实例化
const class1 = new ClassName("第一个类");
console.log(class1); // ClassName {name: '第一个类'}

// 访问静态属性
console.log(ClassName.author);  // zyl

// 访问实例属性
console.log(class1.name);   // 第一个类

// 访问私有属性
console.log(class1.fn()); // 10


// 定义Person类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// 创建person1实例对象
const person1 = new Person("zyl", 18);
console.log(person1);         // Person {name: 'zyl', age: 18}

// 定义品牌类
class Brand {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  // 静态方法，判断是否为vip用户
  static isVip(count) {
    return count == "zylcount" ? "Vip用户" : "新用户";
  }

  // 静态方法，获取品牌折扣价
  static dPrice(price) {
    return price > 10 ? price * 0.9 : price * 0.95;
  }
}

const brand1 = new Brand("zylBrand", "clothing");
console.log(brand1);                     // Brand {name: 'zylBrand', type: 'clothing'}

// 调用静态方法，通过类名Brand调用，而非实例brand1调用；
console.log(Brand.isVip("1111111"));     // 新用户
console.log(Brand.dPrice(12));           // 10.8



// 定义汽车类
class Car {
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }
  // 定义普通方法 
  getInfo() {
    return `该车的品牌是${this.brand};售卖价格是${this.price}`;
  }
}
let car1 = new Car("volvo", "16.8w");
console.log(car1);                 //  {brand: 'volvo', price: '16.8w'}

// 通过实例调用普通方法
console.log(car1.getInfo());       //  该车的品牌是volvo;售卖价格是16.8w

// 普通方法是定义在Car类的原型上
console.log(Car.prototype);   // {constructor: ƒ, getInfo: ƒ}
console.log(Car.prototype.getInfo === car1.__proto__.getInfo);   // true


class 子类 extends 父类 {
    // 定义子类的属性和方法
    ...    
}


class ParentClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static attr = 'abc';
  static sFn(data){
    return `我是定义在父类的静态方法，收到的参数为：${data}`;
  }
  getInfo(data) {
    return `我是定义在父类的普通方法，收到的参数为：${data}`;
  }
}

class ChildClass extends ParentClass { }

const parent1 = new ParentClass('parent', '45');  
const child1 = new ChildClass('zyl', 20);  
console.log(parent1);                 // ParentClass {name: 'parent', age: '45'}
console.log(child1);                  // ChildClass {name: 'zyl', age: 20}
console.log(ChildClass);              // class ChildClass extends ParentClass {}
console.log(ChildClass.attr);         // abc
console.log(ChildClass.sFn('1111'));  // 我是定义在父类的静态方法，收到的参数为：1111
console.log(child1.getInfo(123));     // 我是定义在父类的普通方法，收到的参数为：123



// 调用父类的构造方法
super();   
// 访问父类属性
super.属性;    
// 调用父类方法  
super.方法名(); 


// 定义父类
class ParentClass {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  static attr = "abc";
  static sFn(data) {
    return `我是定义在父类的静态方法，收到的参数为：${data}`;
  }
  getInfo(data) {
    return `我是定义在父类的普通方法，收到的参数为：${data}`;
  }
}

// 定义子类，继承父类
class ChildClass extends ParentClass {
  constructor(name, age, address, phone) {
    // 调用父类的构造方法
    super(name, age,  address);
    this.phone = phone;
  }

  // 访问父类的静态属性
  static attr = super.attr + "def";
  static sFn(data) {
    // 调用父类的静态方法
    console.log(`子类通过super调用：${super.sFn("super调用的实参")}`);
    return `我是定义在子类的静态方法，收到的参数为：${data}`;
  }
  getInfo(data) {
    // 调用父类的普通方法
    console.log(`子类通过super调用：${super.getInfo("super调用的实参")}`);
    return `我是定义在子类的普通方法，收到的参数为：${data}`;
  }
}

const parent1 = new ParentClass("parent", 45 , "上海");
const child1 = new ChildClass("child", 20, "上海", '11111111');

console.log(parent1);                 // ParentClass {name: 'parent', age: 45, address: '上海'}
console.log(child1);                  // ChildClass {name: 'child', age: 20, address: '上海'}

console.log(ParentClass.attr);        // abc
console.log(ChildClass.attr);         // abcdef

console.log(ParentClass.sFn("111"));  // 我是定义在父类的静态方法，收到的参数为：111

console.log(ChildClass.sFn("222"));   // 子类通过super调用：我是定义在父类的静态方法，收到的参数为：super调用的实参
                                      // 我是定义在子类的静态方法，收到的参数为：222

console.log(parent1.getInfo(123));    // 我是定义在父类的普通方法，收到的参数为：123                                   
console.log(child1.getInfo(456));     // 子类通过super调用：我是定义在父类的普通方法，收到的参数为：super调用的实参 
                                      // 我是定义在子类的普通方法，收到的参数为：456
									  
									  
									  