(() =>{
	class response {
		constructor(proName,left,right,htmlName) {
			this.statux = 1;
			this.left = left || 640;
			this.right = right || 640;
			this.proName = proName || "baseLibrary";
			this.htmlName = htmlName || "main";
			this.linke_response = document.getElementById('link_response');
			if(this.linke_response==null){
				this.linke_response = document.createElement('link');
				this.linke_response.rel = "stylesheet";
				this.linke_response.type = "text/css";
				if(this.htmlName==="main")
					this.linke_response.href = "../"+this.proName+"/css/"+this.htmlName+".css";
				else
					this.linke_response.href = "../"+this.proName+"/css/"+this.htmlName+"/main.css";
				document.head.appendChild(this.linke_response);
			}
		}
		start(){
			var responsex = this;
			window.addEventListener('resize',function(){
				if(responsex.changeStatu()){
					responsex.refresh();
				}
			})
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
			if(this.endFunction)
				this.endFunction();
			return this;
		}
		setEndFunction(endFunction){
			this.endFunction = endFunction;
			return this;
		}
		link(name){
			if(this.htmlName==="main")
				this.linke_response.href = "../"+this.proName+"/css/"+this.htmlName+name+"px.css";
			else
				this.linke_response.href = "../"+this.proName+"/css/"+this.htmlName+"/main"+name+"px.css";
		}
	}
	window.response = response;
})();