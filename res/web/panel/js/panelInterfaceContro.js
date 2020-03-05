class InterfaceContro {
	constructor(parmars) {
		this.linkList = [];
		this.scriptList = [];
		this.title = "";
		this.interface = null;
	}
	initData(htmlNode){
		this.clear();
		var tempScriptSrcList = [];
		for (var i = 0; i < htmlNode.length; i++) {
			if(htmlNode[i].tagName){
				switch (htmlNode[i].tagName){
					case "TITLE":
						this.title = htmlNode[i].textContent;
						break;
					case "LINK":
						this.linkList.push(htmlNode[i]);
						break;
					case "SCRIPT":
						tempScriptSrcList.push(htmlNode[i].src);
						break;
					case "DIV":
						this.interface = htmlNode[i];
						break;
					default:
						break;
				}
			}
		}
		
		$('.interface')[0].appendChild(this.interface);
		for (var i = 0; i < this.linkList.length; i++) {
			$('head')[0].appendChild(this.linkList[i]);
		}
		var count = 0,scriptList = this.scriptList;
		function recursion(){
			if(count==tempScriptSrcList.length)
				return;
			scriptList.push(loadJs(tempScriptSrcList[count++],recursion));
		}
		recursion();
		$('#top-title')[0].innerText = this.title;
	}
	include(url){
		url = url.split('-');
		var href = "../";
		for (var i = 0; i < url.length; i++){
			href += url[i];
			if(i < url.length-1) href += '/';
		}
		var interfaceContro = this;
		new myAjax({
			url:href,
			success:function(result){interfaceContro.initData($(result));},
			failure:function(error){},
			always:function (jqXHR){}
		}).ajax();
	}
	clear(){
		this.title = "";
		if(this.interface) this.interface.remove();
		for (var i = 0; i < this.linkList.length; i++) {
			this.linkList[i].remove();
		}
		for (var i = 0; i < this.scriptList.length; i++) {
			this.scriptList[i].remove();
		}
		this.linkList.splice(0,this.linkList.length);
		this.scriptList.splice(0,this.scriptList.length);
	}
}