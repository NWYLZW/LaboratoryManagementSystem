class response {
	constructor(proName,left,right) {
		this.statux = 1;
		this.left = left || 640;
		this.right = right || 640;
		this.proName = proName || "baseLibrary";
	}
	start(){
		window.response = this;
		window.onresize = function(){
			if(this.response.changeStatu()){
				this.response.refresh();
			}
		}
		this.changeStatu();
		this.refresh();
	}
	changeStatu(){
		var offsetWid = document.documentElement.clientWidth;
		if(offsetWid <= this.left){
			if(this.statux == 1)
				return false;
			this.statux = 1;
			return true;
		}
		else if(offsetWid > this.left && offsetWid < this.right){
			if(this.statux == 2)
				return false;
			this.statux = 2;
			return true;
		}
		else{
			if(this.statux == 3)
				return false;
			this.statux = 3;
			return true;
		}
	}
	refresh(statux){
		this.statux = statux || this.statux;
		var linkArr = ["","0",(""+this.left),(""+this.right)];
		this.link(linkArr[this.statux]);
	}
	link(name){
		var linke_response = document.getElementById('link_response');
		linke_response.href = "../"+this.proName+"/css/main"+name+"px.css";
	}
}
// TODO 将link标签做成自动生成