// 在 Worker 中，我们只能使用一些有限的全局方法和属性
onmessage = function(e) {
	console.log('Received message in worker:', e.data);
 
	// 做一些工作...
 
	// 发送消息回主线程
	postMessage('Hello back to main thread');
};