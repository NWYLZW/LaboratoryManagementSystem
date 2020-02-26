class resultItem {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div class="resultItem"></div>');
		this.ele = this.jqEle[0];
		this.ele.appendChild($('<div class="userHeadPortrait"></div>')
		.css({
			backgroundImage: "url(../../baseLibrary/img/HeadPortrait/"+Math.round(Math.random()*9)+".jpg)",
		})[0]);
		
		this.userContent = $('<div class="userContent"></div>')[0];
		this.ele.appendChild(this.userContent);
		
		this.userName = $('<div class="userName"></div>')[0];
		this.userContent.appendChild(this.userName);
		this.userName.appendChild($('<div class="userName-left"></div>')
			.html(this.dictx.userName)[0]);
		this.userNameRight = $('<div class="userName-right"></div>')[0];
		this.userNameRight.appendChild($('<div class="nickName"></div>')
			.html(this.dictx.nickName)[0]);
		if(this.dictx.maleBool)
			this.userNameRight.appendChild($('<div class="sex"><i class="fa fa-male fa-1_5x"></i></div>')[0]);
		else
			this.userNameRight.appendChild($('<div class="sex"><i class="fa fa-female fa-1_5x"></i></div>')[0]);
		this.userName.appendChild(this.userNameRight);
		
		this.userData = $('<div class="userData"></div>')[0];
		this.userContent.appendChild(this.userData);
		this.userData.appendChild($('<div class="directionName"></div>')
			.html(this.dictx.directionName)[0]);
		this.userData.appendChild($('<div class="laboratoryName"></div>')
			.html(this.dictx.laboratoryName)[0]);
		this.userData.appendChild($('<div class="professionalClass"></div>')
			.html(this.dictx.professionalClass)[0]);
	}
}
class searchUserResultList {
	constructor() {
		this.resultItemList = [];
	}
	initData(dictxList){
		for (let i = 0; i < this.resultItemList.length; i++) {
			this.resultItemList[i].ele.remove();
		}
		this.resultItemList.splice(0, this.resultItemList.length);
		for (let i = 0; i < dictxList.length; i++) {
			this.resultItemList.push(new resultItem(dictxList[i]));
		}
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('.searchUser-result');
		this.ele = this.jqEle[0];
		for (var i = 0; i < this.resultItemList.length; i++) {
			this.ele.appendChild(this.resultItemList[i].ele);
		}
	}
}

var briefOptions = { 
	beforeSubmit: validate,     //提交前的回调函数
	success: jsonResponse,      //提交后的回调函数
	resetForm: true,            //成功提交后，重置所有表单元素的值
	timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求
};
function validate(formData, jqForm, options){
	return true;
}

var searchUserResultList0 = new searchUserResultList();
function jsonResponse(data){
	var JSONObject = JSON.parse(data);
	searchUserResultList0.initData(JSONObject);
}
new response("../user",500,1000,"searchBriefUser").start();
$("#searchUser").submit(function(){
	$(this).ajaxSubmit(briefOptions);
	return false;
});