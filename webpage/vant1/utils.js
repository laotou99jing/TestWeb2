/*
用于各种工具类的编写

编写十种用于游戏的ETF
1，酒类ETF，系数1.2
2，新能源汽车ETF，系数0.9
3，稀土ETF，系数1.1
4，食品ETF，系数1.0
5，游戏动漫ETF，系数1.3
6，房地产ETF，系数2.2
7，互联网ETF，系数1.2
8，军工ETF，系数1.2
9，半导体芯片ETF，系数1.2
10，医药ETF，系数1.2

JSON.stringify
JSON.parse
*/

(function() {
    var db1;
    var R = {};
    var curData = [];

    var iDay = 30;
    var afterValue = 0.0;

    /*
    	id: 	 编号
    	jjName： 基金名称
    	js：	 基数
    */
    R.sources = [
        { id: 1, jjName: '酒类ETF', js: 1.2,code: '500332' },
        { id: 2, jjName: '新能源汽车ETF', js: 1.2,code: '456345' },
        { id: 3, jjName: '稀土ETF', js: 1.2,code: '112233678' },
        { id: 4, jjName: '食品ETF', js: 1.2,code: '346123' },
        { id: 5, jjName: '游戏动漫ETF', js: 1.2,code: '100987' },
        { id: 6, jjName: '房地产ETF', js: 1.2,code: '500897' },
        { id: 7, jjName: '互联网ETF', js: 1.2,code: '500361' },
        { id: 8, jjName: '军工ETF', js: 1.2,code: '500643' },
        { id: 9, jjName: '半导体芯片ETF', js: 1.2,code: '500811' },
        { id: 10, jjName: '医药ETF', js: 1.2,code: '500259' },

    ]
	
	R.days = [
		{id: 1, riqi:' 1月1日 ',remark:'remark1'},
		{id: 2, riqi:' 1月2日 ',remark:'remark1'},
		{id: 3, riqi:' 1月3日 ',remark:'remark1'},
		{id: 4, riqi:' 1月4日 ',remark:'remark1'},
		{id: 5, riqi:' 1月5日 ',remark:'remark1'},
		{id: 6, riqi:' 1月6日 ',remark:'remark1'},
		{id: 7, riqi:' 1月7日 ',remark:'remark1'},
		{id: 8, riqi:' 1月8日 ',remark:'remark1'},
		{id: 9, riqi:' 1月9日 ',remark:'remark1'},
		{id: 10, riqi:' 1月10日 ',remark:'remark1'},
		{id: 11, riqi:' 1月11日 ',remark:'remark1'},
		{id: 12, riqi:' 1月12日 ',remark:'remark1'},
		{id: 13, riqi:' 1月13日 ',remark:'remark1'},
		{id: 14, riqi:' 1月14日 ',remark:'remark1'},
		{id: 15, riqi:' 1月15日 ',remark:'remark1'},
		{id: 16, riqi:' 1月16日 ',remark:'remark1'},
		{id: 17, riqi:' 1月17日 ',remark:'remark1'},
		{id: 18, riqi:' 1月18日 ',remark:'remark1'},
		{id: 19, riqi:' 1月19日 ',remark:'remark1'},
		{id: 20, riqi:' 1月20日 ',remark:'remark1'},
		{id: 21, riqi:' 1月21日 ',remark:'remark1'},
		{id: 22, riqi:' 1月22日 ',remark:'remark1'},
		{id: 23, riqi:' 1月23日 ',remark:'remark1'},
		{id: 24, riqi:' 1月24日 ',remark:'remark1'},
		{id: 25, riqi:' 1月25日 ',remark:'remark1'},
		{id: 26, riqi:' 1月26日 ',remark:'remark1'},
		{id: 27, riqi:' 1月27日 ',remark:'remark1'},
		{id: 28, riqi:' 1月28日 ',remark:'remark1'},
		{id: 29, riqi:' 1月29日 ',remark:'remark1'},
		{id: 30, riqi:' 1月30日 ',remark:'remark1'},
		{id: 31, riqi:' 1月31日 ',remark:'remark1'},
		{id: 32, riqi:' 2月1日 ',remark:'remark1'},
		{id: 33, riqi:' 2月2日 ',remark:'remark1'},
		{id: 34, riqi:' 2月3日 ',remark:'remark1'},
		{id: 35, riqi:' 2月4日 ',remark:'remark1'},
		{id: 36, riqi:' 2月5日 ',remark:'remark1'},
		{id: 37, riqi:' 2月6日 ',remark:'remark1'},
		{id: 38, riqi:' 2月7日 ',remark:'remark1'},
		{id: 39, riqi:' 2月8日 ',remark:'remark1'},
		{id: 40, riqi:' 2月9日 ',remark:'remark1'},
		{id: 41, riqi:' 2月10日 ',remark:'remark1'},
		{id: 42, riqi:' 2月11日 ',remark:'remark1'},
		{id: 43, riqi:' 2月12日 ',remark:'remark1'},
		{id: 44, riqi:' 2月13日 ',remark:'remark1'},
		{id: 45, riqi:' 2月14日 ',remark:'remark1'},
		{id: 46, riqi:' 2月15日 ',remark:'remark1'},
		{id: 47, riqi:' 2月16日 ',remark:'remark1'},
		{id: 48, riqi:' 2月17日 ',remark:'remark1'},
		{id: 49, riqi:' 2月18日 ',remark:'remark1'},
		{id: 50, riqi:' 2月19日 ',remark:'remark1'},
		{id: 51, riqi:' 2月20日 ',remark:'remark1'},
		{id: 52, riqi:' 2月21日 ',remark:'remark1'},
		{id: 53, riqi:' 2月22日 ',remark:'remark1'},
		{id: 54, riqi:' 2月23日 ',remark:'remark1'},
		{id: 55, riqi:' 2月24日 ',remark:'remark1'},
		{id: 56, riqi:' 2月25日 ',remark:'remark1'},
		{id: 57, riqi:' 2月26日 ',remark:'remark1'},
		{id: 58, riqi:' 2月27日 ',remark:'remark1'},
		{id: 59, riqi:' 2月28日 ',remark:'remark1'},
		{id: 60, riqi:' 2月29日 ',remark:'remark1'},
		{id: 61, riqi:' 3月1日 ',remark:'remark1'},
		{id: 62, riqi:' 3月2日 ',remark:'remark1'},
		{id: 63, riqi:' 3月3日 ',remark:'remark1'},
		{id: 64, riqi:' 3月4日 ',remark:'remark1'},
		{id: 65, riqi:' 3月5日 ',remark:'remark1'},
		{id: 66, riqi:' 3月6日 ',remark:'remark1'},
		{id: 67, riqi:' 3月7日 ',remark:'remark1'},
		{id: 68, riqi:' 3月8日 ',remark:'remark1'},
		{id: 69, riqi:' 3月9日 ',remark:'remark1'},
		{id: 70, riqi:' 3月10日 ',remark:'remark1'},
		{id: 71, riqi:' 3月11日 ',remark:'remark1'},
		{id: 72, riqi:' 3月12日 ',remark:'remark1'},
		{id: 73, riqi:' 3月13日 ',remark:'remark1'},
		{id: 74, riqi:' 3月14日 ',remark:'remark1'},
		{id: 75, riqi:' 3月15日 ',remark:'remark1'},
		{id: 76, riqi:' 3月16日 ',remark:'remark1'},
		{id: 77, riqi:' 3月17日 ',remark:'remark1'},
		{id: 78, riqi:' 3月18日 ',remark:'remark1'},
		{id: 79, riqi:' 3月19日 ',remark:'remark1'},
		{id: 80, riqi:' 3月20日 ',remark:'remark1'},
		{id: 81, riqi:' 3月21日 ',remark:'remark1'},
		{id: 82, riqi:' 3月22日 ',remark:'remark1'},
		{id: 83, riqi:' 3月23日 ',remark:'remark1'},
		{id: 84, riqi:' 3月24日 ',remark:'remark1'},
		{id: 85, riqi:' 3月25日 ',remark:'remark1'},
		{id: 86, riqi:' 3月26日 ',remark:'remark1'},
		{id: 87, riqi:' 3月27日 ',remark:'remark1'},
		{id: 88, riqi:' 3月28日 ',remark:'remark1'},
		{id: 89, riqi:' 3月29日 ',remark:'remark1'},
		{id: 90, riqi:' 3月30日 ',remark:'remark1'},
		{id: 91, riqi:' 3月31日 ',remark:'remark1'},
		{id: 92, riqi:' 4月1日 ',remark:'remark1'},
		{id: 93, riqi:' 4月2日 ',remark:'remark1'},
		{id: 94, riqi:' 4月3日 ',remark:'remark1'},
		{id: 95, riqi:' 4月4日 ',remark:'remark1'},
		{id: 96, riqi:' 4月5日 ',remark:'remark1'},
		{id: 97, riqi:' 4月6日 ',remark:'remark1'},
		{id: 98, riqi:' 4月7日 ',remark:'remark1'},
		{id: 99, riqi:' 4月8日 ',remark:'remark1'},
		{id: 100, riqi:' 4月9日 ',remark:'remark1'},
		{id: 101, riqi:' 4月10日 ',remark:'remark1'},
		{id: 102, riqi:' 4月11日 ',remark:'remark1'},
		{id: 103, riqi:' 4月12日 ',remark:'remark1'},
		{id: 104, riqi:' 4月13日 ',remark:'remark1'},
		{id: 105, riqi:' 4月14日 ',remark:'remark1'},
		{id: 106, riqi:' 4月15日 ',remark:'remark1'},
		{id: 107, riqi:' 4月16日 ',remark:'remark1'},
		{id: 108, riqi:' 4月17日 ',remark:'remark1'},
		{id: 109, riqi:' 4月18日 ',remark:'remark1'},
		{id: 110, riqi:' 4月19日 ',remark:'remark1'},
		{id: 111, riqi:' 4月20日 ',remark:'remark1'},
		{id: 112, riqi:' 4月21日 ',remark:'remark1'},
		{id: 113, riqi:' 4月22日 ',remark:'remark1'},
		{id: 114, riqi:' 4月23日 ',remark:'remark1'},
		{id: 115, riqi:' 4月24日 ',remark:'remark1'},
		{id: 116, riqi:' 4月25日 ',remark:'remark1'},
		{id: 117, riqi:' 4月26日 ',remark:'remark1'},
		{id: 118, riqi:' 4月27日 ',remark:'remark1'},
		{id: 119, riqi:' 4月28日 ',remark:'remark1'},
		{id: 120, riqi:' 4月29日 ',remark:'remark1'},
		{id: 121, riqi:' 4月30日 ',remark:'remark1'},
		{id: 122, riqi:' 5月1日 ',remark:'remark1'},
		{id: 123, riqi:' 5月2日 ',remark:'remark1'},
		{id: 124, riqi:' 5月3日 ',remark:'remark1'},
		{id: 125, riqi:' 5月4日 ',remark:'remark1'},
		{id: 126, riqi:' 5月5日 ',remark:'remark1'},
		{id: 127, riqi:' 5月6日 ',remark:'remark1'},
		{id: 128, riqi:' 5月7日 ',remark:'remark1'},
		{id: 129, riqi:' 5月8日 ',remark:'remark1'},
		{id: 130, riqi:' 5月9日 ',remark:'remark1'},
		{id: 131, riqi:' 5月10日 ',remark:'remark1'},
		{id: 132, riqi:' 5月11日 ',remark:'remark1'},
		{id: 133, riqi:' 5月12日 ',remark:'remark1'},
		{id: 134, riqi:' 5月13日 ',remark:'remark1'},
		{id: 135, riqi:' 5月14日 ',remark:'remark1'},
		{id: 136, riqi:' 5月15日 ',remark:'remark1'},
		{id: 137, riqi:' 5月16日 ',remark:'remark1'},
		{id: 138, riqi:' 5月17日 ',remark:'remark1'},
		{id: 139, riqi:' 5月18日 ',remark:'remark1'},
		{id: 140, riqi:' 5月19日 ',remark:'remark1'},
		{id: 141, riqi:' 5月20日 ',remark:'remark1'},
		{id: 142, riqi:' 5月21日 ',remark:'remark1'},
		{id: 143, riqi:' 5月22日 ',remark:'remark1'},
		{id: 144, riqi:' 5月23日 ',remark:'remark1'},
		{id: 145, riqi:' 5月24日 ',remark:'remark1'},
		{id: 146, riqi:' 5月25日 ',remark:'remark1'},
		{id: 147, riqi:' 5月26日 ',remark:'remark1'},
		{id: 148, riqi:' 5月27日 ',remark:'remark1'},
		{id: 149, riqi:' 5月28日 ',remark:'remark1'},
		{id: 150, riqi:' 5月29日 ',remark:'remark1'},
		{id: 151, riqi:' 5月30日 ',remark:'remark1'},
		{id: 152, riqi:' 5月31日 ',remark:'remark1'},
		{id: 153, riqi:' 6月1日 ',remark:'remark1'},
		{id: 154, riqi:' 6月2日 ',remark:'remark1'},
		{id: 155, riqi:' 6月3日 ',remark:'remark1'},
		{id: 156, riqi:' 6月4日 ',remark:'remark1'},
		{id: 157, riqi:' 6月5日 ',remark:'remark1'},
		{id: 158, riqi:' 6月6日 ',remark:'remark1'},
		{id: 159, riqi:' 6月7日 ',remark:'remark1'},
		{id: 160, riqi:' 6月8日 ',remark:'remark1'},
		{id: 161, riqi:' 6月9日 ',remark:'remark1'},
		{id: 162, riqi:' 6月10日 ',remark:'remark1'},
		{id: 163, riqi:' 6月11日 ',remark:'remark1'},
		{id: 164, riqi:' 6月12日 ',remark:'remark1'},
		{id: 165, riqi:' 6月13日 ',remark:'remark1'},
		{id: 166, riqi:' 6月14日 ',remark:'remark1'},
		{id: 167, riqi:' 6月15日 ',remark:'remark1'},
		{id: 168, riqi:' 6月16日 ',remark:'remark1'},
		{id: 169, riqi:' 6月17日 ',remark:'remark1'},
		{id: 170, riqi:' 6月18日 ',remark:'remark1'},
		{id: 171, riqi:' 6月19日 ',remark:'remark1'},
		{id: 172, riqi:' 6月20日 ',remark:'remark1'},
		{id: 173, riqi:' 6月21日 ',remark:'remark1'},
		{id: 174, riqi:' 6月22日 ',remark:'remark1'},
		{id: 175, riqi:' 6月23日 ',remark:'remark1'},
		{id: 176, riqi:' 6月24日 ',remark:'remark1'},
		{id: 177, riqi:' 6月25日 ',remark:'remark1'},
		{id: 178, riqi:' 6月26日 ',remark:'remark1'},
		{id: 179, riqi:' 6月27日 ',remark:'remark1'},
		{id: 180, riqi:' 6月28日 ',remark:'remark1'},
		{id: 181, riqi:' 6月29日 ',remark:'remark1'},
		{id: 182, riqi:' 6月30日 ',remark:'remark1'},
		{id: 183, riqi:' 7月1日 ',remark:'remark1'}	
	]
	

    this.Utils = function() {
        db1 = new PouchDB('my_database');

        this.init();
    }

    Utils.prototype.init = function() {
        console.log("Utils init-工具组件初始化");

        //this.initData();
    }

    //初始化基金-废（不需要随机数据）
    Utils.prototype.initData = function() {
        console.log("initData-初始化基金");
		//debugger;
        //console.log("R.sources",R.sources);
        //localStorage.setItem("myTime",Data.now());
        var initFlage = localStorage.getItem("initFlage");
        console.log("initFlage-=>", initFlage);

        if (initFlage == -1) {
            console.log("initFlage is null");
			/**/
            for (let item1 of R.sources) {
                //console.log("item1-=>", item1);
                var tmp1a = Math.random();
                item1['todayPrice'] = '' + tmp1a.toFixed(4);
                var tmpZDL = '';
                if (tmp1a > 0.5) {
                    tmpZDL = "+" + tmp1a.toFixed(2) + '%';
                } else {
                    tmpZDL = "-" + tmp1a.toFixed(2) + '%';
                }

                item1['UpDownRate'] = tmpZDL;
                curData.push(item1);
            }
			//debugger;
            localStorage.setItem("curData", JSON.stringify(curData));
            localStorage.setItem("initFlage", 1);
			
            localStorage.setItem("totalCost", 100000);
            localStorage.setItem("lastCost", 100000);
			console.log("清空已买字典");
			localStorage.setItem('buyDic1',"")
			localStorage.setItem('buyHisList',"")
        } else {
            localStorage.setItem("initFlage", 1);
            var tmpData1 = localStorage.getItem("curData");

            curData = JSON.parse(tmpData1);

        }

        var tmp1a = Math.random();
        var tmp1b = Math.random();
        tmp1a = tmp1a.toFixed(4);
        console.log(tmp1a);

        tmp1b = Math.floor(tmp1b * 10000) / 10000;
        console.log(tmp1b);

        //console.log("curData-=>",curData);
        console.log("curData-=>", JSON.stringify(curData));

        //this.Rd = curData;
        gpList1 = curData;
    }

    //初始化基金2
    Utils.prototype.initData1 = function() {
		console.log("initData1-初始化基金");
		
		//初始化前30天的基金净值
            for (let item1 of R.sources) {
                console.log("item1-=>", item1);
                var tmp1a = Math.random();
                item1['todayPrice'] = '' + tmp1a.toFixed(4);
                var tmpZDL = '';
                if (tmp1a > 0.5) {
                    tmpZDL = "+" + tmp1a.toFixed(2) + '%';
                } else {
                    tmpZDL = "-" + tmp1a.toFixed(2) + '%';
                }

                item1['UpDownRate'] = tmpZDL;
                curData.push(item1);
            }
            localStorage.setItem("curData", JSON.stringify(curData));
			gpList1 = curData;
			
			 for (let tmp1 of gpList1) {
            //			console.log("tmp1-=>",JSON.stringify(tmp1));
            var curPrice = tmp1.todayPrice
            var firstPrices = [];
            for (i1 = 0; i1 <= iDay; i1++) {
                //				console.log("i1-=>",tmp1.jjName+':'+i1);
                //debugger;
                //console.log("curPrice-=>",curPrice);
                var price = this.getStockPrice(curPrice);
                //console.log("price-=>",price);
                curPrice = price;
                firstPrices.push(price);
            }
            //console.log("tmp1.jjName-=>", tmp1.jjName);
            //console.log("firstPrices-=>", JSON.stringify(firstPrices));
            localStorage.setItem(tmp1.jjName, firstPrices);
        }
			
		
		//初始化玩家金额
		localStorage.setItem("initFlage", 1);
		
		localStorage.setItem("totalCost", 100000);
		localStorage.setItem("lastCost", 100000);
		
		//初始化游戏开始标志initFlage 1正常开始，游戏进行中 -1结束 0完成游戏
		localStorage.setItem("initFlage", 1); 
		console.log("清空已买字典");
		localStorage.setItem('buyDic1',"")
		localStorage.setItem('buyHisList',"")
	
		return 'ok';
	}

    //获取所有基金数据
    Utils.prototype.getJJData = function() {
        console.log("getJJData-获取基金价格");

        let tmp1 = [];
        let tmp1b = {};
        let tmp2c = {};
		/**/
		for (let item1 of R.sources) {
			console.log("item1-=>", item1.jjName);
			var tmpData1 = localStorage.getItem(item1.jjName);
			//console.log("tmpData1-=>",tmpData1);
			let arrb1 = tmpData1.split(',');
			//var tmp2a = tmpData1.split(',').pop();
			console.log("getJJData arrb1-=>",arrb1);
			var tmp2a = arrb1.pop();
			var tmp3a = arrb1.pop();
			
			var tmp4a = (parseFloat(tmp2a) / parseFloat(tmp3a)) - 1;
			tmp4a = tmp4a * 100;
			let tmp5a = parseFloat(tmp4a).toFixed(2)+'%';
			
			console.log("tmp2a-=>",tmp2a);
			console.log("tmp5a-=>",tmp5a);
			var obj3c = {
				name: item1.jjName,
				value: tmp2a,
				UpDownRate: tmp5a
			};
			tmp1b[item1.jjName] = tmp2a;
			tmp2c[item1.jjName] = tmp5a
			tmp1.push(obj3c);
		}
		console.log("getJJData tmp1-=>",tmp1);
		console.log("tmp1b-=>", JSON.stringify(tmp1b));
		console.log("tmp2c-=>", JSON.stringify(tmp2c));
		console.log("1，curData-=>",curData);
		var curData2 = [];
		var curData3 = [];// 空数组
		var bool1 = false;
		if(curData.length==0){
			curData = localStorage.getItem("curData");
			curData3 = JSON.parse(curData);
			bool1 = true;
		}
		console.log("2，curData3-=>",curData3);
		if(Array.isArray(curData)){}else{
			curData = JSON.parse(curData);
		}
		for(let item2 of curData){
			var tmp21c = tmp1b[item2.jjName];
			var tmp21d = tmp2c[item2.jjName];
			
			item2.todayPrice = parseFloat(tmp21c).toFixed(4);
			item2.UpDownRate = tmp21d;
			//
			curData2.push(item2);
		}
		console.log("bool1-=>",bool1);
		if(bool1){
			tmp1 = curData3;
		}else{
			tmp1 = curData; 
		}
		console.log("getJJData tmp1-=>",tmp1);
        return tmp1;
    }
	
	//获取当前的基金价格
	Utils.prototype.getTodayJJData = function(){
		console.log("getTodayJJData-获取当天的基金价格");
		var tmp1 = [];
		for (let item1 of R.sources) {
			console.log("item1-=>", item1);
			var tmpData1 = localStorage.getItem(item1.jjName);
			var arr1 = tmpData1.split(',');
			var tmp2a = arr1.pop();
			var tmp3a = arr1.pop();
			
			item1['todayPrice'] = '' +  parseFloat(tmp2a).toFixed(4);
			
			var tmp4a = (parseFloat(tmp2a) / parseFloat(tmp3a)) - 1;
			tmp4a = tmp4a * 100;
			item1['UpDownRate'] = parseFloat(tmp4a).toFixed(2)+'%';
			
			curData.push(item1);
		}
		tmp1 = curData;
		return tmp1;
	}
	
	Utils.prototype.getUpAndDownValue = function(){
		console.log("getUpAndDownValue");
		var zd1 = '';
		//R.sources
		var val1 = 0.0;
		for(let item1 of R.sources){
			var tmpData1 = localStorage.getItem(item1.jjName);
			var tmp2a = tmpData1.split(',').pop();
			//console.log("tmp2-=>",tmp2a);
			var val2 = parseFloat(tmp2a).toFixed(4);
			//console.log("val2-=>",val2);
			val1 = parseFloat(val1) + parseFloat(val2);
			//console.log("val1-=>",val1);
		}
		var val1 = parseFloat(val1).toFixed(4);
		//console.log("val1-=>",val1);
		var val3 = 0.0;
		for(let item2 of R.sources){
			var tmpData2 = localStorage.getItem(item2.jjName);
			var tmp2b= tmpData2.split(',');
			tmp2b.pop();
			var tmp3c = tmp2b.pop();
			//console.log("tmp3c-=>",tmp3c);
			var val4 = parseFloat(tmp3c).toFixed(4);
			val3 = parseFloat(val3) + parseFloat(val4);
		}	
		var val3 = parseFloat(val3).toFixed(4);
		//console.log("val3-=>",val3);
		
		if(val1 >= val3) {
			zd1 = '涨';
		}else{
			zd1 = '跌';
		}
		return zd1;
	}
	
	Utils.prototype.getCurDays = function(){
		console.log("getCurDays");		
		var days = localStorage.getItem("today");		
		days = days - 1;			
		var tmp1 = R.days[days];
		
		if(tmp1 === undefined){
			return '';
		}
		
		console.log("tmp1-=>",tmp1);
		return tmp1.riqi;
	}
	
	Utils.prototype.getUpAndDwonNum = function(){
		console.log("getUpAndDwonNum");
		
		var arr1s = [];
		
		var upNum1 = 0;
		var downNum1 = 0;
		
		for(let item1 of R.sources){
			var tmpData1 = localStorage.getItem(item1.jjName);
			var tmp1a = tmpData1.split(',');
			
			var ve1 = tmp1a.pop();
			var ve2 = tmp1a.pop();
			console.log("ve1-=>",ve1);
			console.log("ve2-=>",ve2);
			if(ve1>=ve2){
				upNum1 += 1;
			}else{
				downNum1 +=1;
			}
		}
		
		console.log("upNum1-=>",upNum1);
		arr1s.push(upNum1);
		console.log("downNum1-=>",downNum1);
		arr1s.push(downNum1);
		
		return arr1s;
	}
	
	Utils.prototype.getTodayUpDownAmount = function(){
		console.log("getTodayUpDownAmount");
		
		var totalCost = localStorage.getItem("totalCost");		
		var lastCost = localStorage.getItem("lastCost");		
		
		var rate1 = (totalCost/lastCost) -1
		
		return rate1;
	}
	
	Utils.prototype.getTotalDash = function(){//获得今日的总金额
		console.log("getTotalDash");
		/*
		今日的总金额，包含剩余可用金额，加上已有基金份额再乘以现金额的总金额
		*/
		var totalCost = localStorage.getItem("totalCost");		
		
		
		
		
		return totalCost;
	}
	
	Utils.prototype.updateNextDayValue = function(){//获取下一天的基金数值
		console.log("updateNextDayValue");
		
		console.log("this.getStockPrice(1.1)-=>",this.getStockPrice(1.1));
		
		let tmpJJ1 = [];
		
		for(let item1 of R.sources){
			var tmpData1 = localStorage.getItem(item1.jjName);
			var tmp1a = tmpData1.split(',');
			
			var val1 = tmp1a.pop();
			console.log("val1-=>",val1);
			var val2 = this.getStockPrice(val1);
			
			let udr1 = (parseFloat(val2) / parseFloat(val1)) - 1; 
			udr1 = udr1 * 100;
			let udr2 = parseFloat(udr1).toFixed(2)+'%';
			console.log("udr2-=>",udr2);
			console.log("val2-=>",val2);
			console.log(tmp1a.push(val1));
			console.log(tmp1a.push(val2));
			console.log("tmp1a-=>",tmp1a);
			localStorage.setItem(item1.jjName, tmp1a);
			let obj1 = {
				name: item1.jjName,
				value: val2,
				UpDownRate: udr2
			}
			tmpJJ1.push(obj1);
		}
		
		//刷新 curData
		console.log("tmpJJ1-=>",tmpJJ1);
		let tmpData2 = localStorage.getItem('curData')
		console.log("tmpData2-=>",tmpData2);
		if (tmpData2 == null || tmpData2 == undefined || tmpData2 == '') {
			
		}else{
			let arr1 = JSON.parse(tmpData2)
			let arr2 = []
			for(let item1a of arr1){
				console.log("1,item1a-=>",item1a);
				for(let item2a of tmpJJ1){
					if( item2a.name == item1a.jjName ){
						temp9a = item2a.value;
						temp10a = item2a.UpDownRate;
						 let temp9b = parseFloat(temp9a).toFixed(4);
						item1a.todayPrice = ''+temp9b
						item1a.UpDownRate = ''+temp10a
						break;
					}
				}
				console.log("2,item1a-=>",item1a);
				arr2.push(item1a);
			}
			let strB1 = JSON.stringify(arr2);
			 console.log("strB1-=>",strB1);
			 localStorage.setItem('curData',strB1)
		}
		
		//前进一天
		var days = localStorage.getItem("today");		
		var days1 = parseInt(days) + 1;	
		localStorage.setItem("today",days1);	
		return 'ok';
	}
	
	Utils.prototype.getStockPrice = function(e){
		console.log("getStockPrice");
		
		var rnd1 = Math.random();
        var afterValue1 = 0.0;
        //console.log("rnd1=>",rnd1);
        if (rnd1 > 0.5) {
            afterValue1 = parseFloat(e) + (e * (rnd1 / 10));
        } else {
            afterValue1 = parseFloat(e) - (e * (rnd1 / 10));
        }
        //console.log("afterValue1-=>",afterValue1);
        return afterValue1;
	}
	
	Utils.prototype.getAllJJList = function(){
		console.log("getAllJJList");
		var arr1 = [];		
		var obja1 = {}
		//buyDic1:"{"酒类ETF":6652,"食品ETF":3542,"稀土ETF":5551}"
		let buyDic1 = localStorage.getItem('buyDic1')
		if(buyDic1 == null || buyDic1 == undefined || buyDic1 == ''){
			
		}else{
			obja1 = JSON.parse(buyDic1);
		}
		
		for (let item1 of R.sources) {
			console.log("item1-=>", item1);
			var tmpData1 = localStorage.getItem(item1.jjName);
			var arr1s = tmpData1.split(',');
			var tmp1a = arr1s.pop();
			var tmp1b = arr1s.pop();
			var tmp2a = arr1s.shift();
			
			var tmp3a = ((parseFloat(tmp1a) / parseFloat(tmp1b)) -1)*100;
			
			item1['curValue'] = parseFloat(tmp1a).toFixed(4);
			item1['todayUDRate']= ''+parseFloat(tmp3a).toFixed(4)+'%';
			item1['todayUDValue']='0';
			item1['totalUDValue']='0';
			if (obja1[''+item1.jjName]) {
				item1['isHad']='是';
			} else {
				item1['isHad']='否';
			} 
			
			arr1.push(item1);
		}
		console.log("arr1-=>",arr1);
		return arr1;
	}
	
	Utils.prototype.getJJCode = function(e){
		console.log("getJJCode-=>",e);
		var str1 = '';
		
		for (let item1 of R.sources) {
			if(item1.jjName == e){
				str1 = item1.code;
				break;
			}
		}
		return str1;
	}
/*
[{"id":1,"jjName":"酒类ETF","js":1.2,"todayPrice":"0.9262","UpDownRate":"+0.93%"},{"id":2,"jjName":"新能源汽车ETF","js":1.2,"todayPrice":"0.2622","UpDownRate":"-0.26%"},{"id":3,"jjName":"稀土ETF","js":1.2,"todayPrice":"0.1196","UpDownRate":"-0.12%"},{"id":4,"jjName":"食品ETF","js":1.2,"todayPrice":"0.0545","UpDownRate":"-0.05%"},{"id":5,"jjName":"游戏动漫ETF","js":1.2,"todayPrice":"0.4379","UpDownRate":"-0.44%"},{"id":6,"jjName":"房地产ETF","js":1.2,"todayPrice":"0.4106","UpDownRate":"-0.41%"},{"id":7,"jjName":"互联网ETF","js":1.2,"todayPrice":"0.0523","UpDownRate":"-0.05%"},{"id":8,"jjName":"军工ETF","js":1.2,"todayPrice":"0.7187","UpDownRate":"+0.72%"},{"id":9,"jjName":"半导体芯片ETF","js":1.2,"todayPrice":"0.2596","UpDownRate":"-0.26%"},{"id":10,"jjName":"医药ETF","js":1.2,"todayPrice":"0.3815","UpDownRate":"-0.38%"}]
*/
})();