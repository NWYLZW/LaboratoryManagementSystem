class myAjax {
	constructor(options) {
		this.url = options.url || "/";
		this.data = options.data || null;
		this.method = options.method || "GET";
		this.success = options.success || function(result) {console.log(result);};
		this.failure = options.failure || function(e){console.log(e.status);};
		this.always = options.always || function (jqXHR){console.log(jqXHR.status);};
	}
	ajax(){
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
		return this;
	}
}
var typeSpecialDeal = null;
var responseCorrect = null;
var responseError = null;
var failureEnd = null;
class myAjaxForm extends myAjax {
	constructor(options) {
		super(options);
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
		var dictObj = JSON.parse(result);
		if(typeSpecialDeal.hasOwnProperty(String(dictObj.type))){
			typeSpecialDeal[dictObj.type](dictObj);
			return;
		}
		if(dictObj.type < 0){
			if(dialog){
				dialog({
					title: '消息提示',
					content: dictObj.content,
					padding: '40px',
				}).show();
			}
			else{
				alert("请导入artDialog的js包");
			}
			responseCorrect(dictObj);
		}
		else{
			if(dialog){
				dialog({
					title: '错误信息',
					content: dictObj.content,
					padding: '40px',
				}).show();
			}
			else{
				alert("请导入artDialog的js包");
			}
			responseError(dictObj);
		}
	}
	failure(e){
		if(dialog){
			dialog({
				title: '服务器响应错误',
				content: e.status+"状态响应错误",
				padding: '40px',
			}).show();
		}
		else{
			alert("请导入artDialog的js包");
		}
		failureEnd();
	}
}