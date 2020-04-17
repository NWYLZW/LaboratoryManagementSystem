new myAjax({
	url:"../notice/loginNotice",
	method:"POST",
	success:function(result){
		dictObj = JSON.parse(result);
		new loginNoticeContro(dictObj);
	},
	failure:function(error){
		// console.log(error);
	},
	always:function(jqXHR){
		// console.log(jqXHR);
	}
}).ajax();
