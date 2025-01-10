/*


*/


function Main(){
	
	this.init();
	//init();
}
/**/
Main.prototype.init=function(){
	console.log("Main init()");
	
};
(function(){
	console.log("test.js");
	
	this.Abc = function(props)
	{
		this.init();
	};
	
	Abc.prototype.init = function(){
		console.log("Abc init()");
		
	};
	
	var abc1 = new Abc(); 
	abc1.init();
})();

