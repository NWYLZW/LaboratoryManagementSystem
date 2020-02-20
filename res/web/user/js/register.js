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
	setTimeout(function() {
		node.classList.remove(shakeName);
		node.style.backgroundColor = "";
	}, 1000);
	dialog({
		title: '信息错误',
		content: message,
		padding: '40px',
		drag: true,
	}).show();
}
function validate(formData, jqForm, options){
	//jqForm:   jQuery对象，封装了表单的元素
	var form = jqForm[0];              //将jqForm转换为DOM对象
	try{
		// 检测userName的值
		if(!checkValue(form.userName,true,function(){
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
			switch (errorType){
				case '0': case '1': case '2':
					alertError(form.userName,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		// 检测passWord的值
		if(!checkValue(form.password,true,function(){
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
			switch (errorType){
				case '0': case '1': case '2':
					alertError(form.password,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		// 检测QQ的值
		if(!checkValue(form.qqNum,true,function(){
			if (this.checkValueX[0] === '0'){
				this.failed('1',"QQ开头不为零");//开头不能为0
				return false;
			}
			if(this.checkValueX.length < 5 || this.checkValueX.length > 11){
				this.failed('2',"QQ长度不得小于5大于11");//最少5最多11
				return false;
			}
			if(!(/^[0-9]+$/.test(this.checkValueX))){
				this.failed('3',"QQ要全为数字");//全都是数字
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1': case '2': case '3':
					alertError(form.qqNum,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		// 检测telNum的值
		if(!checkValue(form.telNum,true,function(){
			if (!(/^\d{11}$/.test(this.checkValueX))){
				this.failed('1',"手机号为十一位数字");
				return false;
			}
			if (this.checkValueX[0] === '0'){
				this.failed('2',"手机号开头不为零");
				return false;
			}
			return true;
		},function(errorType){
			// 失败的话执行的函数
			switch (errorType){
				case '0': case '1': case '2':
					alertError(form.telNum,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		// 检测male的值
		if(!checkValue(form.male,true,function(){
			if (this.checkValueX == 0){
				this.failed('1',"请选择你的性别");
				return false;
			}
			return true;
		},function(errorType){
			// 失败的话执行的函数
			switch (errorType){
				case '0': case '1':
					alertError(form,"shake",this.errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		var selectList = [
			form.laboratoryName,form.directionName,form.professional,
			form.gradle,form.classNum,
		];
		var errorMessageList = [
			"请选择实验室","请选择方向","请选择专业",
			"请选择年级","请选择班级",
		];
		for (var i = 0; i < selectList.length; i++) {
			if(!checkValue(selectList[i],true,function(){
				if (this.checkValueX == 0){
					this.failed('1',errorMessageList[i]);
					return false;
				}
				return true;
			},function(errorType){
				// 失败的话执行的函数
				switch (errorType){
					case '0': case '1':
						alertError(selectList[i],"shake",this.errorTypeDict[errorType]);
						break;
					default:
						break;
				}
			})) return false;
		}
		
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
	switch (JSONObject.type){
	case 0:
		// "表单数据错误"
		alertError($('.form')[0],"shake",JSONObject.message);
		break;
	case -1001:
		// "注册成功"
		dialog({
			title: '信息',
			content: JSONObject.content,
			padding: '40px',
			drag: true,
		}).show();
		setTimeout(function() {
			gotoUrl('./login');
		}, 1000);
		break;
	case 1003:
		// "用户名已存在"
		alertError($('.form .user-name input')[0],"shake",JSONObject.content);
		break;
	default:
		alert("发生未知错误");
		break;
	}
}
