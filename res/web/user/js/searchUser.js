var briefOptions = { 
	beforeSubmit: validate,     //提交前的回调函数
	success: jsonResponse,      //提交后的回调函数
	resetForm: true,            //成功提交后，重置所有表单元素的值
	timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求
};
function validate(formData, jqForm, options){
	return true;
}
var searchUserResultList0 = new searchUserResultList();
function jsonResponse(data){
	var JSONObject = JSON.parse(data);
	searchUserResultList0.initData(JSONObject);
}

var IntervalX = setInterval(function(){
	if($("#searchUser")[0]){
		clearInterval(IntervalX);
		new response("../user",500,1000,"searchBriefUser").start();
		$("#searchUser").submit(function(){
			$(this).ajaxSubmit(briefOptions);
			return false;
		});
	}
},100);