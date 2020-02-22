function loadEnd(){
	new response("../my/space",640,1000).start();
	$('.mark').click(function(){
		new myAjax({
			url:"../../mark/",
			method:"POST",
			success:function(result){
				var JSONObject = JSON.parse(result);
				switch (JSONObject.type){
				case -2001:
					dialog({
						title: '信息',
						content: JSONObject.content,
						padding: '40px',
						drag: true,
						time:2,
					}).show();
					break;
				default:
					dialog({
						title: '错误',
						content: JSONObject.content,
						padding: '40px',
						drag: true,
						time:2,
					}).show();
					break;
				}
			},
			failure:function(e){
				console.log(e);	
			}
		}).ajax();
	})
}
loadEnd();