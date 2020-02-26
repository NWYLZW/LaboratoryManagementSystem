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