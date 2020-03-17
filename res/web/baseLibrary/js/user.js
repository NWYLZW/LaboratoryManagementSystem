function getMyData(callBack){
	new myAjax({
		url:"../my/data",
		method:"POST",
		success:function(result){
			callBack(JSON.parse(result));
		},
		failure:function(error){
			try{ 
				Notiflix.Report.Failure( 
				'获取用户信息失败',
				'出现了错误，请联系管理员',
				'关闭' );
			}catch(e){
				console.log(e);
				console.log('未加载Notiflix模块');
			}
		},
		always:function(jqXHR){}
	}).ajax();
}
function getMyHeadPortrait(imgNode){
	try{
		Notiflix.Block.Dots('.'+imgNode.parentNode.className);
	}catch(e){
		console.log(e);
		console.log('未加载Notiflix模块');
	}
	new ajaxGetFile({
		url:"../my/getHeadPortrait?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className,200);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = "../../baseLibrary/img/imgLoadError.png";
			Notiflix.Block.Remove('.'+imgNode.parentNode.className);
		},
		always:function(jqXHR){}
	}).ajax();
}
function getBackground(imgNode){
	try{
		Notiflix.Block.Dots('.'+imgNode.parentNode.className);
	}catch(e){
		console.log(e);
		console.log('未加载Notiflix模块');
	}
	new ajaxGetFile({
		url:"../my/getBackground?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className,200);
			};
			imgNode.src = "../../baseLibrary/defaultBackgroundImage.png";
		},
		always:function(jqXHR){}
	}).ajax();
}