function generateButton(list) {
	var width = 0;
	var mid_side1 = document.getElementsByClassName('mid-side')[1];
	for (var i = 0; i < list.length; i++) {
		button = document.createElement('input');
		button.type = 'button';
		button.value = list[i]["title"];
		button.urlStr = list[i]["url"];
		button.onclick = function() {
			gotoUrl(this.urlStr);
		}
		mid_side1.appendChild(button);
		width += 100;
	}
	mid_side1.style.width = width + 'px';
	mid_side1.style.left = 'calc(50% - ' + width / 2 + 'px)';
}

var list = [{
	'title': '用户中心',
	'url': '/panel#user'
}, {
	'title': '用户中心',
	'url': '/user'
}, ]
generateButton(list);
