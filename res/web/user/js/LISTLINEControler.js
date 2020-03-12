class LISTLINEControler{
	constructor(options) {
		this.LISTLINE = document.getElementsByClassName('LISTLINE')[0];
		this.form = $('.form')[0];
		this.formContentWrraper = document.getElementsByClassName('formContentWrraper')[0];
		this.childList = this.LISTLINE.children;
		this.preStep = document.getElementById('preStep');
		this.nextStep = document.getElementById('nextStep');
		this.confirmx = false;
		this.statu = 0;
		this.statuList = [
			[
				"LISTLINE-circle INTHIS","LISTLINE-line",
				"LISTLINE-circle","LISTLINE-line",
				"LISTLINE-circle"],
			[
				"LISTLINE-circle SUCCESS","LISTLINE-line SUCCESS",
				"LISTLINE-circle INTHIS","LISTLINE-line",
				"LISTLINE-circle"],
			[
				"LISTLINE-circle SUCCESS","LISTLINE-line SUCCESS",
				"LISTLINE-circle SUCCESS","LISTLINE-line SUCCESS",
				"LISTLINE-circle INTHIS"],
		];
		this.tdDict = {
			'schoolId':$('.tdValue_schoolId')[0],
			'name':$('.tdValue_name')[0],
			'sex':$('.tdValue_sex')[0],
			'email':$('.tdValue_email')[0],
			'QQ':$('.tdValue_QQ')[0],
			'telNum':$('.tdValue_telNum')[0],
			'direction':$('.tdValue_direction')[0],
			'laboratory':$('.tdValue_laboratory')[0],
			'professional':$('.tdValue_professional')[0],
		}
		this.init();
	}
	init(){
		var LISTLINEContro = this;
		this.preStep.onclick = function(){
			LISTLINEContro.statu -= 1;
			LISTLINEContro.refresh();
		}
		this.nextStep.onclick = function(){
			LISTLINEContro.statu += 1;
			LISTLINEContro.refresh();
		}
	}
	refresh(){
		var LISTLINEContro = this;
		if(this.confirmx&&this.statu!=2){this.statu = 2;this.refresh()}
		if(this.statu == 0){
			this.nextStep.innerText = "下一步";
			this.nextStep.onclick = function(){
				if(LISTLINEContro.viloateFirst()){
					LISTLINEContro.statu += 1;
					LISTLINEContro.refresh();
				}
			}
			this.preStep.style.display = "none";
			this.nextStep.style.display = "block";
		}else if(this.statu == 1){
			this.nextStep.innerText = "下一步";
			this.nextStep.onclick = function(){
				if(LISTLINEContro.viloateSecond()){
					LISTLINEContro.statu += 1;
					LISTLINEContro.refresh();
				}
			}
			this.preStep.style.display = "block";
			this.nextStep.style.display = "block";
		}else if(this.statu == 2){
			this.preStep.style.display = "block";
			if(this.confirmx){
				this.preStep.style.display = "none";
				this.nextStep.style.display = "block";
				return;
			}
			else this.nextStep.style.display = "none";
			this.nextStep.innerText = "提交";
			this.nextStep.onclick = function(){
				LISTLINEContro.submit();
			}
		}
		this.formContentWrraper.style.left = '-' + this.statu + "00%";
		for(let i = 0;i < this.childList.length;i++){
			this.childList[i].className = this.statuList[this.statu][i];
		}
		return this;
	}
	changeTdData(name,text){
		this.tdDict[name].innerText = text;
	}
	viloateFirst(){
		var form = this.form;
		//检测schoolNum
		if(!checkValue("学号",form.schoolNum,true,function(){
			if (!(/^201\d0\d\d\d0\d\d\d$/.test(this.checkValueX))){
				this.failed('1',"输入学号格式不正确");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
					alertError(form.schoolNum,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('schoolId',form.schoolNum.value);
		//检测name
		if(!checkValue("姓名",form.name,true,function(){
			if (!(/^[\u4E00-\u9FA5]+$/.test(this.checkValueX))){
				this.failed('1',"输入名字为中文");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
					alertError(form.name,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('name',form.name.value);
		//检测email
		if(!checkValue("你的电子邮箱",form.email,true,function(){
			if (!(/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i.test(this.checkValueX))){
				this.failed('1',"输入邮箱格式不正确");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
					alertError(form.email,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('email',form.email.value);
		//检测password
		if(!checkValue("密码",form.password,true,function(){
			if (this.checkValueX.length < 6){
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
					alertError(form.password,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		//检测comfirmPassword
		if(!checkValue("确认密码",$('#pwd1')[0],true,function(){
			if(this.checkValueX != $('#pwd0')[0].value){
				this.failed('1','与原密码不符');
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
					alertError($('#pwd1')[0],"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		
		return true;
	}
	viloateSecond(){
		var form = this.form;
		//检测telNum
		if(!checkValue("电话号码",form.telNum,true,function(){
			if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))[0-9]{8}$/.test(this.checkValueX))){
				this.failed('1',"输入电话号码不存在");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
					alertError(form.telNum,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('telNum',form.telNum.value);
		//检测QQ
		if(!checkValue("QQ",form.QQ,true,function(){
			if (this.checkValueX[0] === '0'){
				this.failed('1',"QQ开头不为零");
				return false;
			}
			if(this.checkValueX.length < 5 || this.checkValueX.length > 11){
				this.failed('2',"QQ长度不得小于5大于11");
				return false;
			}
			if(!(/^[0-9]+$/.test(this.checkValueX))){
				this.failed('3',"QQ要全为数字");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1': case '2': case '3':
					alertError(form.QQ,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('QQ',form.QQ.value);
		//检测direction
		if(!checkValue("方向",form.direction,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0': 
					alertError(form.direction,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('direction',form.direction.options[form.direction.selectedIndex].text);
		//检测laboratory
		if(!checkValue("实验室",form.laboratory,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0': 
					alertError(form.laboratory,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('laboratory',
			$(form.laboratory.options[form.laboratory.selectedIndex]).parent()[0].label+'-'+
			form.laboratory.options[form.laboratory.selectedIndex].text);
		//检测professional
		if(!checkValue("专业",form.professional,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0': 
					alertError(form.professional,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		var schoolNum = this.form.schoolNum.value;
		var classNum = schoolNum.substring(2,4)+schoolNum.substring(schoolNum.length-4,schoolNum.length-2);
		this.changeTdData('professional',form.professional.options[form.professional.selectedIndex].text +'-' + classNum);
		//检测Sex
		if(!checkValue("性别",form.Sex,true,function(){
			return true;
		},function(errorType){
			switch (errorType){
				case '0': 
					alertError(form.Sex,"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.changeTdData('sex',form.Sex.options[form.Sex.selectedIndex].text);

		return true;
	}
	confirm(){
		this.confirmx = true;
		this.refresh();
	}
	submit(){
		Notiflix.Loading.Dots('正在提交...');
		$('#formSubmit').click();
	}
}