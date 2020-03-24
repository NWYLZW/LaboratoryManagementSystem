class editPrivateDataControler {
	constructor() {
		this.$editEmailBTN = $('.editEmailBTN');;
		this.$editPWDBTN;
		this.$oldEmail = $('.oldEmail');
		this.$newEmail;
		this.$newPWD;
		this.$PWDConfirm;
		
		var content = this;
		// 解绑本来的click事件
		this.$editEmailBTN.unbind("click").click(function(){
			var noEditFunction = this;
			// 将对应的input设置为可点击
			content.setInput([0],true);
			// 修改$editEmailBTN的文字内容
			// 解绑click事件
			// 绑定验证
			content.$editEmailBTN
			.text('确认')
			.unbind("click")
			.click(function(){
				// 检验数据是否有误
				if(content.validationEmailData()){
					// 发送数据，设置一个成功函数
					content.submitEmailData(function(){
						content.setInput([0],false);
						// 成功的话
						// 修改$editEmailBTN的文字内容
						// 绑定回本来的点击事件
						content.$editEmailBTN
						.text('修改隐私邮箱')
						.unbind("click")
						.click(noEditFunction);
					});
				}
			});
		});
	}
	setInput(arr,can){
		arr.length
		var List_$ICO = [
			this.$oldEmail,
			this.$newEmail,
			this.$newPWD,
			this.$PWDConfirm];
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]>=0 && arr[i]<=3){
				let icoDiv = List_$ICO[arr[i]].find('.formContent-ico');
				if(can){
					icoDiv.find('.ERROR').css('color','rgba(0,0,0,0)');
					icoDiv.find('.mainIco').removeClass('fa-1x').addClass('fa-1_5x');
					List_$ICO[arr[i]].find('input').removeAttr('readonly');
				}else{
					icoDiv.find('.ERROR').css('color','');
					icoDiv.find('.mainIco').removeClass('fa-1_5x').addClass('fa-1x');
					List_$ICO[arr[i]].find('input').attr('readonly','readonly');
				}
			}
		}
	}
	submitEmailData(successFun){
		
	}
	validationEmailData(){
		var content = this;
		var submitForm = 
		$('<form></form>')
		.append(this.$oldEmail.find('input').clone())
		[0];
		//检测email
		if(!checkValue("原电子邮箱",submitForm.oldEmail,true,function(){
			if (!(/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i.test(this.checkValueX))){
				this.failed('1',"输入邮箱格式不正确");
				return false;
			}
			return true;
		},function(errorType){
			switch (errorType){
				case '0': case '1':
				// 因为是clone的节点，不是原节点所以重新拿一下input节点
					alertError(content.$oldEmail.find('input')[0],"shake",errorTypeDict[errorType]);
					break;
				default:
					break;
			}
		})) return false;
		this.submitForm = submitForm;
		return true;
	}
	submitPWDData(successFun){
		
	}
	validationPWDData(){
		return true;
	}
}