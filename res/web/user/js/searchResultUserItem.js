class searchResultUserItem{
	constructor(userdicx) {
		this.userdicx = userdicx;
		var maleBool = this.userdicx.maleBool;
		this.list = [
			{
				title:(maleBool?"男":"女"),
				kinds:"ico",
				backColor:"rgba(240,240,240,.8)",
				color:(maleBool?"blue":"red"),
				ico:(maleBool?"mars":"venus"),
				click: function(){
						console.log(1);
					},
			}
			,{
				title:this.userdicx.directionName + "方向",
				kinds:"img",
				backColor:"rgba(240,240,240,.8)",
				img:this.userdicx.directionImgName,
				click: function(){
					console.log(1);
				},
			}
			,{
				title:"最近一年签到次数为" + this.userdicx.markNumInYear + "次",
				kinds:"percentage",
				backColor:"rgba(230,230,230,.8)",
				percentage:(function(markNumInYear){
					if(markNumInYear <= 30*6){
						return markNumInYear/(30*6)*100;
					}
					else if(markNumInYear <= 60*6){
						return markNumInYear/(60*6)*100;
					}
					else if(markNumInYear <= 120*6){
						return markNumInYear/(120*6)*100;
					}
					else if(markNumInYear <= 240*6){
						return markNumInYear/(240*6)*100;
					}
					else if(markNumInYear <= 365*6){
						return markNumInYear/(365*6)*100;
					}
				})(this.userdicx.markNumInYear),
				waveColor:(function(markNumInYear){
					if(markNumInYear <= 30*6){
						return "rgb(241, 213, 165)";
					}
					else if(markNumInYear <= 60*6){
						return "rgb(249, 204, 17)";
					}
					else if(markNumInYear <= 120*6){
						return "rgb(129, 251, 184)";
					}
					else if(markNumInYear <= 240*6){
						return "rgb(20, 180, 83)";
					}
					else if(markNumInYear <= 365*6){
						return "rgb(180, 20, 83)";
					}
				})(this.userdicx.markNumInYear|0),
				click: function(){
					console.log(1);
				},
			},
		];
		this.generateEle();
	}
	generateEle(){
		var content = this;
		this.$ele = $('<div class="searchResultUserItem"></div>');
		
		this.HeadPortraitDIV = $('<div id="HeadPortrait'+this.userdicx.id+'" class="HeadPortraitDIV"></div>').append($('<img>'));
		$().loadedNode('#HeadPortrait'+this.userdicx.id, function(){
			getHeadPortrait($(this).find('img')[0],content.userdicx.id);
		});
		
		this.additionalInformation = $('<div class="additionalInformation"></div>')
		.append(this.HeadPortraitDIV).mouseover(function(){
			content.generateCircleList();
			$(this).unbind('mouseover');
		});
		
		this.$ele
		.append(new inMainUserData(this.userdicx).$ele)
		.append(this.additionalInformation);
	}
	generateCircleList(){
		var content = this;
		this.circleList = $('<div class="circle-list"></div>');
		this.HeadPortraitDIV.append(this.circleList);
		for(var i = 0;i < this.list.length;i++){
			this.circleList
			.append(
				new sideCircle(this.list[i],this.userdicx).$ele);
		}
		this.circleList.parent().hover(
		function(){
			var circles = content.circleList.children();
			for (var i = 0; i < circles.length; i++) {
				circles[i].style.left = "calc(50% - "+$(circles[i]).width()/2+"px + "+Math.sin(Math.PI/4*i)*75+"px)";
				circles[i].style.bottom = "calc(50% - "+$(circles[i]).height()/2+"px + "+Math.cos(Math.PI/4*i)*75+"px)";
			}
		},
		function(){
			var circles = content.circleList.children();
			for (var i = 0; i < circles.length; i++) {
				circles[i].style.left = "calc(50% - 20px)";
				circles[i].style.bottom = "calc(50% - 20px)";
			}
		});
	}
}
class inMainUserData{
	constructor(userdicx) {
	    this.userdicx = userdicx;
		this.generateEle();
	}
	generateEle(){
		this.$ele = $('\
		<div class="mainUserData">\
			<div class="mainUserData-item mainUserData-schoolId">\
				<div class="mainUserData-Label">校内ID</div>\
				<div class="mainUserData-Content"></div>\
			</div>\
			<div class="mainUserData-item mainUserData-nickName">\
				<div class="mainUserData-Label">名称</div>\
				<div class="mainUserData-Content"></div>\
			</div>\
			<div class="mainUserData-item mainUserData-laboratoryName">\
				<div class="mainUserData-Label">实验室</div>\
				<div class="mainUserData-Content"></div>\
			</div>\
			<div class="mainUserData-item mainUserData-professionalClass">\
				<div class="mainUserData-Label">专业班级</div>\
				<div class="mainUserData-Content"></div>\
			</div>\
		</div>\
		');
		this.$schoolId = this.$ele.find('.mainUserData-schoolId');
		this.$nickName = this.$ele.find('.mainUserData-nickName');
		this.$laboratoryName = this.$ele.find('.mainUserData-laboratoryName');
		this.$professionalClass = this.$ele.find('.mainUserData-professionalClass');
		
		this.$schoolId.find('.mainUserData-Content').text(this.userdicx.schoolID);
		this.$nickName.find('.mainUserData-Content').text(this.userdicx.nickName);
		this.$laboratoryName.find('.mainUserData-Content').text(this.userdicx.laboratoryName);
		this.$professionalClass.find('.mainUserData-Content').text(this.userdicx.professionalClass);
	}
}
class sideCircle{
	constructor(dicx,userdicx) {
		this.dicx = dicx;
		this.userdicx = userdicx;
		this.generateEle();
	}
	generateEle(){
		var content = this;
		this.$ele = $('<div id="side-circle'+this.userdicx.id+'" class="side-circle"></div>').css({
			position:"absolute",
			left: "calc(50% - 20px)",
			bottom: "calc(50% - 20px)",
			width: "40px",
			height: "40px",
			lineHeight: "40px",
			borderRadius: "50%",
			overflow: "hidden",
			textAlign: "center",
			backgroundColor: this.dicx.backColor,
			boxShadow: "0 0 10px gray",
			transition:".5s",
		});
		this.ele = this.$ele[0];
		
		this.$ele.attr('title',this.dicx.title);
		this.$ele.unbind('click').click(function(){
			content.dicx.click();
		});
		switch (this.dicx.kinds){
			case "percentage":
				var svg = $(
				'<svg version="1.1" class="wave">\
					<defs></defs>\
					<path d="">\
				</svg>').css({
					width: "100%",height: "100%",
				});
				var path = svg.find('path');
				this.$ele.append(svg);
				$().loadedNode('#side-circle'+this.userdicx.id,function(){
					path.wavify({
						container: ".side-circle",
						height: 60*(1 - content.dicx.percentage*0.01),
						bones: 3,
						amplitude: 5,
						color: content.dicx.waveColor,
						speed: .1,
					});
				});
				break;
			case "ico":
				var ico = $('<div class="fa fa-'+this.dicx.ico+' fa-1x"></div>')
				.css('color',this.dicx.color);
				this.$ele.append(ico);
				break;
			case "img":
				var img = $('<div class="'+this.userdicx.directionImgName+'Ico"></div>').css({
					width: "100%",height: "100%",
					backgroundSize: "100%",
				});
				this.$ele.append(img);
		}
	}
}
class userItemModelX01 extends itemModel {
	generateEle(dictx,index,root){
		return new searchResultUserItem(dictx).$ele[0];
	}
}