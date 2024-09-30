/**
* 区块链测试类
*/

console.log("chainTest1.js");

var A2Test1 = null;
var blockchain = null;
var boolRun1 = false;

const gArr1 = [];

var pub1 = localStorage.getItem('walletAddr');
var prv1 = localStorage.getItem('walletPrv');
//console.log("pub1-=>"+pub1+",prv1-=>"+prv1);

/*

*/
(function(){
	console.log("function() step1");
	
	
	
})()
/*

cfc8d6ef3a4a30db51b5bc3bc2563c719b335d39f080eb128016c12488dec8ce
4d9ed77c374c449d7c125750f3228f7305a1495d39c43b76ae77b4cc091fa8007ac804a0a82e92ced4ae7bef5fda1fa29b12a387993e4be95cc4e585a8e52b51

b24b7bc8b35090452e2eeb7b2d6865ca304a81877c7951b763170a6b5faae77b
3579cbd33458d8010b71fdd257b0d629a9027ee802da93112398b1cee12368f7ee3fe23697a301df09e9f329570b3d549b0979a18a59fccec96088c47bffdeae

*/

const key = {
	keys:{
		pub: 'cfc8d6ef3a4a30db51b5bc3bc2563c719b335d39f080eb128016c12488dec8ce',
		prv: '4d9ed77c374c449d7c125750f3228f7305a1495d39c43b76ae77b4cc091fa8007ac804a0a82e92ced4ae7bef5fda1fa29b12a387993e4be95cc4e585a8e52b51',
	},
	sign:function({from, to, amount, timestamp }){
		return this.signMsg(`${timestamp}-${amount}-${from}-${to}`);
	},
	signMsg:function(value,prv = this.keys.prv){
		const keypairTemp = CryptoJS.SHA3(prv);
		const buffferMsg = value;
		let hexSignature = CryptoJS.SHA1(keypairTemp+buffferMsg);
		//console.log(" signMsg hexSignature-=>",hexSignature.toString());
		return hexSignature.toString();
	},
	verify:function({ from, to, amount, timestamp, sig }){
		return this.verifyMsg(`${timestamp}-${amount}-${from}-${to}`, sig, from)
	},
	verifyMsg:function(value, sig, pub){
		//console.log("sig-=>",sig);
		const keypairTemp = CryptoJS.SHA3(pub);
		const buffferMsg = value;
		let hexSignature = CryptoJS.SHA1(keypairTemp+buffferMsg);
		//console.log(" signMsg hexSignature-=>",hexSignature.toString());
		return hexSignature.toString();
	}
}

const indexDB = {
	
}

const listIndexDB = () => {
	var arr1a = new Array();
	const request = indexedDB.open('myChainBase', 3);
	request.onupgradeneeded = function(event) {
	  const db = event.target.result;
	  console.log('数据库需要升级');
	  // 创建一个对象存储空间
	  
	  db.createObjectStore('chainStore', { keyPath: 'id', autoIncrement: true });
	  console.log('chainStore对象存储表创建成功');
	}
	
	request.onsuccess = function(event) {
		const db = event.target.result;
		console.log('数据库打开成功');
		// 连接数据库的表，比获取读写权限，默认只读
		const transaction = db.transaction(['chainStore'], 'readwrite');
		const objectStore = transaction.objectStore('chainStore');
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				//console.log("cursor.value-=>",cursor.value);
				arr1a.push(cursor.value)
				gArr1.push(cursor.value)
				cursor.continue();
			}
			else {
				console.log("No more entries!");
			}
			console.log("3. arr1a.length-=>",arr1a.length);
		}
		console.log("1. arr1a.length-=>",arr1a.length);
	}
	console.log("2. arr1a.length-=>",arr1a.length);
	return arr1a;
	/*
	setTimeout(()=>{
		return arr1a;
	},500);
	*/
}

const insertIndexDB = (newBlock) => {
	console.log("insertIndexDB-=>",newBlock);
	
	const request = indexedDB.open('myChainBase', 3);
	request.onupgradeneeded = function(event) {
	  const db = event.target.result;
	  console.log('数据库需要升级');
	  // 创建一个对象存储空间
	  
	  db.createObjectStore('chainStore', { keyPath: 'id', autoIncrement: true });
	  console.log('chainStore对象存储表创建成功');
	}
	
	request.onsuccess = function(event) {
	  const db = event.target.result;
	  console.log('数据库打开成功');
	  // 连接数据库的表，比获取读写权限，默认只读
	  const transaction = db.transaction(['chainStore'], 'readwrite');
	  const objectStore = transaction.objectStore('chainStore');
	  console.log("newBlock-=>",JSON.stringify(newBlock));
	  const re = objectStore.add(newBlock);
	  re.onsuccess = function (event) {
		console.log('文件添加成功');
	  }
	}
}

const initBlock = {
	index: 0,
	previousHash: '0',
	timestamp: 1538669227813,
	data: 'First Data Block',
	hash: '00000aa1fbf27775ab79612bcb8171b3a9e02efe32fa628450ba6e729cf03996',
	nonce: 979911
}


class Blockchain{
	constructor(){
		//console.log('Blockchain');
		this.blockchain = [initBlock];
		this.data = [];
		this.difficulty = 5;
		this.init()
	}

	//1 初始化区块链的币链
	initChainData(db){}
	//2 检查本地是否有已有的区块链币链
	checkLocalCacheDB(db){}
	//3 生成钱包地址
	generateWalletAddr(){
		//console.log("generateWalletAddr()");
		var arr1s = [];
		const timestamp = new Date().getTime();
		const sha256 = CryptoJS.algo.SHA256.create();
		sha256.update(String(timestamp));
		const hash1 = sha256.finalize().toString();
		console.log("hash1-=>",hash1);
		arr1s.push(hash1);
		var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512,String(timestamp));
		hmac.update(hash1);
		var hash2 = hmac.finalize().toString();
		console.log("hash2-=>",hash2);
		arr1s.push(hash2);
		return arr1s
	}
	//4 显示当前的币链
	showData(){
		//console.log("showData()");
		console.log(this.data);
	}
	//5 查询余额
	blance(address = key.keys.pub){
		//console.log("blance()->",address);
		let balance = 0;

		for(const block of this.blockchain){
			for(const trans of block.data){
				if(trans.from === address){
					balance -= trans.amount;
				}
				
				if(trans.to === address){
					balance += trans.amount
				}
			}
		}
		return balance;		
	}
	//6 检查链是否正确
	isValidTrans(trans){
		//console.log("isValidTrans()",trans);
		
		return trans.every(v => this.verityTransfer(v))
	}
	//7 计算区块的哈希值
	calculateHashForBlock(block){
		//console.log("calculateHashForBlock-=>",block);
		
		const {index, previousHash, timestamp, data, nonce } = block;
		
		return this.calculateHash(
			index,
			previousHash,
			timestamp,
			data,
			nonce
		)
	}
	//8 广播计算的哈希值
	boardcast(action){}
	//9 检查新的币链是否合法
	isValidNewBlock(newBlock,previousBlock){
		/*
		console.log("isValidNewBlock");
		console.log("newBlock-=>",newBlock);
		console.log("previousBlock-=>",previousBlock);
		*/
		const newBlockHash = this.calculateHashForBlock(newBlock);	
		
		if(previousBlock.index + 1 !== newBlock.index){
			console.log('[错误]: 新区快index不对')
			return false;
		}else if(previousBlock.hash !== newBlock.previousHash){
			console.log(`[错误]: 第${newBlock.index}个区块的previousHash不对`)
			return false;
		}else if(newBlockHash !== newBlock.hash){
      		console.log(`[错误]: 第 ${newBlock.index}个区块hash不对,算出的是${newBlockHash} 区块里本来的hash是${newBlock.hash} 看来数据被篡改了`);
			return false;
		}else if(newBlockHash.slice(0,this.difficulty) !== '0'.repeat(this.difficulty)){
			return false;
		}else if(!this.isValidTrans(newBlock.data)){
      		console.log('[错误]: 交易不合法')
      		return false;
		}else{
			return true;
		}
	}
	//10 交易币链
	transfer(from, to, money){
		/*
		console.log('transfer')
		console.log("from",from);
		console.log("to",to);
		console.log("money",money);
		*/
		let amount = parseInt(money);
		if(isNaN(amount)){
      		console.log('[信息]: amount必须是数字')
			return;
		}
		
		const timestamp = new Date().getTime();
		const sig = key.sign({from,to,amount,timestamp});

		let transObj = {from, to, amount, sig, timestamp};

		if(from !== '0'){
			const blance = this.blance(from);
			if(blance < amount){
		        console.log(`[信息]: 余额不足，还剩${blance},想支出${amount}`)
		        return; 
			}
			this.boardcast({type:'trans',data: transObj});
		}
		this.data.push(transObj);
		return transObj;
	}
	//11 加密类型
	sha256Hash(value,showLog = false){
		//console.log("sha256Hash-=>",value);
		
		const sha256 = CryptoJS.algo.SHA256.create();
		sha256.update(String(value));
		const hash = sha256.finalize().toString();
		
		if(showLog){
			 console.log(`[信息] 数据是 ${value} 哈希值是${hash}`);
		}
		return hash;
	}
	//12 进行哈希计算
	calculateHash(index,previousHash,timestamp,data,nonce){
		/*
		console.log("index",index);
		console.log("previousHash",previousHash);
		console.log("timestamp",timestamp);
		console.log("data",data);
		console.log("nonce",nonce);
		*/
		return this.sha256Hash(index+
					previousHash+
					timestamp+
					JSON.stringify(data)+
					nonce,
					false
				);
	}
	//13 产生新的区块
	generateNewBlock(){
		//console.log('generateNewBlock()');
		
		const nextIndex = this.blockchain.length;
		console.log("nextIndex-=>",nextIndex);
		const previousHash = this.getLastBlock().hash;
		
		let data = this.data;
		let timestamp = new Date().getTime();
		let nonce = 0;
		
		let hash = this.calculateHash(nextIndex,previousHash,timestamp,data,nonce);
		//console.log("hash-=>",hash);
		while(hash.slice(0,this.difficulty)!=='0'.repeat(this.difficulty)){
			nonce = nonce + 1;
			timestamp = new Date().getTime();
			hash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);
			// 使用setTimeout分散工作，避免页面假死
			/*if (nonce % 1000 === 0) {
			  setTimeout(() => {
				// 空函数，仅用于允许浏览器处理事件
			  }, 0);
			}*/
		}
		
		//console.log("nonce-=>",nonce);
		
		return {
			index: nextIndex,
			previousHash,
			timestamp,
			nonce,
			hash,
			data: this.data
		}
	}
	//14 检查交易是否正确
	verityTransfer(trans){
		//console.log('verityTransfer trans-=>',trans);
		
		return trans.from === '0' ? true: key.verify(trans,trans.from);
	}
	//15 获取最后的区块
	getLastBlock(){
		//console.log('getLastBlock()');
		
		return this.blockchain[this.blockchain.length -1]
	}
	//16 挖矿
	mine(){
		//console.log("mine()");
		
		const start = new Date().getTime();
		
		//console.log('step1');
		if(!this.data.every(v => this.verityTransfer(v))){
			console.log('step1');
			return;
		}
		
		//console.log('step2');
		
		this.transfer('0',key.keys.pub,100);
		const newBlock = this.generateNewBlock();
		console.log("newBlock-=>",newBlock);
		
		if(this.isValidNewBlock(newBlock, this.getLastBlock())){
			this.blockchain.push(newBlock);
			this.data = [];
		}else{
			console.log('[错误]: 不合法的区块或者是链', newBlock);
			return;
		}

		this.boardcast({type:'mine',data: newBlock});
		
		const end = new Date().getTime();
		const offset = ((end - start) / 1000).toFixed(2);
		let msg1 = `[信息]: 此次挖矿结束 用时${offset}s,算了${newBlock.nonce}次,哈希值是${newBlock.hash},入账10请笑纳`
		console.log(msg1)
		
		insertIndexDB(newBlock)
		
		var arr1 = [];
		arr1.push(newBlock);
		arr1.push(msg1);
		return arr1;
	}
	//17 显示区块链
	showBlockChain(){
		//console.log("showBlockChain()");
		console.log(this.blockchain);
	}
	//18 初始化
	init(){
		
		//const arr1b = listIndexDB();
		listIndexDB();
		setTimeout(()=>{
			console.log("gArr1-=>",gArr1);
			if (gArr1.length > 0){
				gArr1.forEach(item => {
					console.log("gArr1",item)
					this.blockchain.push(item)
				})
				//del this.blockchain[0]
				//this.blockchain.shift();
			}
			console.log("this.blockchain.length-=>",this.blockchain.length)
		},1500);
	}
	//19 检查缓存中有没有已有的区块链
	hi(db){}
}



function A2Test(){
	this.init();
}

A2Test.prototype.init = function(){
	//console.log('init');
	//console.log("step2");
	blockchain = new Blockchain();
	//blockchain.hi();
}

A2Test.prototype.generateWalletAddr = function(){
	console.log("generateWalletAddr");
	
	return blockchain.generateWalletAddr();
}

//A2Test.prototype.mine1 = async function(){
A2Test.prototype.mine1 = function(){
	//console.log("mine1");
	//var bc3 = await blockchain.mine();
	var bc3 = blockchain.mine();
	blockchain.showBlockChain();
	blockchain.showData();
	console.log("bc3-=>",bc3);
	return bc3[1]
}

A2Test.prototype.transfer = function(e){
	console.log("transfer",e);
	var bc4 = blockchain.transfer(key.keys.pub,e,10)
	
	return bc4;
}

A2Test.prototype.blance = function(e) {
	console.log("blance",e);
	var bl1 = blockchain.blance(e);
	return bl1;
}

export function abc(){
	//console.log("chainTest1 abc");
	A2Test1 = new A2Test();
	boolRun1 = true;
	//test5();
	/*if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	}*/
	//var wadr = A2Test1.generateWalletAddr();
	//console.log("wadr-=>",wadr);
	
	//console.log("CryptoJS.SHA3-=>",CryptoJS.SHA3("aaaabbbbcccccdddeeefffffggggg").toString());
}


export function generateWalletAddr(){
	console.log("chainTest1 generateWalletAddr");
	
	
	var wadr = A2Test1.generateWalletAddr();
	console.log("wadr-=>",wadr);
	return wadr;
}

export function mine1(e){
	console.log("mine1() 开始挖币",e);
	
	if (boolRun1) {
		boolRun1 = false;
		
		A2Test1.transfer(e);
		const bc2 = A2Test1.mine1();
		/*bc2.then(res => {
			console.log("res-=>",res) 
			boolRun1 = true;
			if (res == undefined) return '';
			return res;
		})
		boolRun1 = false;
		A2Test1.transfer(e);
		const bc2 = A2Test1.mine1();
		var bc2a;
		bc2.then(res => {
			console.log("res-=>",res)
			bc2a = res;
			console.log("bc2a-=>",bc2a);
			boolRun1 = true;
			if (bc2a == undefined) return '';
			return bc2a;
		})*/		
		console.log("bc2-=>",bc2);
		boolRun1 = true;
		if (bc2 == undefined) return '';
		return bc2;
	} else {
		
	}
	//setTimeout(()=>{
		return '';
	//},500)
}

export function getWalletCost(e){
	console.log("getWalletCost()",e);
	var icc = A2Test1.blance(e);
	console.log("icc-=>",icc);
	return icc;
}

const test1 = () => {
	console.log("test1");
	// Let us open our database
	var request = window.indexedDB.open("MyTestDatabase", 3);
	// This event is only implemented in recent browsers   
	request.onupgradeneeded = function(event) { 
	  // Save the IDBDatabase interface 
	  var db = event.target.result;

	  // Create an objectStore for this database
	  var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
	};

	var db;
	var request = indexedDB.open("MyTestDatabase");
	request.onerror = function(event) {
	  console.log("Why didn't you allow my web app to use IndexedDB?!");
	};
	request.onsuccess = function(event) {
	  db = event.target.result;
	};
	db.onerror = function(event) {
	  // Generic error handler for all errors targeted at this database's
	  // requests!
	  console.error("Database error: " + event.target.errorCode);
	};

	// This is what our customer data looks like.
	const customerData = [
	  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
	  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
	];
	const dbName = "the_name";

	var request = indexedDB.open(dbName, 2);

	request.onerror = function(event) {
	  // Handle errors.
	};
	request.onupgradeneeded = function(event) {
	  var db = event.target.result;

	  // Create an objectStore to hold information about our customers. We're
	  // going to use "ssn" as our key path because it's guaranteed to be
	  // unique - or at least that's what I was told during the kickoff meeting.
	  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

	  // Create an index to search customers by name. We may have duplicates
	  // so we can't use a unique index.
	  objectStore.createIndex("name", "name", { unique: false });

	  // Create an index to search customers by email. We want to ensure that
	  // no two customers have the same email, so use a unique index.
	  objectStore.createIndex("email", "email", { unique: true });

	  // Use transaction oncomplete to make sure the objectStore creation is 
	  // finished before adding data into it.
	  objectStore.transaction.oncomplete = function(event) {
		// Store values in the newly created objectStore.
		var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
		customerData.forEach(function(customer) {
		  customerObjectStore.add(customer);
		});
	  };
	};

}

const test2 = () => {

	// 浏览器本地数据库
	console.log(indexedDB);// window.indexedDB
	 
	// 打开数据库
	const request = indexedDB.open('myDatabase', 1);
	 
	request.onerror = function(event) {
	  console.error('数据库打开报错');
	}
	 
	request.onupgradeneeded = function(event) {
	  const db = event.target.result;
	  console.log('数据库需要升级');
	  // 创建一个对象存储空间
	}
	 
	request.onsuccess = function(event) {
	  const db = event.target.result;
	  console.log('数据库打开成功');
	}

}

const test3 = () => {
	// 打开数据库
	const request = indexedDB.open('myDatabase', 2);
	 
	request.onupgradeneeded = function(event) {
	  const db = event.target.result;
	  console.log('数据库需要升级');
	  // 创建一个对象存储空间
	  
	  db.createObjectStore('imgStore', { keyPath: 'id', autoIncrement: true });
	  console.log('对象存储表创建成功');
	}
	 /*
	request.onsuccess = function(event) {
	  const db = event.target.result;
	  console.log('数据库打开成功');
	}
	*/
	request.onsuccess = function(event) {
	  const db = event.target.result;
	  console.log('数据库打开成功');
	  // 连接数据库的表，比获取读写权限，默认只读
	  const transaction = db.transaction(['imgStore'], 'readwrite');
	  const objectStore = transaction.objectStore('imgStore');
	  // 添加数据
	  
//	  const re = objectStore.add({
//		name: 'test',
//		content:'测试数据'
//	  });
//	  re.onsuccess = function (event) {
//		console.log('文件添加成功');
		/*var cursor = event.target.result;
		if (cursor) {
			console.log("Name: " + cursor.key);
			cursor.continue();
		}
		*/
//	  }
		
	  objectStore.openCursor().onsuccess = function(event) {
		  var cursor = event.target.result;
		  if (cursor) {
			//console.log("Name for SSN " + cursor.key + " is " + cursor.value.name);
			//console.log("key: " + cursor.key + ", name: " + cursor.value.name + ", content: " + cursor.value.content);
			cursor.continue();
		  }
		  else {
			console.log("No more entries!");
		  }
	  }

	}
 /*
	request.onsuccess = function(event) {
	  const db = event.target.result;
	  console.log('数据库打开成功');
	  // 连接数据库的表，比获取读写权限，默认只读
	  const transaction = db.transaction(['imgStore'], 'readwrite');
	  const objectStore = transaction.objectStore('imgStore');
	  // // 添加数据
	  // const re = objectStore.add({
	  //   name: 'test',
	  //   content:'测试数据'
	  // });
	  // re.onsuccess = function (event) {
	  //   console.log('文件添加成功');
	  // }
	  // 读取数据
	  const re2 = objectStore.get(1);
	  re2.onsuccess = function (event) {
		console.log(re2.result);
	  }
	}
*/
}

const test4 = () => {
	var i1 = localStorage.length
	console.log("i1-=>",i1);

	localStorage.setItem("name","caibin") //存储名字为name值为caibin的变量
	localStorage.name = "caibin"; // 等价于上面的命令
	localStorage // Storage {name: "caibin", length: 1}


	localStorage.getItem("name") //caibin,读取保存在localStorage对象里名为name的变量的值
	localStorage.name // "caibin"
	localStorage.valueOf() //读取存储在localStorage上的所有数据
	localStorage.key(0) // 读取第一条数据的变量名(键值)
	//遍历并输出localStorage里存储的名字和值
	for(var i=0; i<localStorage.length;i++){
		console.log('localStorage里存储的第'+i+'条数据的名字为：'+localStorage.key(i)+',值为：'+localStorage.getItem(localStorage.key(i)));
	}

	var students = {
		xiaomin: {
			name: "xiaoming",
			grade: 1
		},
		teemo: {
			name: "teemo",
			grade: 3
		}
	}

	students = JSON.stringify(students);  //将JSON转为字符串存到变量里
	console.log(students);
	localStorage.setItem("students",students);//将变量存到localStorage里

	var newStudents = localStorage.getItem("students");
	newStudents = JSON.parse(students); //转为JSON
	console.log(newStudents); // 打印出原先对象

}


const test5 = () => { // Worker 异步多线程
	
	if (window.Worker) {
		// 创建一个新的 Worker
		const worker = new Worker('worker.js');
	 
		// 发送数据到 Worker
		worker.postMessage('Hello World');
	 
		// 接收 Worker 的消息
		worker.onmessage = function(e) {
			console.log('Received message from worker:', e.data);
		};
	} else {
		console.log('Your browser does not support Web Workers.');
	}
	
}

/*
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // 将响应解析为 JSON 格式
  })
  .then(data => {
    // 处理返回的数据
    console.log(data);
  })
  .catch(error => {
    // 处理错误
    console.error('There was a problem with the fetch operation:', error);
  });

//fetch() 函数发送了一个 GET 请求到指定的 URL，并返回一个 Promise 对象。使用 .then() 方法处理响应，并将其解析为 JSON 格式。如果请求失败或者响应状态码不在 200-299 范围内，将会抛出一个错误并通过 .catch() 方法捕获和处理。

function longRunningOperation() {
  let i = 0;
  while (i < 1000000) {
    // 执行一些计算或其他工作
    i++;
 
    // 使用setTimeout分散工作，避免页面假死
    if (i % 1000 === 0) {
      setTimeout(() => {
        // 空函数，仅用于允许浏览器处理事件
      }, 0);
    }
  }
  console.log('长时间运行的操作完成');
}
 
longRunningOperation();
*/



