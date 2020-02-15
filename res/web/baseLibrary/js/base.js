function gotoUrl(url){
	window.location.href = url;
}
function createEleAddClass(labelName,className){
	var label = document.createElement(labelName);
	label.className = className;
	return label;
}