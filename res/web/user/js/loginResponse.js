function loginResponse(){
	var statux;
	function changeStatux(){
		var offsetWid = document.documentElement.clientWidth;
		if(offsetWid <= 640){
			this.statux = 1;
		}
		else if(offsetWid > 640 && offsetWid < 1000){
			this.statux = 2;
		}else{
			this.statux = 3;
		}
	}
	function refresh(statux){
		this.statux = statux || this.statux;
		linkArr = ["","0","640","1000"];
		link(linkArr[this.statux]);
	}
	window.onresize = function(){
		changeStatux();
		refresh();
	}
	changeStatux();
	refresh();
}
function link(name){
	var linke_response = document.getElementById('link_response');
	linke_response.href = "../user/css/main"+name+"px.css";
}