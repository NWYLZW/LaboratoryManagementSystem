(() =>{
	class editPrivateDataControler {
		constructor() {
			this.$editEmailBTN = $('.editEmailBTN');
			this.$editPWDBTN = $('.editPWDBTN');
			this.$oldEmail = $('.oldEmail');
			this.$newEmail = $('.newEmail');
			this.$newPWD = $('.newPWD');
			this.$PWDConfirm = $('.PWDConfirm');
			this.Click();
		}
		Click(){
			var content = this;
			content.setInput([0,1,2,3],false);
			this.$editEmailBTN
			.text('修改隐私邮箱').css('background-color','#047DE2')
			.unbind("click").click(function(){
				var noEditFunction = this;
				content.setInput([0,1],true);
				content.$editEmailBTN
				.text('确认').css('background-color','green')
				.unbind("click")
				.click(function(){
					if(content.validationEmailData()){
						content.submitEmailData(function(){
							content.Click();
						});
					}
				});
				content.$editPWDBTN
				.text('取消').css('background-color','red')
				.unbind("click")
				.click(function(){
					content.Click();
				});
			});
			this.$editPWDBTN
			.text('修改密码').css('background-color','#047DE2')
			.unbind('click').click(function(){
				content.setInput([0,2,3],true);
				content.$editEmailBTN
				.text('确认').css('background-color','green')
				.unbind("click")
				.click(function(){
					if(content.validationPWDData()){
						content.submitPWDData(function(){
							content.Click();
						});
					}
				});
				content.$editPWDBTN
				.text('取消').css('background-color','red')
				.unbind("click")
				.click(function(){
					content.Click();
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
			var content = this;
			var formData = new FormData(
				$('<form></form>')
				.append($('.oldEmail').clone().val($('.oldEmail').val()))
				.append($('.newEmail').clone())[0]
			);
			formData.set('oldEmail',$('.oldEmail input').val());
			formData.set('newEmail',$('.newEmail input').val());
			
			new myAjax({
				url:'../../my/editMyBaseData',
				data:formData,
				method:"POST",
				success:function(result){
				},
				failure:function(error){
					// console.log(error);
				},
				always:function(jqXHR){
					// console.log(jqXHR);
				}
			}).ajax();
		}
		validationEmailData(){
			var content = this;
			var submitForm = 
			$('<form></form>')
			.append(this.$oldEmail.find('input').clone())
			.append(this.$newEmail.find('input').clone())
			[0];
			if(!checkValue("原电子邮箱",submitForm.oldEmail,true,function(){
				if (!(/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i.test(this.checkValueX))){
					this.failed('1',"输入邮箱格式不正确");
					return false;
				}
				return true;
			},function(errorType){
				switch (errorType){
					case '0': case '1':
						alertError(content.$oldEmail.find('input')[0],"shake",errorTypeDict[errorType]);
						break;
					default:
						break;
				}
			})) return false;
			if(!checkValue("新电子邮箱",submitForm.newEmail,true,function(){
				if (!(/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i.test(this.checkValueX))){
					this.failed('1',"输入邮箱格式不正确");
					return false;
				}
				return true;
			},function(errorType){
				switch (errorType){
					case '0': case '1':
						alertError(content.$newEmail.find('input')[0],"shake",errorTypeDict[errorType]);
						break;
					default:
						break;
				}
			})) return false;
			this.submitForm = submitForm;
			return true;
		}
		submitPWDData(successFun){
			var content = this;
			var formData = new FormData(
				$('<form></form>')
				.append($('.oldEmail').clone().val($('.oldEmail').val()))
				.append($('.newPWD').clone())[0]
			);
			
			formData.set('oldEmail',$('.oldEmail input').val());
			formData.set('newPWD',$('.newPWD input').val());
			new myAjax({
				url:'../../my/editMyBaseData',
				data:formData,
				method:"POST",
				success:function(result){
				},
				failure:function(error){
					// console.log(error);
				},
				always:function(jqXHR){
					// console.log(jqXHR);
				}
			}).ajax();
		}
		validationPWDData(){
			var content = this;
			var submitForm = 
			$('<form></form>')
			.append(this.$oldEmail.find('input').clone())
			.append(this.$newPWD.find('input').clone())
			.append(this.$PWDConfirm.find('input').clone())
			[0];
			if(!checkValue("新密码",submitForm.password,true,function(){
				if (this.checkValueX.length < 6){
					this.failed('1',"密码位数小于六位强度太弱");
					return false;
				}
				if(/^[0-9]+$/.test(this.checkValueX)){
					this.failed('2',"密码全为数字强度太弱");
					return false;
				}
				return true;
			},function(errorType){
				switch (errorType){
					case '0': case '1': case '2':
						alertError(content.$newPWD.find('input')[0],"shake",errorTypeDict[errorType]);
						break;
					default:
						break;
				}
			})) return false;
			if(!checkValue("确认密码",submitForm.password,true,function(){//
				if (this.checkValueX !== content.$newPWD.value){
					console.log('content.$newPWD.value',content.$newPWD.value);
					this.failed('1',"与新密码不相符");
					return false;
				}
			},function(errorType){
				switch (errorType){
					case '0':case '1':
						alertError(content.$PWDConfirm.find('input')[0],"shake",errorTypeDict[errorType]);
						break;
					default:
						break;
				}
			})) return false;
			this.submitForm = submitForm;
			return true;
		}
	}
	window.editPrivateDataControler = editPrivateDataControler;
})();