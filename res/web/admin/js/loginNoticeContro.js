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
		this.ele.appendChild($('<div></div>').
		css({
			float: "left",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			filter:"alpha(opacity=80)",mozOpacity:"0.8",opacity:"0.80",
			backgroundSize: "100%",
			width: "100%",height: "100%",
			backgroundImage: "url(../user/img/rotation/"+this.dictx.backgroundImageSrc+")",
		})[0]);
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
		this.ele.appendChild(new midTop(this.dictx).ele);
		this.ele.appendChild(new midButtom(this.dictx).ele);
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
		this.ele.appendChild($('<h4></h4>').
		css({
			paddingLeft: "20px",
			lineHeight: "54px",
			color: "grey",
		})[0]).textContent = this.dictx.title;
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
		this.ele.appendChild($('<div></div>').
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
		})[0]).textContent = this.dictx.content;
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
		this.ele.appendChild(new rightLeft(this.dictx).ele);
		this.ele.appendChild(new rightRight(this.dictx).ele);
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
		this.ele.appendChild(($('<div></div>').
		css({
			width: "100%",
			height: "50%",
			lineHeight: "30px",
			textAlign:"center",
			color: "gray",
		})
		)[0]).textContent = "展示";
		var circleImg;
		console.log(this.dictx);
		if(this.dictx.isShow)
			circleImg = $('<div class="fa fa-dot-circle-o fa-1_5x" style="color: lightgreen;"></div>');
		else
			circleImg = $('<div class="fa fa-circle-o fa-1_5x" style="color: gray;"></div>');
			
		this.ele.appendChild( 
		circleImg.css({
			width: "100%",
			height: "50%",
			textAlign:"center",
		})[0]);
	}
}
class rightRight {
	constructor(dictx) {
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div></div>').
		css({
			float: "left",
			width: "calc(100% - 60px)",
			height: "100%",
		});
		this.ele = this.jqEle[0];
		this.ele.appendChild(($('<div class="fa fa-edit fa-4x"></div>').
		css({
			height: "70%",
			marginLeft: "38px",
			lineHeight: "126px",
		})
		)[0]);
		this.ele.appendChild(($('<div></div>').
		css({
			width: "100%",
			height: "30%",
			fontSize: "20px",
			textAlign: "center",
		})
		)[0]).textContent = "编辑";
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
		});
		this.ele = this.jqEle[0];
		if(this.father){
			var eleFather = this.father.ele;
			this.ele.onclick = function(){
				eleFather.remove();
			}
		}
	}
}
class loginNoticeInfo{
	constructor(dictx) {
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
		this.ele.appendChild(new backImage(this.dictx).ele);
		this.ele.appendChild(new mid(this.dictx).ele);
		this.ele.appendChild(new right(this.dictx).ele);
		this.ele.appendChild(new deleteBtn(this.dictx,this).ele);
	}
}

class loginNoticeContro {
	constructor(dictx) {
		this.loginNoticeInfoList = [];
		this.dictx = dictx;
		this.jqEle = $('.loginNoticeContro');
		this.ele = this.jqEle[0];
		this.addBtnEle = $('.loginNoticeContro #addBottonWrraper .addBotton')[0];
		this.appendAddButtonClickListener();
		for (var i = 0; i < this.dictx.length; i++) {
			var loginNoticeInfoX = new loginNoticeInfo(this.dictx[i]);
			this.loginNoticeInfoList.push(loginNoticeInfoX);
			this.ele.appendChild(loginNoticeInfoX.ele);
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
	// 加到一个数组里面去管理
	// 新生成的loginInfo对象
	// 因为回头你要检查展示的个数
	// 最大展示的不能超过6个loginInfo
	// 最少不能少于俩个
	// 如果多于六个就不能show为真
	// 少于2个就不能show为假
	// 我先写在这
	// 回头你就知道了
}
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
