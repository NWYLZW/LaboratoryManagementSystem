var options = { 
	beforeSubmit: validate,
	success: jsonResponse,
	timeout: 3000
};
function validate(formData, jqForm, options){
	var form = jqForm[0];
	try{
	}catch(e){
	}
	return true;
}
function jsonResponse(data){
	var JSONObject = JSON.parse(data);
	Notiflix.Loading.Remove();
	switch (JSONObject.type){
	case 0:
		alertError($('.main')[0],"shake",JSONObject.message);
		break;
	case -1001:
		Notiflix.Report.Success(
		'注册成功',
		JSONObject.content,
		'Login',
		function(){
			gotoUrl('./login');
		});
		break;
	case 1003:
		alertError($('.main')[0],"shake",JSONObject.content);
		break;
	default:
		alert("发生未知错误");
		break;
	}
}
