var options = { 
	beforeSubmit: validate,     //提交前的回调函数
	success: jsonResponse,      //提交后的回调函数
	//url: url,                 //默认是form的action， 如果申明，则会覆盖
	//type: type,               //默认是form的method（get or post），如果申明，则会覆盖
	//dataType: null,           //html(默认), xml, script, json...接受服务端返回的类型
	//clearForm: true,          //成功提交后，清除所有表单元素的值
	//resetForm: true,          //成功提交后，重置所有表单元素的值
	timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求
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
	//jqForm:   jQuery对象，封装了表单的元素
	var form = jqForm[0];              //将jqForm转换为DOM对象
	try{
		if(!checkValue(form.userName,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0':
					alertError(form.userName,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		// 检测passWord的值
		if(!checkValue(form.password,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0':
					alertError(form.password,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
	}catch(e){
		console.log(e);
		return false;
	}
	return true;
}
function checkValue(filed,checkNull,check,failedx){
	this.checkValueX = filed.value;
	this.check = check;
	this.failed = function(errorType,errorMessage){
		this.errorTypeDict[errorType] = errorMessage;
		failedx(errorType);
	};
	this.errorTypeDict = {};
	if(checkNull&&filed.value===""){
		this.failed('0',"值不能为空");
		return false;
	}
	return this.check();
}
function jsonResponse(data){
	var JSONObject = JSON.parse(data);
	Notiflix.Loading.Remove();
	switch (JSONObject.type){
	case 0:
		// "表单数据错误"
		alertError($('.form')[0],"shake",JSONObject.message);
		break;
	case -1002:
		// "登陆成功"
		Notiflix.Report.Success(
		'登陆成功',
		JSONObject.content,
		'前往仪表盘',
		function(){
			gotoUrl('../panel');
		});
		break;
	case 1001:
		// "用户不存在"
		alertError($('.login-left-mid .user-name input')[0],"shake",JSONObject.content);
		break;
	case 1002:
		// "密码错误"
		alertError($('.login-left-mid .password input')[0],"shake",JSONObject.content);
		break;
	default:
		alert("发生未知错误");
		break;
	}
}
