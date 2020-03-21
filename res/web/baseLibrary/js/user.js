function getMyMarkList(calendarNode,endFun){
	new myAjax({
		url:"../../mark/myList",
		method:"POST",
		success:function(result){
			var JSONObject = JSON.parse(result);
			yearCalendarX = 
			new yearCalendar(JSONObject,
				16,2,
				[
					"rgb( 215, 215, 215)",
					"rgb( 172, 213, 242)",
					"rgb( 172, 213, 242)",
					"rgb( 127, 168, 209)",
					"rgb( 73 , 114, 155)",
					"rgb( 73 , 114, 155)",
					"rgb( 37 , 78 , 119)",
				],
				{
						'mouseover':function() {
							this.message = $('<div></div>').css({
								zIndex:"100000",
								position:"relative",
								left:"calc(50% - 70px)",top:"-38px",
								width:"140px",height:"36px",
								borderRadius:"6px",
								boxShadow:"0 0 2px gray",
								fontSize:"12px",textAlign:"center",
								color:"rgba(255,255,255,0)",
								backgroundColor:"rgba(50,50,50,0)",
								transition:".5s",
							});
							var message = this.message;
							setTimeout(function() {
								message.css({
									boxShadow:"0 0 10px gray",
									color:"rgba(240,240,240,1)",
									backgroundColor:"rgba(50,50,50,1)",
								});
							}, 100);
							this.message.html(
								this.userMark.markNum+"  marks on"+'<br/>'+
								this.userMark.date.format("D M d,Y")
								);
							this.appendChild(this.message[0]);
							this.style.borderRadius = "8px";
							this.style.boxShadow = "0 0 5px gray";
						},
						'mouseout':function() {
							this.message.remove();
							this.style.borderRadius = "0";
							this.style.boxShadow = "0 0 0 gray";
						},
					})
			.setCss({
				paddingLeft:"65px",
				paddingRight:"65px",
			});
			calendarNode.appendChild(yearCalendarX.ele);
			if(endFun) endFun();
		},
		failure:function(e){
			console.log(e);	
		},
		always:function(jqXHR){
			// console.log(jqXHR);
		}
	}).ajax();
}
function getMyData(callBack){
	new myAjax({
		url:"../my/data",
		method:"POST",
		success:function(result){
			callBack(JSON.parse(result));
		},
		failure:function(error){
			try{ 
				Notiflix.Report.Failure( 
				'获取用户信息失败',
				'出现了错误，请联系管理员',
				'关闭' );
			}catch(e){
				console.log(e);
				console.log('未加载Notiflix模块');
			}
		},
		always:function(jqXHR){}
	}).ajax();
}
function getMyHeadPortrait(imgNode){
	try{
		Notiflix.Block.Dots('.'+imgNode.parentNode.className);
	}catch(e){
		console.log(e);
		console.log('未加载Notiflix模块');
	}
	new ajaxGetFile({
		url:"../my/getHeadPortrait?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className,200);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = "../../baseLibrary/img/imgLoadError.png";
			Notiflix.Block.Remove('.'+imgNode.parentNode.className);
		},
		always:function(jqXHR){}
	}).ajax();
}
function getHeadPortrait(imgNode,userId){
	try{
		Notiflix.Block.Dots('.'+imgNode.parentNode.className);
	}catch(e){
		console.log(e);
		console.log('未加载Notiflix模块');
	}
	new ajaxGetFile({
		url:"../user/getHeadPortrait"+userId+"?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className,200);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = "../../baseLibrary/img/imgLoadError.png";
			Notiflix.Block.Remove('.'+imgNode.parentNode.className);
		},
		always:function(jqXHR){}
	}).ajax();
}
function getBackground(imgNode){
	try{
		Notiflix.Block.Dots('.'+imgNode.parentNode.className);
	}catch(e){
		console.log(e);
		console.log('未加载Notiflix模块');
	}
	new ajaxGetFile({
		url:"../my/getBackground?"+new Date().getTime(),
		method:"GET",
		success:function(result){
			var blob = result;
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			};
			imgNode.src = window.URL.createObjectURL(blob);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className);
		},
		failure:function(error){
			imgNode.onload = function(e) {
				window.URL.revokeObjectURL(imgNode.src);
			Notiflix.Block.Remove('.'+imgNode.parentNode.className,200);
			};
			imgNode.src = "../../baseLibrary/defaultBackgroundImage.png";
		},
		always:function(jqXHR){}
	}).ajax();
}