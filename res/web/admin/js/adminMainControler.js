(() =>{
	Notiflix.Block.Dots('.direction-panelContent');
	new myAjax({
		url:'/admin/getDirectionAllData',
		method:"GET",
		success:function(result){
			let list = JSON.parse(result);
			Notiflix.Block.Remove('.direction-panelContent',100);
			new PanelControler({
				data:list,
				panelName:'.direction-panelContent',
				updataURL:'../admin/updateDirection',
				deleteURL:'../admin/deleteDirection',
				generateItemFun:function(dict,isEdit){
					if(isEdit){
						var item$ = $('\
						<div class="direction-panelContent-item EDIT">\
							<div class="direction-ICODIV AIIco">\
								<i class="fa fa-angle-left fa-2x"></i>\
								<i class="fa fa-angle-right fa-2x"></i>\
								<input class="direction-ICODIV-input" type="text" name="directionImageName" style="display: none;" my-submit/>\
							</div>\
							<div class="direction-content">\
								<div class="direction-name"><input type="text" name="name" my-submit/></div>\
								<div class="direction-introduce"><textarea name="content" my-submit></textarea></div>\
							</div>\
						</div>');
						var ICOList = ['ACM','AI','Android','Java','Html','IOT','Php','Product',];
						var wraper$ = $('<div class="direction-ICODIV-wraper"></div>');
						var currentIcoIndex = 0;
						for (var i = 0; i < ICOList.length; i++) {
							wraper$.append('<div class="direction-ICODIV-wraperItem '+ICOList[i]+'Ico"></div>');
						}
						item$.find('.direction-ICODIV').prepend(wraper$).removeClass('AIIco');
						if(dict!=null){
							currentIcoIndex = ICOList.indexOf(dict.imgName);
							item$.find('.direction-name input').val(dict.name);
							item$.find('.direction-introduce textarea').val(dict.content);
						}
						var leftBtn$ = item$.find('.fa-angle-left');
						var rightBtn$ = item$.find('.fa-angle-right');
						function refresh(){
							leftBtn$.css('color','white').unbind('click');
							rightBtn$.css('color','white').unbind('click');
							if(currentIcoIndex==0){
								rightBtn$.css('color','').bind('click',rightBtn$.clickFun);
							}
							else if(currentIcoIndex>0&&currentIcoIndex<ICOList.length-1){
								leftBtn$.css('color','').bind('click',leftBtn$.clickFun);
								rightBtn$.css('color','').bind('click',rightBtn$.clickFun);
							}
							else{
								leftBtn$.css('color','').bind('click',leftBtn$.clickFun);
							}
							wraper$.css('left',-(currentIcoIndex*50-35)+'px');
							item$.find('.direction-ICODIV-input').val(ICOList[currentIcoIndex]);
						}
						leftBtn$.click(function(){
							currentIcoIndex -= 1;refresh();
						});
						rightBtn$.click(function(){
							currentIcoIndex += 1;refresh();
						});
						leftBtn$.clickFun = $._data(leftBtn$[0],'events')['click'][0].handler;
						rightBtn$.clickFun = $._data(rightBtn$[0],'events')['click'][0].handler;
						refresh();
						return item$;
					}
					else{
						var item$ = $('\
						<div class="direction-panelContent-item">\
							<div class="direction-ICODIV '+dict.imgName+'Ico"></div>\
							<div class="direction-content">\
								<div class="direction-name">'+dict.name+'</div>\
								<div class="direction-num"><i class="fa fa-users fa-1x"></i>'+dict.users.length+'</div>\
								<div class="direction-introduce">'+dict.content+'</div>\
								<div class="direction-personnelList"></div>\
							</div>\
						</div>');
						var personnelList$ = item$.find('.direction-personnelList');
						for (var i = 0; i < dict.users.length; i++) {
							personnelList$.append('<div class="direction-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].nickName+'</div>')
						}
						return item$;
					}
				},
				violation:function(form){
					return true;
				},
			});
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
	Notiflix.Block.Dots('.laboratory-panelContent');
	new myAjax({
		url:'/admin/getLaboratoryAllData',
		method:"GET",
		success:function(result){
			let list = JSON.parse(result);
			Notiflix.Block.Remove('.laboratory-panelContent',100);
			new PanelControler({
				data:list,
				panelName:'.laboratory-panelContent',
				updataURL:'../admin/updateLaboratory',
				deleteURL:'../admin/deleteLaboratory',
				generateItemFun:function(dict,isEdit){
					if(isEdit){
						var item$ = $('\
							<div class="laboratory-panelContent-item EDIT">\
								<div class="laboratory-content">\
									<div class="laboratory-name"><input type="text" name="name" my-submit/></div>\
									<div class="laboratory-introduce"><textarea name="content" my-submit></textarea></div>\
									<div class="laboratory-personnelList"></div>\
								</div>\
							</div>\
						');
						if(dict!=null){
							item$.find('.laboratory-name input').val(dict.blockNum+'-'+dict.doorNum);
							item$.find('.laboratory-introduce textarea').val(dict.content);
							var personnelList$ = item$.find('.laboratory-personnelList');
							for (var i = 0; i < dict.users.length; i++) {
								personnelList$.append('<div class="laboratory-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].nickName+'</div>');
							}
						}
						return item$;
					}
					else{
						var item$ = $('\
							<div class="laboratory-panelContent-item">\
								<div class="laboratory-content">\
									<div class="laboratory-name"><i class="fa fa-flask fa-1x"></i>'+dict.blockNum+'-'+dict.doorNum+'</div>\
									<div class="laboratory-num"><i class="fa fa-users fa-1x"></i>'+dict.users.length+'</div>\
									<div class="laboratory-introduce">'+dict.content+'</div>\
									<div class="laboratory-personnelList"></div>\
								</div>\
							</div>\
						');
						var personnelList$ = item$.find('.laboratory-personnelList');
						for (var i = 0; i < dict.users.length; i++) {
							personnelList$.append('<div class="laboratory-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].nickName+'</div>')
						}
						return item$;
					}
				},
				violation:function(form){
					return true;
				},
			});
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
	Notiflix.Block.Dots('.professional-panelContent');
	new myAjax({
		url:'/admin/getProfessionalClassAllData',
		method:"GET",
		success:function(result){
			let list = JSON.parse(result);
			Notiflix.Block.Remove('.professional-panelContent',100);
			new PanelControler({
				data:list,
				panelName:'.professional-panelContent',
				updataURL:'../admin/updateProfessional',
				deleteURL:'../admin/deleteProfessional',
				generateItemFun:function(dict,isEdit){
					if(isEdit){
						var item$ = $('\
							<div class="professional-panelContent-item EDIT">\
								<div class="professional-content">\
									<div class="professional-name"><input type="text" name="name" my-submit/></div>\
									<div class="professional-personnelList"></div>\
								</div>\
							</div>\
						');
						if(dict != null){
							item$.find('.professional-name input').val(dict.professional);
							var personnelList$ = item$.find('.professional-personnelList');
							for (var i = 0; i < dict.users.length; i++) {
								personnelList$.append('<div class="professional-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].nickName+'</div>');
							}
						}
						return item$;
					}
					else{
						var item$ = $('\
							<div class="professional-panelContent-item">\
								<div class="professional-content">\
									<div class="professional-name"><i class="fa fa-flask fa-1x"></i>'+dict.professional+dict.gradle+(function(num){
										y='000'+num;
										return y.substr(y.length-2);
									})(dict.classNum)+'</div>\
									<div class="professional-num"><i class="fa fa-users fa-1x"></i>'+dict.users.length+'</div>\
									<div class="professional-personnelList"></div>\
								</div>\
							</div>\
						');
						var personnelList$ = item$.find('.professional-personnelList');
						for (var i = 0; i < dict.users.length; i++) {
							personnelList$.append('<div class="professional-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].nickName+'</div>')
						}
						return item$;
					}
				},
				violation:function(form){
					return true;
				},
			});
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
})();