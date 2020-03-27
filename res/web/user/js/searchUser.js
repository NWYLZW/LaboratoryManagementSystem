function search(){
	clearInterval(IntervalX);
	$('.search').append(new searchControler({
			height: 50,
			backColor: 'rgba(50,150,250)',
			icoColor:"rgba(230,230,230)",
			inputColor:"rgba(240,240,240)",
			submit:function(){
				contro.loading();
				new myAjax({
					url:'../user/searchUser',
					data: this.keyWords,
					method:"POST",
					success:function(result){
						contro.updataDictList(JSON.parse(result));
						contro.loaded();
					},
					failure:function(error){},
					always:function(jqXHR){}
				}).ajax();
			},
		}).jqEle
	);
}
var contro = null;
function search_result(){
	contro = new pageListControler({
		title:"用户信息",
		pageCountList:[2,4,6,8,10],
		itemModel:new userItemModelX01(),
		dictList:[],
	});
	$('.search-result')[0].appendChild(contro.ele);
}
var IntervalX = setInterval(function(){
	if($('.search')[0]){
		search();
	}
	if($(".search-result")[0]){
		search_result();
	}
},100);