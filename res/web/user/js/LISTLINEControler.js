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
		var circleList = document.getElementsByClassName('LISTLINE-circle');
		for(let i = 0;i < circleList.length;i++){
			circleList[i].onclick = function(){
				LISTLINEContro.statu = i;
				LISTLINEContro.refresh();
			}
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
	viloateFirst(){
		var form = this.form;
		// 检测name的值
		if(!checkValue("姓名",form.name,true,function(){
			if (this.checkValueX.length<2){
				this.failed('1',"有一个字的名字？？？");
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
		return true;
	}
	viloateSecond(){
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