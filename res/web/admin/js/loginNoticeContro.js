class backImage {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			position: "relative",
			float: "left",
			width: "200px",
			height: "180px",
			backgroundColor: "rgba(0,0,0,.8)",
		});
		this.ele = this.jqEle[0];
		this.backImage = $('<div></div>').
		css({
			float: "left",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			filter:"alpha(opacity=80)",mozOpacity:"0.8",opacity:"0.80",
			backgroundSize: "100%",
			width: "100%",height: "100%",
			backgroundImage: "url(../user/img/rotation/"+this.dictx.backgroundImageSrc+")",
		})[0];
		this.ele.appendChild(this.backImage);
		this.pencilIco = $("<div class='fa fa-inverse fa-pencil fa-1_5x'></div>").
		css({
			float: "right",
			display: "none",
			cursor: "pointer",
		})[0];
		this.backImage.appendChild(this.pencilIco);
	}
	getPencilIco(){
		return this.pencilIco;
	}
}

class mid {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			position: "relative",
			float: "left",
			width: "calc(100% - 400px)",
			height: "180px",
		});
		this.ele = this.jqEle[0];
		this.midTop = new midTop(this.dictx);
		this.ele.appendChild(this.midTop.ele);
		this.midButtom = new midButtom(this.dictx);
		this.ele.appendChild(this.midButtom.ele);
	}
	getTitle(){
		return this.midTop.title;
	}
	getInputTitle(){
		return this.midTop.inputTitle;
	}
	getContent(){
		return this.midButtom.content;
	}
	getTextereaContent(){
		return this.midButtom.textereaContent;
	}
}
class midTop {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			width: "100%",
			height: "30%",
		});
		this.ele = this.jqEle[0];
		this.title = $('<h4></h4>').
		css({
			paddingLeft: "20px",
			lineHeight: "54px",
			color: "grey",
		})[0];
		this.inputTitle = $('<input></input>').
		css({
			position: "relative",
			top: "calc(50% - 18px)",
			paddingLeft: "20px",
			height: "36px",
			lineHeight: "36px",
			color: "grey",
			display: "none",
			border: "black 1px solid",
		})[0];
		this.ele.appendChild(this.title).textContent = this.dictx.title;
		this.ele.appendChild(this.inputTitle).value = this.dictx.title;
	}
}
class midButtom {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			width: "100%",
			height: "70%",
		});
		this.ele = this.jqEle[0];
		this.content = $('<div></div>').
		css({
			width: "88%",
			height: "calc(80% - 10px)",
			marginLeft: "1%",
			marginRight: "1%",
			paddingTop: "10px",
			paddingLeft: "5%",
			paddingRight: "5%",
			color: "black",
			backgroundColor: "rgba(230,230,230,.8)",
		})[0];
		this.textereaContent = $('<textarea></textarea>').
		css({
			width: "88%",
			height: "calc(80% - 10px)",
			marginLeft: "1%",
			marginRight: "1%",
			paddingTop: "10px",
			paddingLeft: "5%",
			paddingRight: "5%",
			color: "black",
			backgroundColor: "rgba(230,230,230,.8)",
			display: "none",
		})[0];
		this.ele.appendChild(this.content).textContent = this.dictx.content;
		this.ele.appendChild(this.textereaContent).placeholder = this.dictx.content;
		
		this.ele.appendChild($('<div></div>').
		css({
			float: "left",
			width: "auto",
			height: "20%",
			paddingLeft: "5%",
			paddingRight: "5%",
			color: "gray",
		})[0]).textContent = this.dictx.authorId;
		this.ele.appendChild($('<div></div>').
		css({
			float: "right",
			width: "auto",
			height: "20%",
			paddingLeft: "5%",
			paddingRight: "5%",
			color: "gray",
		})[0]).textContent = this.dictx.date;
	}
}

class right {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			position: "relative",
			float: "left",
			width: "200px",
			height: "180px",
		});
		this.ele = this.jqEle[0];
		this.rightLeft = new rightLeft(this.dictx);
		this.ele.appendChild(this.rightLeft.ele);
		this.rightRight = new rightRight(this.dictx);
		this.ele.appendChild(this.rightRight.ele);
	}
	getEditIco(){
		return this.rightRight.editIco;
	}
	getEditor(){
		return this.rightRight.editor;
	}
	getRightRight(){
		return this.rightRight.ele;
	}
}
class rightLeft {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			position: "relative",
			top: "calc(50% - 30px)",
			float: "left",
			width: "60px",
			height: "60px",
		});
		this.ele = this.jqEle[0];
		this.showDiv = ($('<div></div>')
		.css({
			width: "100%",
			height: "50%",
			lineHeight: "30px",
			textAlign:"center",
			color: "gray",
		}));
		this.ele.appendChild(this.showDiv[0]);
		if(this.dictx.isShow){
			this.showDiv[0].textContent = "展示";
			this.circleImg = $('<div class="fa fa-dot-circle-o fa-1_5x" style="color: lightgreen;"></div>');
		}
		else{
			this.showDiv[0].textContent = "不展示";
			this.circleImg = $('<div class="fa fa-circle-o fa-1_5x" style="color: gray;"></div>');
		}
		
		this.circleImg[0].show = this.dictx.isShow;
		this.ele.appendChild(this.circleImg.css({
			width: "100%",
			height: "50%",
			textAlign:"center",
			cursor: "pointer",
		})[0]);
	}
	canClick(can){
		if(can){
			var thisCircleImg = this.circleImg[0];
			var thisShowDiv = this.showDiv[0];
			this.circleImg[0].onclick = function() {
				if(!(this.show)){
					thisShowDiv.textContent = "展示";
					thisCircleImg.className = "fa fa-dot-circle-o fa-1_5x";
					thisCircleImg.style.color = "lightgreen";
				}
				else{
					thisShowDiv.textContent = "不展示";
					thisCircleImg.className = "fa fa-circle-o fa-1_5x";
					thisCircleImg.style.color = "gray";
				}
				this.show = !this.show;
			}
		}
		else{
			this.circleImg[0].onclick = function() {};
		}
	}
}
class rightRight {
	constructor(dictx) {
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			float: "left",
			width: "calc(100% - 60px)",
			height: "100%",
			userSelect:"none",
		});
		this.ele = this.jqEle[0];
		this.editIco = ($('<div class="fa fa-edit fa-4x"></div>').
		css({
			height: "70%",
			marginLeft: "38px",
			lineHeight: "126px",
		})
		)[0];
		this.ele.appendChild(this.editIco);
		this.editor = ($('<div></div>').
		css({
			width: "100%",
			height: "30%",
			fontSize: "20px",
			textAlign: "center",
			cursor: "pointer",
		})
		)[0];
		this.ele.appendChild(this.editor).textContent = "编辑";
	}
}

class deleteBtn {
	constructor(dictx,father) {
		this.dictx = dictx;
		this.father = father || null;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div class="delete-btn"></div>').
		css({
			position: "absolute",
			top: "-15px",
			right: "-15px",
			width: "30px",
			height: "30px",
			backgroundImage: "url(../baseLibrary/img/ico/close.png)",
			backgroundSize: "100% 100%",
			cursor: "pointer",
		});
		this.ele = this.jqEle[0];
		// if(this.father){
		// 	var eleFather = this.father.ele;
		// 	this.ele.onclick = function(){
		// 		eleFather.remove();
		// 	}
		// }
	}
}
class loginNoticeInfo{
	constructor(dictx) {
		this.statu = "normal";
		this.dictx = dictx;
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			position: "relative",
			left: "calc(50% - 400px)",
			marginTop: "20px",
			width: "800px",
			height: "180px",
			backgroundColor: "rgba(240,240,240,.8)",
			boxShadow: "0 0 10px gray",
		});
		this.ele = this.jqEle[0];
		this.init();
	}
	init(){
		this.backImage = new backImage(this.dictx);
		this.ele.appendChild(this.backImage.ele);
		this.mid = new mid(this.dictx);
		this.ele.appendChild(this.mid.ele);
		this.right = new right(this.dictx);
		this.ele.appendChild(this.right.ele);
		this.deleteBtn = new deleteBtn(this.dictx,this);
		this.ele.appendChild(this.deleteBtn.ele);
		
		var ThisloginNoticeInfo = this;
		this.right.getRightRight().onclick = function(){
			ThisloginNoticeInfo.statu = "edite";
		}
	}
	set statu(value) {
		switch (value){
			case "edite":
				var thisBackImage = this.backImage;
				var thisRight = this.right;
				var thisMid = this.mid;
				thisBackImage.getPencilIco().style.display = "block";
				thisRight.getEditIco().className = "fa fa-save fa-4x";
				thisRight.getEditor().textContent = "提交";
				thisRight.rightLeft.canClick(true);
				thisMid.getTitle().style.display = "none";
				thisMid.getInputTitle().style.display = "block";
				thisMid.getContent().style.display = "none";
				thisMid.getTextereaContent().style.display = "block";
				break;
			default:
				break;
		}
	}
}

class loginNoticeContro {
	constructor(dictx) {
		var contex = this;
		this.loginNoticeInfoList = [];
		this.dictx = dictx;
		this.jqEle = $('.loginNoticeContro');
		this.ele = this.jqEle[0];
		this.addBtnEle = $('.loginNoticeContro #addBottonWrraper .addBotton')[0];
		
		this.initFormOption();
		// 获取了delLoginNotice
		this.delLoginNotice = $("#delLoginNotice");
		// 阻止本来的submit点击事件
		this.delLoginNotice.submit(function(){
			// 传入delLoginNoticeOption配置
			$(this).ajaxSubmit(contex.delLoginNoticeOption);
			// 阻止本来的submit点击事件的页面跳转
			return false;
		});
		
		this.appendAddButtonClickListener();
		for (var i = 0; i < this.dictx.length; i++) {
			var loginNoticeInfoX = new loginNoticeInfo(this.dictx[i]);
			// 初始化每个loginNoticeInfoX的提交事件
			// 删除编辑
			this.initAjax(loginNoticeInfoX);
			this.loginNoticeInfoList.push(loginNoticeInfoX);
			this.ele.appendChild(loginNoticeInfoX.ele);
		}
	}
	initAjax(loginNoticeInfoX){
		// var contex = this;
		var delLoginNoticeTemp = this.delLoginNotice[0];
		loginNoticeInfoX.deleteBtn.ele.onclick = function(){
			// contex.delResponse.delLoginNoticeInfoX = loginNoticeInfoX;
			// delLoginNoticeTemp.getElementsByClassName('id')[0].value = loginNoticeInfoX.dictx.id;
			delLoginNoticeTemp.getElementsByClassName('submit')[0].click();
			
			Interval = setInterval(function(){
				if(this.isSuccess){
					clearInterval(Interval);
					Interval = null;
					loginNoticeInfoX.remove();
				}
			},100);
			Interval.isSuccess = false;
		}
	}
	// 初始化提交表单参数
	initFormOption(){
		this.delLoginNoticeOption = { 
			// 提交前函数 false则不提交
			beforeSubmit: function(formData, jqForm, options){return true;},
			// 提交成功的
			success: this.delResponse,
			timeout: 3000,
		};
	}
	delResponse(data){
		var JSONObject = JSON.parse(data);
		console.log(JSONObject);
		if(JSONObject.type == -3001){
			// this.delLoginNoticeInfoX.remove();
			Interval.isSuccess = true;
		}
		else{
			alert("删除失败");
		}
	}
	appendAddButtonClickListener(){
		var father = this;
		this.addBtnEle.onclick = function(){
			var loginNoticeInfoX = new loginNoticeInfo();
			father.loginNoticeInfoList.push(loginNoticeInfoX);
			father.appendChild(loginNoticeInfoX.ele);
		}
	}
}

var Interval = null;

new myAjax({
	url:"../notice/loginNotice",
	method:"POST",
	success:function(result){
		dictObj = JSON.parse(result);
		console.log(dictObj);
		new loginNoticeContro(dictObj);
	},
	failure:function(error){
		// console.log(error);
	},
	always:function(jqXHR){
		// console.log(jqXHR);
	}
}).ajax();
