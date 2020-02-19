var myScroll = function(){};
myScroll.create = function(ElementIdName){
	this.c = new IScroll(ElementIdName, {
		mouseWheel: true,
		scrollbars: true,
	});
	this.c.click = true;
	this.c.on('scrollStart', function(){
		this.click = false;
	});
	this.c.on('scrollEnd', function(){
		this.click = true;
	});
} 
function generateMenu(dictm,ElementIdName){
	myScroll.create(ElementIdName);
	var ulx = $("<ul></ul>");
	for(let i = 0;i < dictm.length;i++){
		var ulx_li = createEleAddClass("li","centerx_menu_item");
		var item_childs = createEleAddClass("div","item-childs");
		var item_title = generateItemTitle(dictm[i]['name'],dictm[i]['ico-class']);
		
		var childs = dictm[i]['child'];
		if(childs.length>0){
			ulx_li.onclick = show_child;
			
			var ulxtemp = document.createElement('ul');
			for(let i = 0;i < childs.length;i++){
				var ulx_litemp = createEleAddClass("li","centerx_menu_item");
				var item_titletemp = generateItemTitle(childs[i]['name'],childs[i]['ico-class']);
				item_titletemp.url = childs[i]['url'];
				item_titletemp.onclick = function(){
					if(!myScroll.c.click) return;
					gotoUrl(this.url);
				};
				ulx_litemp.appendChild(item_titletemp);
				ulxtemp.appendChild(ulx_litemp);
			}
			item_childs.appendChild(ulxtemp);
		}
		else{
			item_title.onclick = function(){
				if(!myScroll.c.click) return;
				gotoUrl(dictm[i]['url']);
			}
		}
		ulx_li.append(item_title);
		ulx_li.append(item_childs);
		ulx.append(ulx_li);
	}
	console.log()
	$(ElementIdName)[0].getElementsByClassName('centerx_menu')[0].appendChild(ulx[0]);
	myScroll.c.refresh();
}
function show_child(){
	if(!myScroll.c.click) return;
	var regex = /show_child/;
	if(regex.test(this.className))
		this.classList.remove('show_child');
	else
		this.classList.add('show_child');
	setTimeout(function(){
		myScroll.c.refresh();
	},500)
}
function generateItemTitle(name,ico_class){
	var item_title = createEleAddClass("div","item-title");
	item_title.innerHTML = 
	"<div class=\"item-title-ico\">"+
		"<i class=\""+ico_class+"\"></i>"+
	"</div>"+
	"<div class='item-title-content'>"+name+"</div>";
	return item_title;
}