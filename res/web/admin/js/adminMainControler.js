var list0 = [
	{
		id:0,
		name:"Java",
		imgName:"Java",
		content:"Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，\
		因此Java语言具有功能强大和简单易用两个特征。\
		Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。",
		users:[
			{
				id:0,
				name:"奉自利",
			},
		],
	},
];
var list1 = [
	{
		id:0,
		name:"F-608",
		content:"新校区F栋608号实验室",
		users:[
			{
				id:0,
				name:"奉自利",
			},
		],
	},
];

new PanelControler({
	data:list0,
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
					<input type="text" name="directionImageName" style="display: none;" my-submit/>\
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
			wraper$.css('left',-(currentIcoIndex*50-35)+'px');
			item$.find('.fa-angle-left').click(function(){
				currentIcoIndex -= 1;
				if(currentIcoIndex==0){
					item$.find('.fa-angle-left').css('color','white').unbind('click');
				}
				else if(currentIcoIndex>0&&currentIcoIndex<ICOList.length){
				}
				else{
					item$.find('.fa-angle-right').css('color','white').unbind('click');
				}
				wraper$.css('left',-(currentIcoIndex*50-35)+'px');
			});
			item$.find('.fa-angle-right').click(function(){
				currentIcoIndex += 1;
				wraper$.css('left',-(currentIcoIndex*50-35)+'px');
			});
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
				personnelList$.append('<div class="direction-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].name+'</div>')
			}
			return item$;
		}
	},
	violation:function(form){
		return true;
	},
});

new PanelControler({
	data:list1,
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
				item$.find('.laboratory-name input').val(dict.name);
				item$.find('.laboratory-introduce textarea').val(dict.content);
				var personnelList$ = item$.find('.laboratory-personnelList');
				for (var i = 0; i < dict.users.length; i++) {
					personnelList$.append('<div class="laboratory-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].name+'</div>')
				}
			}
			return item$;
		}
		else{
			var item$ = $('\
				<div class="laboratory-panelContent-item">\
					<div class="laboratory-content">\
						<div class="laboratory-name"><i class="fa fa-flask fa-1x"></i>'+dict.name+'</div>\
						<div class="laboratory-num"><i class="fa fa-users fa-1x"></i>'+dict.users.length+'</div>\
						<div class="laboratory-introduce">'+dict.content+'</div>\
						<div class="laboratory-personnelList"></div>\
					</div>\
				</div>\
			');
			var personnelList$ = item$.find('.laboratory-personnelList');
			for (var i = 0; i < dict.users.length; i++) {
				personnelList$.append('<div class="laboratory-personnel"><i class="fa fa-user fa-1x"></i>'+dict.users[i].name+'</div>')
			}
			return item$;
		}
	},
	violation:function(form){
		return true;
	},
});