var options = { 
	beforeSubmit: validate,     //提交前的回调函数
	success: jsonResponse,      //提交后的回调函数
	//url: url,                 //默认是form的action， 如果申明，则会覆盖
	//type: type,               //默认是form的method（get or post），如果申明，则会覆盖
	//dataType: null,           //html(默认), xml, script, json...接受服务端返回的类型
	//clearForm: true,          //成功提交后，清除所有表单元素的值
	resetForm: true,            //成功提交后，重置所有表单元素的值
	timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求
};
function validate(formData, jqForm, options){
	//jqForm:   jQuery对象，封装了表单的元素
	var form = jqForm[0];              //将jqForm转换为DOM对象
	if(!checkValue(form.userName,true,function(){
		// 检测userName的值
		// TODO 用户名有俩种形式一种是前面为T的老师号码
		// 一种是学号
		if (this.checkValueX.length!=12){
			this.failed('1',"用户名长度错误");
			return false;
		}
		if(!(/^\d{12}$/.test(this.checkValueX))){
			this.failed('2',"用户名需全为数字");
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
			case '2':
				alert(this.errorTypeDict[errorType]);
				break;
			default:
				break;
		}
	})) return false;
	if(!checkValue(form.password,true,function(){
		// 检测passWord的值
		if (this.checkValueX.length < 6){//小于六位数
			this.failed('1',"密码位数小于六位强度太弱");
			return false;
		}
		if(/^[0-9]+$/.test(this.checkValueX)){//小于六位数或全为数字
			this.failed('2',"密码全为数字强度太弱");
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
			case '2':
				alert(this.errorTypeDict[errorType]);
				break;
			default:
				break;
		}
	})) return false;
	if(!checkValue(form.qqNum,true,function(){
		// 检测QQ的值
		if (this.checkValueX[0] === '0'){
			this.failed('1',"QQ开头不为零");//开头不能为0
			return false;
		}
		if(this.checkValueX.length < 5 || this.checkValueX.length > 11){
			this.failed('1',"QQ长度不得小于5大于11");//最少5最多11
			return false;
		}
		if(!(/^[0-9]+$/.test(this.checkValueX))){
			this.failed('1',"QQ要全为数字");//全都是数字
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
			case '2':
				alert(this.errorTypeDict[errorType]);
				break;
			case '3':
				alert(this.errorTypeDict[errorType]);
				break;
			default:
				break;
		}
	})) return false;
	if(!checkValue(form.telNum,true,function(){
		// 检测telNum的值
		if (!(/^\d{11}$/.test(this.checkValueX))){
			// 不符合标准 将序号和错误信息加到字典中执行下面的函数，并return false
			this.failed('1',"手机号为十一位数字");
			return false;
		}
		if (this.checkValueX[0] === '0'){
			// 不符合标准 将序号和错误信息加到字典中执行下面的函数，并return false
			this.failed('1',"手机号开头不为零");
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
			case '2':
				alert(this.errorTypeDict[errorType]);
				break;
			default:
				break;
		}
	})) return false;
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
	console.log(JSONObject.type);
	switch (JSONObject.type){
	case 0:
		// "注册成功"
		alert("表单数据错误");
		break;
	case -1001:
		// "注册成功"
		alert("注册成功");
		break;
	case 1003:
		// "用户名已存在"
		alert("用户名已存在");
		break;
	default:
		alert("发生未知错误");
		break;
	}
}
