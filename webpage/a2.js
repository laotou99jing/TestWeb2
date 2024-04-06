/**
 * 
 * 
 * 
 * 
 * */


var pub1 = localStorage.getItem('walletAddr');
var prv1 = localStorage.getItem('walletPrv');
console.log("pub1-=>"+pub1+",prv1-=>"+prv1);

const key = {
	keys:{
		pub: pub1,
		prv: prv1,
	},
	sign:function({from, to, amount, timestamp }){
		console.log("sign-=>",from);
		console.log("sign-=>",to);
		console.log("sign-=>",amount);
		console.log("sign-=>",timestamp);
		return this.signMsg(`${timestamp}-${amount}-${from}-${to}`);
	},
	signMsg:function(value,prv = this.keys.prv){
		console.log(" signMsg value-=>",value);

		//const keypairTemp = ec.keyFromPrivate(prv)
		const keypairTemp = CryptoJS.SHA3(prv);

		//const buffferMsg = Buffer.from(value)
		const buffferMsg = value;
		//let hexSignature = Buffer.from(keypairTemp.sign(buffferMsg).toDER()).toString('hex')
		let hexSignature = CryptoJS.SHA1(keypairTemp+buffferMsg);
		console.log(" signMsg hexSignature-=>",hexSignature.toString());
		return hexSignature.toString();
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
		console.log('Blockchain');

		this.blockchain = [initBlock];

		this.data = [];

		this.difficulty = 5;


		this.init();

	}
	generateWalletAddr(){
		console.log("generateWalletAddr()");
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
	showData(){
		console.log("showData()");
		console.log(this.data);
	}
	blance(address = key.keys.pub){
		console.log("blance()->",address);
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
	isValidTrans(trans){
		console.log("isValidTrans()",trans);
		return trans.every(v => this.verityTransfer(v));
	}
	calculateHashForBlock(block){
		console.log("calculateHashForBlock-=>",block);
		const  {index, previousHash, timestamp, data, nonce } = block;

		return this.calculateHash(
			index,
			previousHash,
			timestamp,
			data,
			nonce
		)

	}
	boardcast(action){//待完成
		console.log("boardcast action-=>",action);

	}
	isValidNewBlock(newBlock,previousBlock){//完成
		console.log("isValidNewBlock");
		console.log("newBlock-=>",newBlock);
		console.log("previousBlock-=>",previousBlock);

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
	transfer(from, to, money){//待完成
		console.log('transfer')
		console.log("from",from);
		console.log("to",to);
		console.log("money",money);

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
	sha256Hash(value,showLog = false){
		//console.log("sha256Hash-=>",value);
		//const hash = crypto.createHash('sha256').update(String(value)).digest('hex');
		//const hash = CryptoJS.SHA256(value).toString();
		
		const sha256 = CryptoJS.algo.SHA256.create();
		sha256.update(String(value));
		//const hash = sha256.digest('hex');
		//const hash = sha256.finalize();
		const hash = sha256.finalize().toString();
		//console.log("hash-=>",hash);
		if(showLog){
			 console.log(`[信息] 数据是 ${value} 哈希值是${hash}`);
		}
		return hash;
	}
	calculateHash(index,previousHash,timestamp,data,nonce){
		/*
		console.log("index",index);
		console.log("previousHash",previousHash);
		console.log("timestamp",timestamp);
		console.log("data",data);
		console.log("nonce",nonce);
		*/
		return this.sha256Hash(index+previousHash+timestamp+JSON.stringify(data)+nonce,false);
	}
	generateNewBlock(){
		console.log('generateNewBlock()');
		const nextIndex = this.blockchain.length;
		const previousHash = this.getLastBlock().hash;

		let data = this.data;
		let timestamp = new Date().getTime();
		let nonce = 0;
		let hash = this.calculateHash(nextIndex,previousHash,timestamp,data,nonce);
		console.log("hash-=>",hash);
		while(hash.slice(0,this.difficulty)!=='0'.repeat(this.difficulty)){
			nonce = nonce + 1;
			timestamp = new Date().getTime();
			hash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);
		}
		console.log("nonce-=>",nonce);
		return {
			index: nextIndex,
			previousHash,
			timestamp,
			nonce,
			hash,
			data: this.data
		}
	}
	verityTransfer(trans){
		console.log('verityTransfer trans-=>',trans);
		return trans.from === '0' ? true: key.verity(trans,trans.from);
	}
	getLastBlock(){
		console.log('getLastBlock()');
		return this.blockchain[this.blockchain.length -1]
	}
	mine(){
		console.log('mine()');
		const start = new Date().getTime();

		if(!this.data.every(v => this.verityTransfer(v))){
			console.log('step1');
			return;
		}
		console.log('step2');

		this.transfer('0',key.keys.pub,100);

		const newBlock = this.generateNewBlock();
		console.log("newBlock-=>",newBlock);

		if(this.isValidNewBlock(newBlock, this.getLastBlock())){
			this.blockchain.push(newBlock);
			this.data = [];
		}else{
			console.log('[错误]: 不合法的区块或者是链', newBlock);
		}

		this.boardcast({type:'mine',data: newBlock});

		const end = new Date().getTime();
		const offset = ((end - start) / 1000).toFixed(2);
		console.log(`[信息]: 挖矿结束 用时${offset}s , 算了${newBlock.nonce}次, 哈希值是${newBlock.hash}，入账100 请笑纳`)

		return newBlock;
	}
	showBlockChain(){
		console.log("showBlockChain()");
		console.log(this.blockchain);
	}
	init(){
		console.log('init()');
		//初始化链条
		
		//查看缓存中有没有已有的链条
		
		//将缓存中的链条还原到内存中
	}
	hi(){
		console.log('Blockchain hi');
	}
}

(function(){
	console.log("a2.js start");

	const blockchain = new Blockchain();
	
	const chainDB = new PouchDB('chainDatabase');

	this.A2Test = function(){
		
		this.init();
	}
	
	A2Test.prototype.init = function(){
		console.log('init');
		console.log("step1");
		chainDB.info().then(function(info){
			console.log("info-=>",info);
		});
		console.log("step2");
		
		blockchain.hi();

		blockchain.showBlockChain();
		console.log("开始挖币");
		/*
		console.log("blockchain.mine()-=>",
			blockchain.mine()
		);
		*/
		var bc1 = blockchain.mine();
		blockchain.showBlockChain();
		
		this.addChainToDB(bc1);
	}

	A2Test.prototype.mine1 = function(){
		console.log("mine1()");

		console.log("开始挖币");
		/*
		console.log("blockchain.mine()-=>",
			blockchain.mine()
		);
		*/

		var bc2 = blockchain.mine();
		blockchain.showBlockChain();
		blockchain.showData();
		this.addChainToDB(bc2);
	}

	A2Test.prototype.blance1 = function(){
		console.log("blance1");
			
		//console.log("blance-=>",blockchain.blance())
		return blockchain.blance();
	}
	
	A2Test.prototype.generateWalletAddr = function(){
		console.log("generateWalletAddr");
		
		return blockchain.generateWalletAddr();
	}

	A2Test.prototype.test1 =  function(){
		console.log("test1");
		
		chainDB.put({
			_id: new Date().getTime(),
			title: 'abc',
			completed: false
		}, (err,resp) =>{
			if(!err){
				console.log("Successfully posted")
			}
		});
		
		return "ok";
	}
	
	A2Test.prototype.test2 =  function(){
		console.log("test2");
		arrs1 = [];
		chainDB.allDocs({
			include_docs: true,
			descending: true
		}, (err,doc) => {
			if(!err){
				console.log("doc-=>",doc);
				//console.log("doc.rows-=>",doc.rows);
				console.log("doc.total_rows-=>",doc.total_rows);
				for(item1 of doc.rows){
					console.log("item1-=>",item1.doc);
					var ddd1 = item1.doc
					arrs1.push(ddd1);
				}
				this.deletePDBs(arrs1);
			}
		});
		
	}
	
	A2Test.prototype.deletePDBs =  function(e){
		console.log("test2",e);
		for(i of e){
			console.log("i-=>",i);
			chainDB.remove(i);
		}
			
	}
	A2Test.prototype.addChainToDB = function(e){
		console.log("addChainToDB",e);
		chainDB.put({
			_id: 'chainDB-'+e.index,
			chainData: e,
			rowst: true
		},(err,resp) =>{
			if(!err){
				console.log("Successfully added")
			}
		});
	}
	
	A2Test.prototype.destroyDataBase = function(e){
		console.log("destroyDataBase");
		
		chainDB.destroy().then(function(response){
			console.log("response-=>",response);
		}).catch(function(err){
			console.log("err-=>",err);
		});
		
		return 'destroy ok';
	}
	
})();
/*
db.get('mydoc').then(function (doc) {
    // handle doc
}).catch(function (err) {
    console.log(err);
});
db.get('mydoc').then(function(doc) {
      return db.put({
        _id: 'mydoc',
        _rev: doc._rev,
        title: "Let's Dance"
      });
 }).then(function(response) {
      // handle response
      }).catch(function (err) {
      console.log(err);
});
db.put({
      _id: 'mydoc',
      title: 'Heroes'
 }).then(function (response) {
     // handle response
 }).catch(function (err) {
     console.log(err);
 });
db.get('mydoc').then(function(doc) {
        return db.remove(doc);
}).then(function (result) {
        // handle result
}).catch(function (err) {
        console.log(err);
 });

*/