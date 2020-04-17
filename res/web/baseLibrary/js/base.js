function gotoUrl(url) {
	window.location.href = url;
}

function createEleAddClass(labelName, className) {
	var label = document.createElement(labelName);
	label.className = className;
	return label;
}

function loadJs(url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if (typeof(callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else {
			script.onload = function() {
				callback();
			}
		}
	}
	script.src = url;
	document.body.appendChild(script);
	return script;
}

function alertError(node,shakeName,message){
	node.classList.add("shake-constant");
	node.classList.add(shakeName);
	node.style.backgroundColor = "orangered";
	
	var zIndex = $('.iScrollHorizontalScrollbar').css('z-index');
	$('.iScrollHorizontalScrollbar').css('z-index',0);
	
	Notiflix.Report.Failure(
	'信息错误',
	message,
	'去修改',function(){
		setTimeout(function() {
			node.classList.remove(shakeName);
			node.style.backgroundColor = "";
			$('.iScrollHorizontalScrollbar').css('z-index',zIndex);
		}, 1000);
	});
}
function checkValue(fieldName,filed,checkNull,check,failedx){
	var content = this;
	this.checkValueX = filed.value;
	this.check = check;
	this.failed = function(errorType,errorMessage){
		content.errorTypeDict[errorType] = errorMessage;
		failedx(errorType,content.errorTypeDict);
	};
	this.errorTypeDict = {};
	if(checkNull&&filed.value===""){
		this.failed('0',fieldName+"不能为空");
		return false;
	}
	return this.check();
}