var myScroll = function(){};
var ulx = null;
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
	ulx = $("<ul></ul>");
	for(let i = 0;i < dictm.length;i++){
		var ulx_li = $('<li class="centerx_menu_item items_root"></li>');
		var item_childs = createEleAddClass("div","item-childs");
		var item_title = generateItemTitle(dictm[i].name,dictm[i].icoClass);
		
		var childs = dictm[i].child;
		if(childs.length>0){
			item_title.parents = ulx_li;
			item_title.onclick = show_child;
			
			var ulxtemp = document.createElement('ul');
			for(let i = 0;i < childs.length;i++){
				var ulx_litemp = createEleAddClass("li","centerx_menu_item");
				var item_titletemp = generateItemTitle(childs[i].name,childs[i].icoClass);
				item_titletemp.url = childs[i].url;
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
				gotoUrl(dictm[i].url);
			}
		}
		ulx_li.append(item_title);
		ulx_li.append(item_childs);
		ulx.append(ulx_li);
	}
	$(ElementIdName)[0].getElementsByClassName('centerx_menu')[0].appendChild(ulx[0]);
	myScroll.c.refresh();
}
function setMaxHeight(){
	let items_rootList = ulx.find('.items_root');
	for (let i = 0; i < items_rootList.length; i++) {
		let childCount = $(items_rootList[i]).find('li').length;
		items_rootList[i].show = true;
		setTimeout(function(){
			$(items_rootList[i])
			.css(
				'max-height',
				(childCount+1)*($(items_rootList[i])
					.find('.item-title')[0]
						.offsetHeight)+'px'
			);
			myScroll.c.refresh();
		},500);
	}
}
function show_child(){
	if(!myScroll.c.click) return;
	let childCount = this.parents.find('li').length;
	this.parents[0].show = !this.parents[0].show;
	let parents = this.parents;
	setTimeout(function(){
		if(parents[0].show){
			parents
			.css(
				'max-height',
				(childCount+1)*($(parents[0])
					.find('.item-title')[0]
						.offsetHeight)+'px'
			);
		}
		else{
			parents
			.css(
				'max-height',
				($(parents[0])
					.find('.item-title')[0]
						.offsetHeight)+'px'
			);
		}
		myScroll.c.refresh();
	},500);
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