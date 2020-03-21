var yearCalendarX = null;
function loadEnd(){
	initMark();
	getMyMarkList($('.main .top .top-left')[0],initScroll);
}
function initMark(){
	$('.mark').click(function(){
		new myAjax({
			url:"../../mark/",
			method:"POST",
			success:function(result){
				var JSONObject = JSON.parse(result);
				switch (JSONObject.type){
				case -2001:
					Notiflix.Report.Success(
					'信息',
					JSONObject.content,
					'确认',
					function(){
						$('.mark img')[0].src = "../../my/space/img/mark.png";
					});
					$('.mark img')[0].src = "../../my/space/img/markSuccess.png";
					yearCalendarX.mark();
					break;
				default:
					Notiflix.Report.Success(
					'错误',
					JSONObject.content,
					'确认',
					function(){
						$('.mark img')[0].src = "../../my/space/img/mark.png";
					});
					break;
				}
			},
			failure:function(e){
				console.log(e);	
			},
			always:function(jqXHR){
				// console.log(jqXHR);
			}
		}).ajax();
	});
}
function initScroll(){
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
	new response("../my/space",640,1200,"main").start();
}
loadEnd();