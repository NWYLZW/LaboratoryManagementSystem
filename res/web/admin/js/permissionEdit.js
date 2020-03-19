var permissionList = {
	"1":"CommonUser",
};
function loadEnd(){
	new myAjax({
		url:'../admin/getPermissionList',
		method:"POST",
		success:function(result){
			permissionList = JSON.parse(result);
			$('.search').append(new searchControler({
					height: 50,
					backColor: 'rgba(50,150,250)',
					icoColor:"rgba(230,230,230)",
					inputColor:"rgba(240,240,240)",
					submit:function(){
						contro.loading();
						new myAjax({
							url:'../user/searchAllUser',
							data: this.keyWords,
							method:"POST",
							success:function(result){
								contro.loaded();
								setTimeout(function() {contro.updataDictList(JSON.parse(result));}, 1000);
							},
							failure:function(error){},
							always:function(jqXHR){}
						}).ajax();
					},
				}).jqEle
			);
			contro = new pageListControler({
				title:"修改用户权限",
				pageCountList:[6,12,24,48],
				itemModel:new permissionEditUserItem(),
				dictList:[],
			});
			$('.search-result')[0].appendChild(contro.ele);
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
}
loadEnd();