import { createApp } from 'vue'
import * as Vue from "vue";
import { RouterLink, RouterView, createRouter, createWebHistory } from 'vue-router'
import * as VueRouter from 'vue-router'
import { loadModule } from "vue3-sfc-loader";
import * as ChainTest1 from './chainTest1.js'


function abc(){console.log("abc()")}

const options = {
	moduleCache: {
	  vue: Vue,
	  chainTest1: ChainTest1
	},
	async getFile(filepath) {
	    const res = await fetch(filepath);
		if ( !res.ok )
		  throw Object.assign(new Error(res.statusText + ' ' + filepath), { res });
		return {
		  getContentData: (asBinary) => asBinary ? res.arrayBuffer() : res.text(),
		}
	},
	addStyle(textContent) {
	
	  const style = Object.assign(document.createElement('style'), { textContent });
	  const ref = document.head.getElementsByTagName('style')[0] || null;
	  document.head.insertBefore(style, ref);
	},
	log(type, ...args) {
		console[type](...args);
	}
}

const router = createRouter({
	history: createWebHistory(''),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => loadModule('/pages/App1.vue',options)
		},
		{
			path: '/test1',
			name: 'test1',
			component: () => loadModule('/pages/Test1.vue',options)
		},
		{
			path: '/login',
			name: 'login',
			component: () => loadModule('/pages/Login.vue',options)
		}
	]
})


const app = createApp({})
app.use(router)
app.mount('#app')


/*

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
	
	
	// 在 Worker 中，我们只能使用一些有限的全局方法和属性
	onmessage = function(e) {
		console.log('Received message in worker:', e.data);
	 
		// 做一些工作...
	 
		// 发送消息回主线程
		postMessage('Hello back to main thread');
	};
	
	
	
*/