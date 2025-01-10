/*

方法名	对应版本	功能	原数组是否改变
concat() 	ES5- 	合并数组，并返回合并之后的数据 	n
join() 	ES5- 	使用分隔符，将数组转为字符串并返回 	n
pop() 	ES5- 	删除最后一位，并返回删除的数据 	y
shift() 	ES5- 	删除第一位，并返回删除的数据 	y
unshift() 	ES5- 	在第一位新增一或多个数据，返回长度 	y
push() 	ES5- 	在最后一位新增一或多个数据，返回长度 	y
reverse() 	ES5- 	反转数组，返回结果 	y
slice() 	ES5- 	截取指定位置的数组，并返回 	n
sort() 	ES5- 	排序（字符规则），返回结果 	y
splice() 	ES5- 	删除指定位置，并替换，返回删除的数据 	y
toString() 	ES5- 	直接转为字符串，并返回 	n
valueOf() 	ES5- 	返回数组对象的原始值 	n
indexOf() 	ES5 	查询并返回数据的索引 	n
lastIndexOf() 	ES5 	反向查询并返回数据的索引 	n
forEach() 	ES5 	参数为回调函数，会遍历数组所有的项，回调函数接受三个参数，分别为value，index，self；forEach没有返回值 	n
map() 	ES5 	同forEach，同时回调函数返回数据，组成新数组由map返回 	n
filter() 	ES5 	同forEach，同时回调函数返回布尔值，为true的数据组成新数组由filter返回 	n
every() 	ES5 	同forEach，同时回调函数返回布尔值，全部为true，由every返回true 	n
some() 	ES5 	同forEach，同时回调函数返回布尔值，只要由一个为true，由some返回true 	n
reduce() 	ES5 	归并，同forEach，迭代数组的所有项，并构建一个最终值，由reduce返回 	n
reduceRight() 	ES5 	反向归并，同forEach，迭代数组的所有项，并构建一个最终值，由reduceRight返回 	n 

方法详解
　　1：concat();

　　　　功能：合并数组，可以合并一个或多个数组，会返回合并数组之后的数据，不会改变原来的数组；
1
2
3
	
var str1 = [12,2,"hello"];var str2 = ["world"];
console.log(str1.concat(str2));　　　　　　　　//[12, 2, "hello", "world"]
console.log(str1);　　　　　　　　　　　　　　　　//[12,2,"hello"];
　　2：join();

　　　　功能：将数组转为字符串并返回转化的字符串数据，不会改变原来的数组；

　　　  注意：()中用双引号包括自己想用的分隔符，默认为逗号，这里方便观察，我用了-　　　

var str1 = [12,2,"hello"];
var str2 = ["world"];
console.log(str1.join("-"));　　　　　　　　//12-2-hello
console.log(str1);　　　　　　　　　　　　　　//[12, 2, "hello"]

　　3：pop();

　　　　功能：删除数组的最后一位，并且返回删除的数据，会改变原来的数组

var str1 = [12,2,"hello"];
console.log(str1.pop()　　　　　　　　//hello
console.log(str1);　　　　　　　　　　//[12, 2]

　　4：shift();

　　　　功能：删除数组的第一位数据，并且返回新数组的长度，会改变原来的数组

var str1 = [12,2,"hello"];
console.log(str1.shift());　　　　　　//12
console.log(str1);　　　　　　　　　　　//[2,"hello"]

　　5：unshift();

　　　　功能：在数组的首位新增一个或多数据，并且返回新数组的长度，会改变原来的数组

　　　  注意：unshift()方法返回的数据是新数组的长度，它增加的数据可以是一个也可以是多个，可以理解为增加一连串的数据，
复制代码

var str1 = [12,2,"hello"];
var str2 = [43,2,"test"];
console.log(str1.unshift("你好"));　　　　　　　　　　　　　　//4
console.log(str2.unshift("hello","world"));　　　　　　　　//5
console.log(str1);　　　　　　　　　　　　　　　　　　　　　　　//["你好", 12, 2, "hello"]
console.log(str2);　　　　　　　　　　　　　　　　　　　　　　　//["hello", "world", 43, 2, "test"]

复制代码
6：push();

　　　　功能：在数组的最后一位新增一个或多个数据，并且返回新数组的长度，会改变原来的数组

　　　  注意：push()方法返回的是数据是新数组的长度，它增加的数据可以是一个也可以是多个，可以理解为增加一连串的数据
复制代码

var str1 = [12,2,"hello"];
var str2 = [43,2,"test"];
console.log(str1.push("你好"));　　　　　　　　　　//4
console.log(str2.push("hello","world"));　　　　//5
console.log(str1);　　　　　　　　　　　　　　　　　//[12, 2, "hello","你好"]
console.log(str2);　　　　　　　　　　　　　　　　　//[43, 2, "test","hello", "world"]

复制代码
　　7：reverse();

　　　　功能：将数组的数据进行反转，并且返回反转后的数组，会改变原数组

var str1 = [12,2,"hello"];
console.log(str1.reverse());　　　　　　//["hello", 2, 12]
console.log(str1);　　　　　　　　　　　　//["hello", 2, 12]

　　8：sort();

　　　　功能：对数组内的数据进行排序(默认为升序)，并且返回排过序的新数组，会改变原来的数组

　　　  注意：

　　　　　　8.1：这里的排序是针对字符的排序，先使用数组的toString()方法转为字符串，再逐位比较，3是大于12的，因为首位3>1，不要与Number型的数据排序混淆

　　　　　　8.2：str2数组中增加了三个字符，可以看到，比较的时候，zoom是最大的，因为首位的英文字母通过ASCII码可以转为相应的数值，再根据数值比较　　　　
复制代码

var str1 = [12,2,43,5,2,5];
var str2 = [92,2,43,"hello",5,2,5];
console.log(str1.sort());　　　　　　　　//[12, 2, 2, 43, 5, 5]
console.log(str1);　　　　　　　　　　　　//[12, 2, 2, 43, 5, 5]
console.log(str2.sort());　　　　　　　　//[2, 2, 43, 5, 5, 92, "abc", "hello", "zoom"]
console.log(str2);　　　　　　　　　　　　//[2, 2, 43, 5, 5, 92, "abc", "hello", "zoom"]

复制代码

　　　　　　8.3：排序问题

　　　　　　参数：sort(callback) 如果需要按照数值排序，需要传参。sort(callback)，callback为回调函数，该函数应该具有两个参数，比较这两个参数，然后返回一个用于说明这两个值的相对顺序的数字（a-b）。其返回值如下：

　　　　　　　　若 a 小于 b，返回一个小于 0 的值。

　　　　　　　　若 a 等于 b，则返回 0。

　　　　　　　　若 a 大于 b，则返回一个大于 0 的值。
复制代码

var str3 = [92,2,43,5,2,5];     
console.log(str3.sort(fn));　　　　　　　　　　　　　　　　　//[2, 2, 5, 5, 43, 92]

console.log(str3);　　　　　　　　　　　　　　　　　　　　　　//[2, 2, 5, 5, 43, 92]

function fn (a,b){
　　　　return a-b;
 }

复制代码
　　9：slice();

　　　　功能：截取指定位置的数组，并且返回截取的数组，不会改变原数组

　　　  参数：slice(startIndex, endIndex)

　　　  注意：可从已有的数组中返回选定的元素。该方法接收两个参数slice(start,end)，strat为必选，表示从第几位开始；end为可选，表示到第几位结束(不包含end位)，省略表示到最后一位；start和end都可以为负数，负数时表示从最后一位开始算起，如-1表示最后一位。
复制代码

var arr = ["T1","J1","L1","L2","M1"];
    console.log(arr.slice(1,3));        //["J1","L1"]
    console.log(arr.slice(1));          //["J1","L1","L2","M1"]
    console.log(arr.slice(-4,-1));      //["J1","L1","L2"]
    console.log(arr.slice(-2));         //["Lily","M1"]
    console.log(arr.slice(1,-2));       //["J1","L1"]
    console.log(arr);                   //["T1","J1","L1","L2","M1"]

复制代码
　　10：splice();

　　　　功能：向数组中添加，或从数组删除，或替换数组中的元素，然后返回被删除/替换的元素。

　　　  参数：splice(start,num,data1,data2,...); 所有参数全部可选。　

var arr = ["Tom","Jack","Lucy","Lily","May"];    
console.log(arr.splice(2,0,"a","b"));  //[]
console.log(arr);    //["Tom", "Jack", "a", "b", "Lucy", "Lily", "May"]---原数组改变

　　11：toString();

　　　　功能：将数组转换成字符串，类似于没有参数的join()。该方法会在数据发生隐式类型转换时被自动调用，如果手动调用，就是直接转为字符串。不会改变原数组

var str = [1,2,3];
console.log(str.toString());     //1,2,3
console.log(str);                //[1,2,3]

　　12：valueOf();

　　　　功能：返回数组的原始值（一般情况下其实就是数组自身），一般由js在后台调用，并不显式的出现在代码中

    var str = [1,2,3];
    console.log(str.valueOf());         //[1,2,3]
    console.log(str);                   //[1,2,3]
    //为了证明返回的是数组自身
    console.log(str.valueOf() == str);  //true

　　13:IndexOf();

　　　　功能：根据指定的数据，从左向右，查询在数组中出现的位置，如果不存在指定的数据，返回-1，找到了指定的数据返回该数据的索引

　　　  参数：indexOf(value, start);value为要查询的数据；start为可选，表示开始查询的位置，当start为负数时，从数组的尾部向前数；如果查询不到value的存在，则方法返回-1

　　　  注意：如果找到该数据，立即返回该数据的索引，不再往后继续查找
复制代码

 var str = ["h","e","l","l","o"];
 console.log(str.indexOf("l"));        //2
 console.log(str.indexOf("l",3));      //3
 console.log(str.indexOf("l",4));      //-1
 console.log(str.indexOf("l",-1));     //-1
 console.log(str.indexOf("l",-3));     //2

复制代码
　　14:lastIndexOf();

　　　　功能：根据指定的数据，从左向右，查询在数组中出现的位置，如果不存在指定的数据，返回-1，找到了指定的数据返回该数据的索引

　　　  参数：indexOf(value, start);value为要查询的数据；start为可选，表示开始查询的位置，当start为负数时，从数组的尾部向前数；如果查询不到value的存在，则方法返回-1
复制代码

var str = ["h","e","l","l","o"];
console.log(str.indexOf("l"));        //2
console.log(str.indexOf("l",3));      //3
console.log(str.indexOf("l",4));      //-1
console.log(str.indexOf("l",-1));     //-1
console.log(str.indexOf("l",-3));     //2

复制代码
　　15:forEach();

　　　　功能：ES5新增的方法，用来遍历数组，没有返回值，

　　　  参数：forEach(callback);callback默认有三个参数，分别为value(遍历到的数组的数据)，index(对应的索引)，self(数组自身)。
复制代码

var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.forEach(function(value,index,self){
     console.log(value + "--" + index + "--" + (arr === self));
})
// 打印结果为：
// Tom--0--true
// Jack--1--true
// Lucy--2--true
// Lily--3--true
// May--4--true
console.log(a);     //undefined---forEach没有返回值
//该方法为遍历方法，不会修改原数组

复制代码
　　16:map();

　　功能：1.同forEach功能；

　　　　   2.map的回调函数会将执行结果返回，最后map将所有回调函数的返回值组成新数组返回。

 

　    参数：map(callback);callback默认有三个参数，分别为value，index，self。跟上面的forEach()的参数一样
复制代码

//功能1：同forEach
    var arr = ["Tom","Jack","Lucy","Lily","May"];
    var a = arr.map(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr === self))
    })
    // 打印结果为：
    // Tom--0--true
    // Jack--1--true
    // Lucy--2--true
    // Lily--3--true
    // May--4--true

    //功能2：每次回调函数的返回值被map组成新数组返回
    var arr = ["Tom","Jack","Lucy","Lily","May"];
    var a = arr.map(function(value,index,self){
        return "hi:"+value;
    })
    console.log(a);     //["hi:Tom", "hi:Jack", "hi:Lucy", "hi:Lily", "hi:May"]
    console.log(arr);   //["Tom", "Jack", "Lucy", "Lily", "May"]---原数组未改变

复制代码
　　17：filter();

　　　　功能：1.同forEach功能；2.filter的回调函数需要返回布尔值，当为true时，将本次数组的数据返回给filter，最后filter将所有回调函数的返回值组成新数组返回（此功能可理解为“过滤”）。

　　　 参数：filter(callback);callback默认有三个参数，分别为value，index，self。
复制代码

//功能1：同forEach
    var arr = ["Tom","Jack","Lucy","Lily","May"];
    var a = arr.filter(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr === self))
    })
    // 打印结果为：
    // Tom--0--true
    // Jack--1--true
    // Lucy--2--true
    // Lily--3--true
    // May--4--true

    //功能2：当回调函数的返回值为true时，本次的数组值返回给filter，被filter组成新数组返回
    var arr = ["Tom","Jack","Lucy","Lily","May"];
    var a = arr.filter(function(value,index,self){
        return value.length > 3;
    })
    console.log(a);         //["Jack", "Lucy", "Lily"]
    console.log(arr);       //["Tom", "Jack", "Lucy", "Lily", "May"]---原数组未改变

复制代码
　　18:every();

　　功能：判断数组中每一项是否都满足条件，只有所有项都满足条件，才会返回true。

　　参数：every()接收一个回调函数作为参数，这个回调函数需要有返回值，every(callback);callback默认有三个参数，分别为value，index，self。

　　功能1：当回调函数的返回值为true时，类似于forEach的功能，遍历所有；如果为false，那么停止执行，后面的数据不再遍历，停在第一个返回false的位置。
复制代码

  //demo1:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.every(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
    })
    // 打印结果为：
    // Tom--0--true
    //因为回调函数中没有return true，默认返回undefined，等同于返回false

    //demo2:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.every(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
        return value.length < 4;
    })
    // 打印结果为：
    // Tom--0--true
    // abc--1--true
    // Jack--2--true
    //因为当遍历到Jack时，回调函数到return返回false，此时Jack已经遍历，但是后面数据就不再被遍历了

    //demo3:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.every(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
        return true;
    })
    // 打印结果为：
    // Tom--0--true
    // abc--1--true
    // Jack--2--true
    // Lucy--3--true
    // Lily--4--true
    // May--5--true
    //因为每个回调函数的返回值都是true，那么会遍历数组所有数据，等同于forEach功能

复制代码

　　　　功能2：当每个回调函数的返回值都为true时，every的返回值为true，只要有一个回调函数的返回值为false，every的返回值都为false
复制代码

  //demo1:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.every(function(value,index,self){
        return value.length > 3;
    })
    console.log(a);           //false

    //demo2:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.every(function(value,index,self){
        return value.length > 2;
    })
    console.log(a);           //true

复制代码
　　19:some();　　　

　　　　功能：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。

　　　 参数：some()接收一个回调函数作为参数，这个回调函数需要有返回值，some(callback);callback默认有三个参数，分别为value，index，self。

　　　 功能1：因为要判断数组中的每一项，只要有一个回调函数返回true，some都会返回true，所以与every正好相反，当遇到一个回调函数的返回值为true时，可以确定结果，那么停止执行，后面都数据不再遍历，停在第一个返回true的位置；当回调函数的返回值为false时，需要继续向后执行，到最后才能确定结果，所以会遍历所有数据，实现类似于forEach的功能，遍历所有。

　　功能1：因为要判断数组中的每一项，只要有一个回调函数返回true，some都会返回true，所以与every正好相反，当遇到一个回调函数的返回值为true时，可以确定结果，那么停止执行，后面都数据不再遍历，停在第一个返回true的位置；当回调函数的返回值为false时，需要继续向后执行，到最后才能确定结果，所以会遍历所有数据，实现类似于forEach的功能，遍历所有。

 
复制代码

    //demo1:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.some(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
        return value.length > 3;
    })
    // 打印结果为：
    // Tom--0--true
    // abc--1--true
    // Jack--2--true

    //demo2:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.some(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
        return true;
    })
    // 打印结果为：
    // Tom--0--true

    //demo3:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.some(function(value,index,self){
        console.log(value + "--" + index + "--" + (arr == self))
        return false;
    })
    // 打印结果为：
    // Tom--0--true
    // abc--1--true
    // Jack--2--true
    // Lucy--3--true
    // Lily--4--true
    // May--5--true

复制代码

 

　　　　功能2：与every相反，只要有一个回调函数的返回值都为true，some的返回值为true，所有回调函数的返回值为false，some的返回值才为false

 
复制代码

  //demo1:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.some(function(value,index,self){
        return value.length > 3;
    })
    console.log(a);             //true

    //demo2:
    var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
    var a = arr.some(function(value,index,self){
        return value.length > 4;
    })
    console.log(a);             //false

复制代码

 
　　20.reduce();　　

　　　功能：从数组的第一项开始，逐个遍历到最后，迭代数组的所有项，然后构建一个最终返回的值。

　　　参数：reduce()接收一个或两个参数：第一个是回调函数，表示在数组的每一项上调用的函数；第二个参数（可选的）作为归并的初始值，被回调函数第一次执行时的第一个参数接收。 reduce(callback,initial);callback默认有四个参数，分别为prev，now，index，self。 callback返回的任何值都会作为下一次执行的第一个参数。 如果initial参数被省略，那么第一次迭代发生在数组的第二项上，因此callback的第一个参数是数组的第一项，第二个参数就是数组的第二项。

 
复制代码

//demo1:不省略initial参数，回调函数没有返回值
    var arr = [10,20,30,40,50];
    arr.reduce(function(prev,now,index,self){
        console.log(prev + "--" + now + "--" + index + "--" + (arr == self))
    }, 2019)
    // 打印结果为：
    // 2019--10--0--true
    // undefined--20--1--true
    // undefined--30--2--true
    // undefined--40--3--true
    // undefined--50--4--true
    // 此时回调函数没有return，所以从第二次开始，prev拿到的是undefined

    //demo2:省略initial参数，回调函数没有返回值
    var arr = [10,20,30,40,50];
    arr.reduce(function(prev,now,index,self){
        console.log(prev + "--" + now + "--" + index + "--" + (arr == self))
    })
    // 打印结果为：第一次，回调函数的第一个参数是数组的第一项。第二个参数就是数组的第二项
    // 10--20--1--true
    // undefined--30--2--true
    // undefined--40--3--true
    // undefined--50--4--true
    // 此时回调函数没有return，所以从第二次开始，prev拿到的是undefined

    //demo3:不省略initial参数，回调函数有返回值
    var arr = [10,20,30,40,50];
    arr.reduce(function(prev,now,index,self){
        console.log(prev + "--" + now + "--" + index + "--" + (arr == self));
        return "hello";
    }, 2019)
    // 打印结果为：
    // 2019--10--0--true
    // hello--20--1--true
    // hello--30--2--true
    // hello--40--3--true
    // hello--50--4--true
    // 此时回调函数有return，所以从第二次开始，prev拿到的是回调函数return的值

    //demo4:省略initial参数，回调函数有返回值
    var arr = [10,20,30,40,50];
    arr.reduce(function(prev,now,index,self){
        console.log(prev + "--" + now + "--" + index + "--" + (arr == self));
        return "hello";
    })
    // 打印结果为：第一次，回调函数的第一个参数是数组的第一项。第二个参数就是数组的第二项
    // 10--20--1--true
    // hello--30--2--true
    // hello--40--3--true
    // hello--50--4--true
    // 此时回调函数有return，所以从第二次开始，prev拿到的是回调函数return的值

    //demo5：使用reduce计算数组中所有数据的和
    var arr = [10,20,30,40,50];
    var sum = arr.reduce(function(prev,now,index,self){
        return prev + now;
    })
    console.log(sum);      //150
    // 回调函数的最后一次return的结果被返回到reduce方法的身上

    //demo6：使用reduce计算数组中所有数据的和
    var arr = [10,20,30,40,50];
    var sum = arr.reduce(function(prev,now,index,self){
        return prev + now;
    }, 8)
    console.log(sum);      //158
    // 回调函数的最后一次return的结果被返回到reduce方法的身上
    // 因为reduce有第二个参数initial，在第一次执行时被计算，所以最终结果被加上8

复制代码

 
　　21.reduceRight()

　　功能：（与reduce类似）从数组的最后一项开始，向前逐个遍历到第一位，迭代数组的所有项，然后构建一个最终返回的值。

　　参数：同reduce。 demo：同reduce
三：哪些数组方法会改变原数组
　　unshift();
　　push()；
　　shift();
　　pop();
　　sort();
　　reverse();
　　splice();

　　这七个数组方法在上面都有过介绍了，可以看出，再用这些方法的时候，原数组是会被改变的。

 

 

 
*/