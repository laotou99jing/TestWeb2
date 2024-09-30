<script setup>
import { ref, onMounted } from 'vue'

const emailAddr = ref('');
const playerName = ref('');
const walletAddrs = ref('');
const totalCost = ref('');
const valueCost = ref(0);


const loginBtn = () => {
	console.log("loginBtn");
	
	if(emailAddr.value === '' ||emailAddr.value === null){
		alert('请输入邮箱地址')
		return;
	}
	console.log("emailAddr-=>",emailAddr.value);
	localStorage.setItem("playerName",emailAddr.value);
	
	playerName.value = emailAddr.value;
}

const initialData = () => {
	var playerName1 = localStorage.getItem('playerName')
	var walletCost1 = localStorage.getItem('walletCost')
	
	playerName.value = playerName1;
	var wa1 = localStorage.getItem('walletAddr')
	walletAddrs.value = wa1;
	
	if (walletCost1 === '' || walletCost1 === null){
		totalCost.value = '0';
	}else{
		totalCost.value = '' + walletCost1;
	}
	
}

onMounted(() => {

	initialData()
})
</script>
<template>
<div class="container">
	<div class="box1">
		<p class="line1" style="text-align: center; font-size: 33px; font-style: italic; color: red;">Login Page</p>
		<div v-if="playerName === '' || playerName === null">
			注册新账户,请输入一个有效的邮箱。<br>
			<span>&nbsp;&nbsp;&nbsp;</span>
			<input v-model="emailAddr" style="width: 70%;" />
			<span>&nbsp;&nbsp;&nbsp;</span>
			<button @click="loginBtn" style="font-size: 20px; color: red; background-color: yellow; padding: 10px; border-radius: 10px; margin: 5px;">注&nbsp;&nbsp;&nbsp;册</button>
		</div>
		<div v-else>
			<p class="line1">账户名称：{{ playerName }}</p>
			<p class="line1">
			钱包地址：<br>
			<textarea :value="walletAddrs" cols="50" rows="3" ></textarea>
			</p>
			<p class="line1">钱包余额：{{ totalCost }}</p>
		</div>
	</div>

</div>
</template>
<style scoped>
 .container {
	/*background-color: red;*/
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
 }
 
 .box1 {
	background-color: #d8f8ff;
	width: 500px;
	margin: auto;
	padding: 30px 30px;
	border-radius: 5px;
 }
 
 .box1 .line1 {
	margin: 10px;
	padding: 10px;
 }
</style>