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
		var backImage = this.backImage;
		this.pencilIco = $('<div class="fa fa-inverse fa-pencil fa-1_5x">\
		<input class="selectImage" type="file" name="backImage" style="display:none"/>\
		</div>').
		css({
			float: "right",
			display: "none",
			cursor: "pointer",
		})
		.click(
		function(){
			this.getElementsByClassName('selectImage')[0].click();
			this.getElementsByClassName('selectImage')[0].addEventListener('change',function(){
				var file = this.files[0];
				var type = file.type.split("/");
				if(type[0] != "image"){
					alert("请选择图片");
					return false;
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);  
				reader.onloadend = function(){
					var dataUrl = reader.result;
					backImage.style.backgroundImage = "url("+dataUrl+")";
				}
			});
		}
		)[0];
		this.backImage.appendChild(this.pencilIco);
	}
	getPencilIco(){
		return this.pencilIco;
	}
	getInputImage(){
		return this.pencilIco.getElementsByClassName('selectImage')[0];
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
			paddingLeft: "10px",
			height: "36px",
			lineHeight: "36px",
			color: "grey",
			display: "none",
			border: "black 1px solid",
		})[0];
		this.ele.appendChild(this.title).textContent = this.dictx.title;
		this.ele.appendChild(this.inputTitle).value = this.dictx.title;
	}
	getTitle(){
		return this.inputTitle.value;
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
		this.ele.appendChild(this.textereaContent).value = this.dictx.content;
		
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
	getContent(){
		return this.textereaContent.value;
	}
	getId(){
		return this.dictx.id;
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
	getEdit(){
		return [this.rightRight.editIco,this.rightRight.editor];
	}
	getSubmit(){
		return [this.rightRight.submitIco,this.rightRight.submit];
	}
	changeStatu(statu){
		this.rightRight.changeStatu(statu);
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
	getIsShow(){
		if(this.showDiv[0].textContent=="展示") return "True";
		else return "False";
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
		this.editIco = ($('<div class="fa fa-edit fa-4x"></div>').
		css({
			height: "70%",
			marginLeft: "38px",
			lineHeight: "126px",
		})
		);
		this.editor = ($('<div></div>').
		css({
			width: "100%",
			height: "30%",
			fontSize: "20px",
			textAlign: "center",
			cursor: "pointer",
		})
		.text("编辑")
		);
		
		this.submitIco = ($('<div class="fa fa-save fa-4x"></div>').
		css({
			display:"none",
			height: "70%",
			marginLeft: "38px",
			lineHeight: "126px",
		})
		);
		this.submit = ($('<div></div>').
		css({
			display:"none",
			width: "100%",
			height: "30%",
			fontSize: "20px",
			textAlign: "center",
			cursor: "pointer",
		})
		.text("提交")
		);
		this.ele = this.jqEle[0];
		this.ele.appendChild(this.editIco[0]);
		this.ele.appendChild(this.editor[0]);
		this.ele.appendChild(this.submitIco[0]);
		this.ele.appendChild(this.submit[0]);
	}
	changeStatu(statu){
		if(statu === "submit"){
			this.editIco.css({display:"none"});
			this.editor.css({display:"none"});
			this.submitIco.css({display:"block"});
			this.submit.css({display:"block"});
		}else if(statu === "edite"){
			this.editIco.css({display:"block"});
			this.editor.css({display:"block"});
			this.submitIco.css({display:"none"});
			this.submit.css({display:"none"});
		}
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
		this.right.getEdit()[0][0].onclick = function(){
			ThisloginNoticeInfo.statu = "edite";
		}
		this.right.getEdit()[1][0].onclick = function(){
			ThisloginNoticeInfo.statu = "edite";
		}
	}
	set statu(value) {
		switch (value){
			case "edite":
				var thisBackImage = this.backImage;
				var thisRight = this.right;
				var thisMid = this.mid;
				thisRight.changeStatu('submit');
				thisRight.rightLeft.canClick(true);
				
				thisBackImage.getPencilIco().style.display = "block";
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
		this.delLoginNotice = $("#delLoginNotice");
		this.delLoginNotice.submit(function(){
			$(this).ajaxSubmit(contex.delLoginNoticeOption);
			return false;
		});
		this.editLoginNotice = $("#editLoginNotice");
		this.editLoginNotice.submit(function(){
			$(this).ajaxSubmit(contex.editLoginNoticeOption);
			return false;
		});
		this.addLoginNotice = $("#addLoginNotice");
		this.addLoginNotice.submit(function(){
			$(this).ajaxSubmit(contex.addLoginNoticeOption);
			return false;
		});
		
		this.appendAddButtonClickListener();
		for (var i = 0; i < this.dictx.length; i++) {
			var loginNoticeInfoX = new loginNoticeInfo(this.dictx[i]);
			this.initAjax(loginNoticeInfoX);
			this.loginNoticeInfoList.push(loginNoticeInfoX);
			this.ele.appendChild(loginNoticeInfoX.ele);
		}
	}
	initAjax(loginNoticeInfoX){
		var delLoginNoticeTemp = this.delLoginNotice[0];
		loginNoticeInfoX.deleteBtn.ele.onclick = function(){
			delLoginNoticeTemp.getElementsByClassName('id')[0].value = loginNoticeInfoX.dictx.id;
			delLoginNoticeTemp.getElementsByClassName('submit')[0].click();
			Interval = new IntervalWrapper(
			function(){
				console.log(2);
				Interval = null;
				loginNoticeInfoX.ele.remove();
			},function(){});
		}
		
		var editLoginNoticeTemp = this.editLoginNotice[0];
		loginNoticeInfoX.right.getSubmit()[0][0].onclick = function(){
			editLoginNoticeTemp.appendChild(loginNoticeInfoX.backImage.getInputImage());
			editLoginNoticeTemp.getElementsByClassName('id')[0].value = loginNoticeInfoX.dictx.id;
			editLoginNoticeTemp.getElementsByClassName('title')[0].value = loginNoticeInfoX.mid.midTop.getTitle();
			editLoginNoticeTemp.getElementsByClassName('content')[0].value = loginNoticeInfoX.mid.midButtom.getContent();
			editLoginNoticeTemp.getElementsByClassName('isShow')[0].value = loginNoticeInfoX.right.rightLeft.getIsShow();
			editLoginNoticeTemp.getElementsByClassName('submit')[0].click();
		}
		loginNoticeInfoX.right.getSubmit()[1][0].onclick = function(){
			editLoginNoticeTemp.appendChild(loginNoticeInfoX.backImage.getInputImage());
			editLoginNoticeTemp.getElementsByClassName('id')[0].value = loginNoticeInfoX.dictx.id;
			editLoginNoticeTemp.getElementsByClassName('title')[0].value = loginNoticeInfoX.mid.midTop.getTitle();
			editLoginNoticeTemp.getElementsByClassName('content')[0].value = loginNoticeInfoX.mid.midButtom.getContent();
			editLoginNoticeTemp.getElementsByClassName('isShow')[0].value = loginNoticeInfoX.right.rightLeft.getIsShow();
			editLoginNoticeTemp.getElementsByClassName('submit')[0].click();
		}
	}
	initFormOption(){
		this.delLoginNoticeOption = { 
			beforeSubmit: function(formData, jqForm, options){return true;},
			success: this.delResponse,
			timeout: 3000,
		};
		this.editLoginNoticeOption = {
			beforeSubmit: function(formData, jqForm, options){return true;},
			success: this.editResponse,
			timeout: 3000,
		}
		this.addLoginNoticeOption = {
			beforeSubmit: function(formData, jqForm, options){return true;},
			success: this.addResponse,
			timeout: 3000,
		}
	}
	delResponse(data){
		var JSONObject = JSON.parse(data);
		console.log(JSONObject);
		if(JSONObject.type == -3001){
			Interval.isSuccess = true;
		}
		else{
			alert("删除失败");
		}
	}
	editResponse(data){
		var JSONObject = JSON.parse(data);
		console.log(JSONObject);
	}
	addResponse(data){
		var JSONObject = JSON.parse(data);
		console.log(JSONObject);
	}
	initAddAjax(loginNoticeInfoX){
		var addLoginNoticeTemp = this.addLoginNotice[0];
		loginNoticeInfoX.right.getSubmit()[0][0].onclick = function(){
			addLoginNoticeTemp.appendChild(loginNoticeInfoX.backImage.getInputImage());
			addLoginNoticeTemp.getElementsByClassName('title')[0].value = loginNoticeInfoX.mid.midTop.getTitle();
			addLoginNoticeTemp.getElementsByClassName('content')[0].value = loginNoticeInfoX.mid.midButtom.getContent();
			addLoginNoticeTemp.getElementsByClassName('isShow')[0].value = loginNoticeInfoX.right.rightLeft.getIsShow();
			addLoginNoticeTemp.getElementsByClassName('submit')[0].click();
		}
		loginNoticeInfoX.right.getSubmit()[1][0].onclick = function(){
			addLoginNoticeTemp.appendChild(loginNoticeInfoX.backImage.getInputImage());
			addLoginNoticeTemp.getElementsByClassName('title')[0].value = loginNoticeInfoX.mid.midTop.getTitle();
			addLoginNoticeTemp.getElementsByClassName('content')[0].value = loginNoticeInfoX.mid.midButtom.getContent();
			addLoginNoticeTemp.getElementsByClassName('isShow')[0].value = loginNoticeInfoX.right.rightLeft.getIsShow();
			addLoginNoticeTemp.getElementsByClassName('submit')[0].click();
		}
	}
	appendAddButtonClickListener(){
		var father = this;
		this.addBtnEle.onclick = function(){
			var loginNoticeInfoX = new loginNoticeInfo({
				title:"待添加标题",
				content:"待添加内容",
				backgroundImageSrc:"",
			});
			loginNoticeInfoX.statu = "edite";
			father.initAddAjax(loginNoticeInfoX);
			father.loginNoticeInfoList.push(loginNoticeInfoX);
			father.ele.insertBefore(loginNoticeInfoX.ele,father.ele.childNodes[4]);
		}
	}
}

function IntervalWrapper(successCallback,timeOutCallback){
	this.count = 0;
	this.isSuccess = false;
	var context = this;
	this.fun = setInterval(function(){
		context.count += 1;
		if(context.isSuccess){
			clearInterval(context.fun);
			successCallback();
		}
		if(context.count === 100){
			clearInterval(context.fun);
			timeOutCallback();
		}
	},100);
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
