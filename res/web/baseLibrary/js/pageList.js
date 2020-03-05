class pageListHead {
	constructor(pre) {
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').css({
			position: "relative",
			width: "100%",height: "64px",
			borderBottom: "1px solid rgba(210,210,210)",
			transition: ".5s",
		});
		this.jqTitleEle = $('<div></div>').css({
			position: "absolute",
			left: "20%",
			width: "60%",height: "100%",
			color: "gray",
			lineHeight: "64px",
			fontSize: "26px",
			textAlign: "center",
			borderBottom: "1px solid rgba(210,210,210)",
			transition: ".5s",
		});
		this.ele = this.jqEle[0];
		this.titleEle = this.jqTitleEle[0];
		this.ele.appendChild(this.titleEle);
	}
	refresh(){
		this.titleEle.innerText = this.pre.title;
	}
}

class pageListContent {
	constructor(pre) {
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').css({
			position: "relative",
			paddingTop: "20px",paddingBottom: "20px",
			width: "100%",
			overflow:"hidden",
			borderBottom: "1px solid rgba(210,210,210)",
			transition: ".5s",
		});
		this.ele = this.jqEle[0];
	}
	refresh(){
		var root = this.pre;
		while(this.ele.childNodes.length>0) 
			this.ele.removeChild(this.ele.firstChild);
		for (let index = root.curPageNum*root.curPageCount;
			index < root.dictList.length &&
			index < (root.curPageNum+1)*root.curPageCount
			;index++) {
			const element = root.dictList[index];
			root.itemEleList[index+''] = root.itemModel.generateEle(element,index,root);
			this.ele.appendChild(root.itemEleList[index+'']);
		}
	}
}

class pageListFoot {
	constructor(pre) {
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').css({
			position: "relative",
			width: "100%",height: "32px",
			textAlign: "center",
			transition: ".5s",
		});
		this.ele = this.jqEle[0];
		this.appendChilds();
	}
	appendChilds(){
		this.childContros = 
		[this.ListBtn,
			this.showNumSelect] = 
		[new pageListListBtn(this),
			new pageListShowNumSelect(this)];
		for (let index = 0; index < this.childContros.length; index++) {
			const element = this.childContros[index];
			this.ele.appendChild(element.ele);
		}
	}
	refresh(){
		this.ListBtn.refresh();
		// this.showNumSelect.refresh();
	}
}
class pageListListBtn{
	constructor(pre) {
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		let root = this.pre.pre;
		this.jqEle = $('<div></div>').css({
			display: "inline-block",
			paddingLeft: "10px",paddingRight: "10px",
			minWidth: "32px",
			height: "100%",
			transition: ".5s",
		});
		this.jqWraperEle = $('<div></div>').css({
			position: "relative",float: "left",
			top: "8px",
			marginLeft: "8px",marginRight: "8px",
			height: "16px",maxWidth:"160px",
			overflow:"hidden",
			transition: ".5s",
		});
		this.jqLeftEle = $('<div></div>').css({
			position: "relative",float: "left",
			top: "8px",
			width: "16px",height: "16px",
			overflow: "hidden",
			transition: ".5s",
		});
		this.jqRightEle = this.jqLeftEle.clone();
		
		this.jqLefBtntEle = $('<div></div>').css({
			position: "relative",
			width: "16px",height: "16px",
			backgroundColor: "rgba(50,140,255,.8)",
			transform: "rotateZ(45deg)",
			transition: ".5s",
		});
		this.jqRightBtnEle = this.jqLefBtntEle.clone();
		this.jqLefBtntEle.css({left:"10px"})
		.click(function () {
			root.curPageNum -= 1;
			root.refresh();
		});
		this.jqRightBtnEle.css({right:"10px"})
		.click(function () {
			root.curPageNum += 1;
			root.refresh();
		});

		this.jqCenterEle = $('<div></div>').css({
			position: "relative",
			left:"0",
			height: "100%",
			transition: ".5s",
		});
		this.circle = $('<div></div>').css({
			position: "relative",float: "left",
			top: "10%",
			marginLeft: "2.6px",marginRight: "2.6px",
			width:"12.8px",height: "80%",
			borderRadius: "50%",
			boxShadow: "0 0 5px gray",
			userSelect: "none",
			color: "dimgray",
			fontSize: "1px",lineHeight: "12px",textAlign: "center",
			backgroundColor: "rgba(235,235,235,.8)",
			transition: ".5s",
		});
		{
			this.ele = this.jqEle[0];
			this.wraperEle = this.jqWraperEle[0];
			this.leftEle = this.jqLeftEle[0];
			this.rightEle = this.jqRightEle[0];
			this.leftBtnEle = this.jqLefBtntEle[0];
			this.rightBtnEle = this.jqRightBtnEle[0];
			this.centerEle = this.jqCenterEle[0];
		}
		{
			this.ele.appendChild(this.leftEle);
			this.ele.appendChild(this.wraperEle);
			this.wraperEle.appendChild(this.centerEle);
			this.ele.appendChild(this.rightEle);
			
			this.leftEle.appendChild(this.leftBtnEle);
			this.rightEle.appendChild(this.rightBtnEle);
		}
	}
	refresh(){
		let root = this.pre.pre;
		var pageNum = Math.ceil(root.dictList.length / root.curPageCount);
		
		this.jqCenterEle.css({width:pageNum*18+"px"});
		
		while(this.centerEle.childNodes.length>0) 
			this.centerEle.removeChild(this.centerEle.firstChild);
		for (let index = 0; index < pageNum; index++) {
			var curCss = {};
			if(index===root.curPageNum) curCss = {
				backgroundColor:"rgba(35, 169, 242,.8)",
				color:"rgba(255, 255, 255,.8)",
			}
			this.centerEle.appendChild(this.circle
				.clone().css(curCss)
				.click(function(){
					root.curPageNum = index;
					root.refresh();
				})
				.text(index+1)[0]);
		}
		
		this.leftBtnEle.style.display = "none";
		this.rightBtnEle.style.display = "none";
		if(root.curPageNum===0){
			this.jqCenterEle.css({left:"0px"});
			this.leftBtnEle.style.display = "none";
			if(pageNum>1)
				this.rightBtnEle.style.display = "block";
		} else if(root.curPageNum<pageNum-1){
			this.jqCenterEle.css({left:"0px"});
			if(root.curPageNum>2)
				this.jqCenterEle.css({left:"-"+(root.curPageNum-3)*18+"px"});
			this.leftBtnEle.style.display = "block";
			this.rightBtnEle.style.display = "block";
		}else{
			this.leftBtnEle.style.display = "block";
			this.rightBtnEle.style.display = "none";
		}
	}
}
class pageListShowNumSelect{
	constructor(pre){
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		let root = this.pre.pre;
		this.jqEle = $('<div></div>').css({
			position: "absolute",
			right: "16px",top: "3px",
			width: "130px", height: "24px",
			transition: ".5s",
		});
		this.jqSelectEle = $('<select></select>').css({
			border: "none",outline: "none",
			backgroundColor: "skyblue",
			borderRadius: "8px",
			paddingLeft:"4%",
			width: "96%",height: "100%",
		}).change(function(){
			root.curPageNum = 0;
			root.curPageCount = root.pageCountList[this.selectedIndex];
			root.refresh();
		});
		this.ele = this.jqEle[0];
		this.selectEle = this.jqSelectEle[0];
		this.ele.appendChild(this.selectEle);

		// let root = this.pre.pre;
		while(this.selectEle.childNodes.length>0) 
			this.selectEle.removeChild(this.selectEle.firstChild);
		for (let index = 0; index < root.pageCountList.length; index++) {
			const element = root.pageCountList[index];
			this.selectEle.appendChild($('<option></option>')
			.val(element)
			.text("每页"+element+"个")[0]);
		}
	}
}

class pageListControler{
	constructor(options) {
		this.width = "100%";
		this.title = options.title || "None";
		this.pageCountList = options.pageCountList || [2,4,6,8,10];
		this.curPageNum = 0;
		this.curPageCount = this.pageCountList[0];
		this.itemModel = options.itemModel || null;
		this.dictList = options.dictList || [];
		this.itemEleList = {};
		this.generateEle();
		this.appendChilds();
		this.refresh();
	}
	generateEle(){
		this.jqEle = $('<div></div>').css({
			width: "100%",
			transition: ".5s",
		});
		this.jqEleWraper = $('<div></div>').css({
			position: "relative",
			backgroundColor: "rgba(250,250,250)",
			border: "1px solid rgba(210,210,210)",
			boxShadow: "0 0 10px gainsboro",
			transition: ".5s",
		});
		this.ele = this.jqEle[0];
		this.eleWraper = this.jqEleWraper[0];
		this.ele.appendChild(this.eleWraper);
	}
	appendChilds(){
		this.childContros = 
		[this.head,
			this.content,
			this.foot] = 
		[new pageListHead(this),
			new pageListContent(this),
			new pageListFoot(this)];
		for (let index = 0; index < this.childContros.length; index++) {
			const element = this.childContros[index];
			if(index===0 && this.title === "None") continue;
			this.eleWraper.appendChild(element.ele);
		}
	}
	refresh(){
		this.jqEleWraper.css({
			left: "calc(50% - "+this.width/2+"px)",
			width: this.width + "px",
		});
		this.head.refresh();
		this.content.refresh();
		this.foot.refresh();
	}
	getItemByIndex(index){
		return this.itemEleList[index+''];
	}
	updataDictList(dictList){
		this.dictList = dictList;
		this.curPageNum = 0;
		this.refresh();
	}
}

class itemModel{
	constructor(){}
	generateEle(dictx,index,root){
	}
}
// window.onload = function(){
// 	contro = new pageListControler({
// 		title:"用户信息",
// 		width:800,
// 		pageCountList:[2,4,6,8,10],
// 		itemModel:new itemModel(),
// 		dictList:[
// 			{},{},{},
// 			{},{},{},
// 			{},{},{},
// 			{},{},{},
// 			{},{},{},
// 		],
// 	});
// 	$('.main')[0].appendChild(contro.ele);
// }