(() =>{
	class myAjax {
		constructor(options,isForm) {
			this.isForm = isForm || false;
			this.url = options.url || "/";
			this.data = options.data || null;
			this.method = options.method || "GET";
			this.success = options.success || function(result) {console.log(result);};
			this.failure = options.failure || function(e){console.log(e.status);};
			this.always = options.always || function (jqXHR){console.log(jqXHR.status);};
		}
		ajax(){
			if(this.isForm)
				$.ajax({
					url:this.url,
					type:this.method,
					error:this.failure,
					success:this.success,
					data:this.data,
					dataType : 'JSON',
					cache : false,
					processData : false,
					contentType : false,
				}).always(this.always);
			else{
				if(this.data!=null)
					this.data = JSON.stringify(this.data);
				$.ajax({
					url:this.url,
					type:this.method,
					error:this.failure,
					success:this.success,
					data:this.data,
					contentType: "application/json;charset=UTF-8",
				}).always(this.always);
			}
			return this;
		}
	}
	class ajaxGetFile{
		constructor(options) {
			this.url = options.url || "/";
			this.data = options.data || null;
			this.method = options.method || "GET";
			this.success = options.success || function(result) {console.log(result);};
			this.failure = options.failure || function(e){console.log(e.status);};
		}
		ajax(){
			var content = this;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open(this.method,this.url,true);
			xmlhttp.responseType = "blob";
			xmlhttp.onload = function(){
				if(this.status >= 300){
					content.failure(this);
					return;
				}
				content.success(this.response);
			}
			xmlhttp.send(this.data);
		}
	}
	var typeSpecialDeal = null;
	var responseCorrect = null;
	var responseError = null;
	var failureEnd = null;
	class myAjaxForm extends myAjax {
		constructor(options) {
			super(options,true);
			typeSpecialDeal = options.typeSpecialDeal || {};
			responseCorrect = options.responseCorrect || function(dictObj){
				console.log(dictObj);
			};
			responseError = options.responseError || function(dictObj){
				console.log(dictObj);
			};
			failureEnd = options.failureEnd || function(){
				
			}
			this.always = options.always || function (jqXHR){};
			this.success = this.newSuccess;
		}
		newSuccess(result){
			var dictObj = result;
			if(typeSpecialDeal.hasOwnProperty(String(dictObj.type))){
				typeSpecialDeal[dictObj.type](dictObj);
				return;
			}
			if(dictObj.type < 0){
				if(Notiflix){
					Notiflix.Report.Success(
					'消息提示'
					,dictObj.content
					,'确认');
				}
				else{
					console.log("请导入Notiflix的js包");
				}
				responseCorrect(dictObj);
			}
			else{
				if(Notiflix){
					Notiflix.Report.Failure(
					'错误信息'
					,dictObj.content
					,'确认');
				}
				else{
					console.log("请导入Notiflix的js包");
				}
				responseError(dictObj);
			}
		}
		failure(e){
			if(Notiflix){
				Notiflix.Report.Failure(
				'服务器响应错误'
				,e.status+"状态响应错误"
				,'确认');
			}
			else{
				console.log("请导入Notiflix的js包");
			}
			failureEnd();
		}
	}
	window.myAjax = myAjax;
	window.ajaxGetFile = ajaxGetFile;
	window.myAjaxForm = myAjaxForm;
})();