function judgeHaveLink(linkNode){
	var linkList = $('link');
	for (var i = 0; i < linkList.length; i++) {
		if(linkNode.href == linkList[i].href)
			return true;
	}
	return false;
}
function judgeHaveScript(scriptSrc){
	var scriptList = $('script');
	for (var i = 0; i < scriptList.length; i++) {
		if(scriptSrc == scriptList[i].src)
			return true;
	}
	return false;
}

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
						tempScriptSrcList.push(htmlNode[i]);
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
		$('#top-title')[0].innerText = this.title;
		for (var i = 0; i < this.linkList.length; i++) {
			if(!judgeHaveLink(this.linkList[i]))
				$('head')[0].appendChild(this.linkList[i]);
		}
		var count = 0,scriptList = this.scriptList;
		function recursion(){
			if(count==tempScriptSrcList.length){
				console.clear();
				return;
			}
			for (var i = count; i < tempScriptSrcList.length; count++) {
				if(!judgeHaveScript(tempScriptSrcList[count].src))
					break;
			}
			scriptList.push(loadJs(tempScriptSrcList[count++].src,recursion));
		}
		recursion();
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