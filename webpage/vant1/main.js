/*

tmp1-=> {"id":10,"jjName":"医药ETF","js":1.2,"todayPrice":"0.6056","UpDownRate":"+0.61%"}

主类
主流程类

*/


(function() {
    console.log("main.js");

    var iDay = 30;
    var afterValue = 0.0;

    window.onload = function() {
        setTimeout(function() {
            //trace("game.load()");
            mainGame.load();
        }, 100);
    }

    var mainGame = {};

    mainGame.load = function() {
        console.log("mainGame.load");

        //console.log(gpList1)
/*		
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
		*/
    }

    mainGame.getStockPrice = function(e) {
        //console.log("getStockPrice,e-=>",e);
        var rnd1 = Math.random();
        afterValue = 0.0;
        //console.log("rnd1=>",rnd1);
        if (rnd1 > 0.5) {
            afterValue = parseFloat(e) + (e * (rnd1 / 10));
        } else {
            afterValue = parseFloat(e) - (e * (rnd1 / 10));
        }
        //console.log("afterValue-=>",afterValue);
        return afterValue;
    }
})();