// 浏览器本地数据库
console.log(indexedDB);// window.indexedDB
let addFile;//添加文件的方法
// 打开数据库
const request = indexedDB.open('myDatabase', 2);
 
request.onerror = function (event) {
  console.error('数据库打开报错');
}
 
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  console.log('数据库需要升级');
  // 创建一个对象存储空间
 
  db.createObjectStore('imgStore', { keyPath: 'id', autoIncrement: true });
  console.log('对象存储表创建成功');
}
 
request.onsuccess = function (event) {
  const db = event.target.result;
  console.log('数据库打开成功');
  // // 连接数据库的表，获取读写权限，默认只读
  // const transaction = db.transaction(['imgStore'], 'readwrite');
  // const objectStore = transaction.objectStore('imgStore');
  // // 添加数据
  // const re = objectStore.add({
  //   name: 'test',
  //   content:'测试数据'
  // });
  // re.onsuccess = function (event) {
  //   console.log('文件添加成功');
  // }
  // 读取数据
  // const re2 = objectStore.get(1);
  // re2.onsuccess = function (event) {
  //   console.log(re2.result);
  // }
 
  addFile = function (file) {
    // 连接数据库的表，获取读写权限，默认只读
    const transaction = db.transaction(['imgStore'], 'readwrite');
    const objectStore = transaction.objectStore('imgStore');
    const re = objectStore.add(file)
    re.onsuccess = function (event) {
      console.log('文件添加成功');
    }
  }
  let getFile = function(){
    // 连接数据库的表
    const transaction = db.transaction(['imgStore'], 'readonly');
    const objectStore = transaction.objectStore('imgStore');
    // 获取数据
    const re = objectStore.get(1);
    re.onsuccess = function (event) {
      console.log(re.result);
      let img = new Image();
      img.src = re.result.data;
      img.width=800;
      document.body.appendChild(img);
    }
  }
  getFile()
}
 
const file = document.getElementById('file');
file.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file.type == 'image/jpeg') { // 如果文件是图片
    let blob = new Blob([file], { type: 'image/jpeg' });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (event) {
      let base64 = event.target.result;
      console.log(base64);
      addFile({
        name: file.name,
        data: base64
      })
    }
  }
})
 