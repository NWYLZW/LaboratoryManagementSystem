var options = { 
	beforeSubmit: validate,
	success: jsonResponse,
	timeout: 3000
};
function alertError(node,shakeName,message){
	node.classList.add("shake-constant");
	node.classList.add(shakeName);
	node.style.backgroundColor = "orangered";
	Notiflix.Report.Failure(
	'信息错误',
	message,
	'去修改',function(){
		setTimeout(function() {
			node.classList.remove(shakeName);
			node.style.backgroundColor = "";
		}, 1000);
	});
}

function validate(formData, jqForm, options){
	var form = jqForm[0];
	try{
	}catch(e){
	}
	return true;
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
function jsonResponse(data){
	var JSONObject = JSON.parse(data);
	switch (JSONObject.type){
	case 0:
		alertError($('.main')[0],"shake",JSONObject.message);
		break;
	case -1001:
		Notiflix.Loading.Remove();
		Notiflix.Report.Success(
		'注册成功',
		message,
		'Login',
		function(){
			gotoUrl('./login');
		});
		break;
	case 1003:
	// TODO 用户名已存在问题
		alertError($('.main')[0],"shake",JSONObject.content);
		break;
	default:
		alert("发生未知错误");
		break;
	}
}
