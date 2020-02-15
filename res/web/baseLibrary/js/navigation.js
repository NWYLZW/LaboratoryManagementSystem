function response(myScroll){
	var statux;
	var myScroll = myScroll.c;
	function changeStatu(){
		var offsetWid = document.documentElement.clientWidth;
		if(offsetWid <= 640){
			if(this.statux == 1)
				return false;
			this.statux = 1;
			return true;
		}
		else if(offsetWid > 640 && offsetWid < 1000){
			if(this.statux == 2)
				return false;
			this.statux = 2;
			return true;
		}else{
			if(this.statux == 3)
				return false;
			this.statux = 3;
			return true;
		}
	}
	function refresh(statux){
		this.statux = statux || this.statux;
		linkArr = ["","0","640","1000"];
		link(linkArr[this.statux]);
		setTimeout(function() {
			myScroll.refresh();
		}, 500);
	}
	
	window.onresize = function(){
		if(changeStatu())
			refresh();
	}
	changeStatu();
	refresh();
	
	var navigationEle = document.getElementById('navigation_ico');
	var offsetWid640 = true;
	var offsetWid640_1000 = true;
	var offsetWid1000 = true;
	navigationEle.onclick = function(){
		var offsetWid = document.documentElement.clientWidth;
		if(offsetWid <= 640){
			if(offsetWid640) refresh(3);
			else refresh(1);
			offsetWid640 = !offsetWid640;
		}
		else if(offsetWid > 640 && offsetWid < 1000){
			if(offsetWid640_1000) refresh(3);
			else refresh(2);
			offsetWid640_1000 = !offsetWid640_1000;
		}else{
			if(offsetWid1000) refresh(2);
			else refresh(3);
			offsetWid1000 = !offsetWid1000;
		}
	}
}
function link(name){
	var linke_response = document.getElementById('link_response');
	linke_response.href = "../baseLibrary/css/main"+name+"px.css";
}