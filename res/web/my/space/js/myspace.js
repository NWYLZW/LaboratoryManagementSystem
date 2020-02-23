function loadEnd(){
	$('.mark').click(function(){
		new myAjax({
			url:"../../mark/",
			method:"POST",
			success:function(result){
				var JSONObject = JSON.parse(result);
				switch (JSONObject.type){
				case -2001:
					dialog({
						title: '信息',
						content: JSONObject.content,
						padding: '40px',
						drag: true,
						time:2,
					}).show();
					$('.mark img')[0].src = "../../my/space/img/markSuccess.png";
					break;
				default:
					dialog({
						title: '错误',
						content: JSONObject.content,
						padding: '40px',
						drag: true,
						time:2,
					}).show();
					break;
				}
			},
			failure:function(e){
				console.log(e);	
			}
		}).ajax();
	});
	var userMarkDict = {
		today:"",
		userMarkList:[],
	}
	userMarkDict.today = 2020+'-'+2+'-'+23;
	userMarkDict.today = (Math.round(Math.random()*100)+1950)+'-'+(Math.round(Math.random()*11)+1)+'-'+Math.round(Math.random()*25);
	for (var i = 0; i < 365; i++) {
		userMarkDict.userMarkList.push({
			markNum:Math.round(Math.random()*6),
			// markNum:i,
		});
	}
	$('.main .top .top-left')[0].appendChild(
		new yearCalendar(userMarkDict,
			16,2,
			[
				"rgb( 215, 215, 215)",
				"rgb( 172, 242, 213)",
				"rgb( 172, 242, 213)",
				"rgb( 127, 209, 168)",
				"rgb( 73 , 155, 114)",
				"rgb( 73 , 155, 114)",
				"rgb( 37 , 119, 78 )",
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
				marginLeft:"20px",
			}).ele
		);
	userMarkDict.userMarkList.splice(0, userMarkDict.userMarkList.length);
	
	var yearCalendarScroll = new IScroll('.main .top .top-left', {
		scrollX: true,
		scrollY: false,
		mouseWheel: true,
		scrollbars: true,
	});
	var interval = setInterval(function() {
		if(!this.count){
			this.count = 0;
		}
		if(this.count == 10){
			window.clearInterval(interval);
		}else this.count++;
		yearCalendarScroll.refresh();
	}, 500);
	window.addEventListener('resize',function(){
		yearCalendarScroll.refresh();
	});
	new response("../my/space",640,1000,"main").setEndFunction(function(){
		setTimeout(function() {
			yearCalendarScroll.refresh();
		}, 500);
	}).start();
}
loadEnd();