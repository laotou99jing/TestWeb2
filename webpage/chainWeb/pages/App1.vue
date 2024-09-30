<script setup>
import { ref, onMounted } from 'vue'
import modal from './WalletModal.vue'
import modala from './MineModal.vue'
import { abc, generateWalletAddr, mine1, getWalletCost } from 'chainTest1'

const msg = ref('如无矿池服务器在线，那只能进行模拟的挖矿，矿链只能存在你的游览器上')
const walletAddr = ref('')
const walletAddrCheck = ref('')

const walletCosts = ref(0)

const msg1a = ref('');

var ii1 = null;
const serverList = ref([
	{
		id: 0,
		name: '测试服务器',
		addrs:'本地游览器',
		speed: '0',
		createDate: '2016-10-3',
		connCount: 0,
		totalCost: 0,
		remark1: '',
		remark2: ''
	}
])

const showModal = ref(false)
const showModala = ref(false)
const showMine1 = ref(false)


const abc1 = () => {
	console.log("abc1");
}

const openWalletDialog = () =>{
	showModal.value = true
	
	var gwc1 = getWalletCost(walletAddr.value);	
	walletCosts.value = gwc1;
}

const openAndStartMine = () => {//打开挖矿窗口，开始挖矿
	showModala.value = true
	
	clearInterval(ii1);
	ii1 = setInterval(function() {
		showMine1.value = !showMine1.value;		
		/*fetch('./a1.json').then(response => {
			if (!response.ok) { throw new Error('Network response was not ok');	}
			return response.json();
		}).then(json => { console.log("json",json);
		}).catch(err => { console.log("err-=>",err); });*/
		mineMine()
	},1500);
}

const mineMine = async () => {
	var msg1 = await mine1(walletAddr.value);
	console.log("msg1-=>",msg1);
	msg1a.value = msg1;
	return msg1;
}

const stopMine = () => {
	clearInterval(ii1);
	showMine1.value = false;
	showModala.value = false;
}

const getWalletCost1 = () =>{
	var gwc1 = getWalletCost(walletAddr.value)
}

//    clearInterval(intervalID);
//let intervalID = setInterval(function() {
//console.log('这个消息每隔1秒就会打印一次');
//}, 1000);
const generateWalletAddr1 = () => {
	var arr1 = generateWalletAddr()
	walletAddr.value = arr1[0]
	walletAddrCheck.value = arr1[1]
	
	localStorage.setItem('walletAddr',arr1[0])
	localStorage.setItem('walletAddrCheck',arr1[1])
}

const initialData = () => {
	var wa1 = localStorage.getItem('walletAddr')
	var wa2 = localStorage.getItem('walletAddrCheck')
	//console.log("wa1",wa1)
	//console.log("wa2",wa2)

	if (wa1 === ''){
	
	}else{
		walletAddr.value = wa1;
		walletAddrCheck.value = wa2;
	}
	//console.log("walletAddr-=>",walletAddr.value)
}

const fn = async () => {
	console.log("async fn");
	const res1 = await fn1();
	console.log("res1-=>",res1);
}
			
const fn1 = () => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			resolve(mineMine()); 
			console.log("fn1 Promise");
		},300)
	});
}

function abc321(){
	return 'function abc321';
}

function test1(){

	//fn()

}

onMounted(() => {
	console.log(`the component is now mounted.`)
	abc()
	initialData()
	test1()
})
/*
const largeArray = Array.from({length:1000000},() => Math.random());
*/
</script>
<template>
<div class = "main1">

  <header>
	<div class="leftHeader">
	<p><div class="logo1">撒币区</div></p>
	<span>&nbsp;&nbsp;&nbsp;</span>
	<p><div class="menu1">
		菜单1&nbsp;&nbsp;
		菜单2&nbsp;&nbsp;
		地址查询余额&nbsp;&nbsp;
		添加矿池&nbsp;&nbsp;
	</div></p>
	</div>
	<div class="rightHeader">
	<p><div class="wallet1">
		<!-- <a href="#" @click="showModal = true"> 钱包</a> -->
		<a href="#" @click="openWalletDialog"> 钱包</a>
	</div></p>
	<p>
	<span>&nbsp;&nbsp;&nbsp;</span>
	</p><p>
	<span>&nbsp;&nbsp;&nbsp;</span>
	</p><p>
	<span>&nbsp;&nbsp;&nbsp;</span>
	</p>
	<p><div class="login1">
		<RouterLink to="/login">登入</RouterLink>
	</div></p>
	</div>
  </header>
  <div class="container">
  <p><div class="firstImage1">
	没钱挖矿，又想研究下区块链的原理，所以有了这个网站。
	这是个区块链技术网站，实现了一个区块链的挖币和交易的网站
	点击登入，获取一个钱包地址/下列服务器点击进行挖矿/在服务器上可以交易货币
  </div></p>
  <p><div class="listServers">
  <div class="title1">服务器列表</div>
  <div class="listItem1">
	<p style="font-size: 20px;color: yellow;padding: 25px;font-style: italic;">
	服务器说明： {{ msg }}
	</p>
	<p>
		<table border=0 width=100%>
			<tr><td>序号</td><td>名称</td><td>地址</td><td>速率</td><td>发布日期</td><td>连接数</td><td>总币数</td><td>挖矿</td><td>交易</td></tr>
			<tr v-for="(item,index) in serverList">
				<td>{{ index }}</td>
				<td>{{ item.name }}</td>
				<td>{{ item.addrs }}</td>
				<td>{{ item.speed }}</td>
				<td>{{ item.createDate }}</td>
				<td>{{ item.connCount }}</td>
				<td>{{ item.totalCost }}</td>
				<td><button @click="openAndStartMine">点击挖矿</button></td>
				<td><button @click="">点击交易</button></td>
			</tr>
		</table>
	</p>

  </div>
  
  </div></p>
  </div>
  <footer>
	我把这个区块币称之为骑牛币，做这个页面只是测试区块链技术是否可用。
	并不是用来发布币和挖矿，所挖出的矿币，也是不能长期保存的，矿池服务器会关。
  </footer>


<Teleport to="body">
	<!-- 使用这个 modal 组件，传入 prop -->
	<modal :show="showModal" @close="showModal = false">
	  <template #header>
		<h3>钱包地址</h3>
	  </template>
	  <template #body>
		<div v-if="walletAddr === '' || walletAddr === null">
			<button @click="generateWalletAddr1">生成钱包地址</button>
		</div>
		<div v-else>
			<label>钱包地址</label>
			<input v-model="walletAddr" style="width: 100%;"><br>
			<label>钱包校验码，用于检查钱包地址的真伪</label>
			<input v-model="walletAddrCheck" style="width: 100%;"><br>			
		</div>
		<div>
		<p>当前余额：{{ walletCosts }}</p>
		</div>
	  </template>
	  <template #footer>
		<h6>一个游览器就一个地址</h6>
	  </template>
	</modal>
</Teleport>

<Teleport to="body">
	<modala :show="showModala" @close="showModala = false">
		<template #header>
			<h3>在线挖矿</h3>
		</template>
		<template #body>
			<p>
			<p>正在挖矿...</p><p>{{ msg1a }}</p>
				<!-- <Transition name="fade"> 
					<p v-if="showMine1"> 正在挖矿... </p>
					<p v-else> {{ msg1a }} </p> 
				</Transition>-->
			</p>
			<p v-show="showModala == true">
				<button @click="stopMine">停止挖矿</button>
			</p>
		</template>
		<template #footer>
<h6>开着此窗口自动挖矿,每次挖矿时间10-360秒不等，视机器性能而定,性能低下的机器会出现游览器假死，无法关闭等现象</h6>
		</template>
	</modala>
</Teleport>

</div>
</template>
<style scoped>
.main1 {
	/*background-color: black;*/
	color: white;
	margin: 11px;
    padding: 11px;
}
.leftHeader {
	width: 50%;
	display: flex;
}
.rightHeader {
	width: 50%;
	display: flex;
	justify-content: right;
    align-items: center;
}
.container {
	/*background-color: cyan;*/
	margin: 10px;
	padding: 10px;
}
.firstImage1 {
	/*background-color: orange;*/
	background: url("images/headImage1.png") no-repeat center center/cover;
	height: 400px;
	width: 100%;
	display: flex;
	justify-content: center;
    align-items: center;
	color: red;
	font-size: 22px;
	padding: 10px;
}
.listServers {
	/*background-color: green;*/
}

.listServers .title1 {
	/*background-color: #720189;*/
	text-align: center;
	padding: 15px;
}
.listServers .listItem1 {
	/*background-color: #0587ba;*/
	padding: 10px;
}

 /*contain 用在 url中还原图片*/
.logo1 {
	background: url("images/logo1.png") no-repeat center center/cover;
	height: 111px;
	width: 111px;
	margin: 2px;
	margin: 2px 2px 2px 20px;
	padding: 2px;
}
.menu1 {
	margin: 2px;
	padding: 2px;
	display: flex;
	/*background-color: #b88611;*/
	justify-content: center;
    align-items: center;
}
header {
	/*background-color: red;*/
	display: flex;
}
footer {
	background-color: #42426d99;
	margin: 2px;
	padding: 2px;
}
/* ***************************************** */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>