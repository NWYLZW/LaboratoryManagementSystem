function getMyHeadPortrait(imgNode){
	new ajaxGetFile({
		url:"../my/getHeadPortrait?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = "../../baseLibrary/img/imgLoadError.png";
		},
		always:function(jqXHR){}
	}).ajax();
}
function getBackground(imgNode){
	new ajaxGetFile({
		url:"../my/getBackground?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = "../../baseLibrary/defaultBackgroundImage.png";
		},
		always:function(jqXHR){}
	}).ajax();
}