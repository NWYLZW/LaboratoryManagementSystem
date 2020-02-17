var options = { 
	beforeSubmit: validate,     //提交前的回调函数
	success: response,          //提交后的回调函数
	//url: url,                 //默认是form的action， 如果申明，则会覆盖
	//type: type,               //默认是form的method（get or post），如果申明，则会覆盖
	//dataType: null,           //html(默认), xml, script, json...接受服务端返回的类型
	//clearForm: true,          //成功提交后，清除所有表单元素的值
	resetForm: true,            //成功提交后，重置所有表单元素的值
	timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求
}
function validate(formData, jqForm, options){
	//jqForm:   jQuery对象，封装了表单的元素
	var form = jqForm[0];              //将jqForm转换为DOM对象
	// TODO lgh 模仿我下面的检测方式，逐一检测各个值 checkValue是我下面的一个对象你可以研究一下
	// TODO lgh 补充检测用户名是否为学号格式
	if(!checkValue(form.userName,true,function(){
		// 检测userName的值
		if(this.checkValue.length!=12){
			// 不符合标准 将序号和错误信息加到字典中执行下面的函数，并return false
			this.failed('1',"用户名长度错误");
			return false;
		}
		return true;
	},function(errorType){
		// 失败的话执行的函数
		console.log(this.errorTypeDict[errorType]);
		switch (errorType){
			case '0':
				alert(this.errorTypeDict[errorType]);
				break;
			case '1':
				alert(this.errorTypeDict[errorType]);
				break;
			default:
				break;
		}
	})) return false;
	// TODO lgh 检测密码强度是否够高
	// TODO lgh 检测QQ号格式是否正确
	// TODO lgh 检测电话号码格式是否正确
	// TODO lgh 加油，我相信你到我起来还不会写完的，哈哈哈哈
	return true;
};
function checkValue(filed,checkNull,check,failedx){
	this.checkValue = filed;
	this.check = check;
	this.failed = function(errorType,errorMessage){
		this.errorTypeDict[errorType] = errorMessage;
		failedx(errorType);
	};
	this.errorTypeDict = {};
	if(checkNull&&filed.value==""){
		this.failed('0',"值不能为空");
		return false;
	}
	return this.check();
};

function response(data){
	alert("发生未知错误");
	var JSONObject = JSON.parse(data);
	switch (JSONObject.type){
		// "注册成功"
	case -1001:
		break;
		// "用户名不存在"
	case 1001:
		break;
		// "密码错误"
	case 1002:
		break;
		// "用户名已存在"
	case 1003:
		break;
	default:
		alert("发生未知错误");
		break;
	}
};