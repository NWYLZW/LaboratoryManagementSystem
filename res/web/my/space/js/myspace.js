function initMark() {
	$('.mark').click(function() {
		new myAjax({
			url: "../../mark/",
			method: "POST",
			success: function(result) {
				var JSONObject = JSON.parse(result);
				switch (JSONObject.type) {
					case -2001:
						Notiflix.Report.Success(
							'信息',
							JSONObject.content,
							'确认',
							function() {
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
							function() {
								$('.mark img')[0].src = "../../my/space/img/mark.png";
							});
						break;
				}
			},
			failure: function(e) {
				console.log(e);
			},
			always: function(jqXHR) {
				// console.log(jqXHR);
			}
		}).ajax();
	});
}
(() => {
	var yearCalendarX = null;
	window.yearCalendarX = yearCalendarX;

	function initScroll() {
		var yearCalendarScroll = new IScroll('.main .top .top-left', {
			scrollX: true,
			scrollY: false,
			mouseWheel: true,
			scrollbars: true,
		});
		var interval = setInterval(function() {
			if (!this.count) {
				this.count = 0;
			}
			if (this.count == 10) {
				window.clearInterval(interval);
			} else this.count++;
			yearCalendarScroll.refresh();
		}, 500);
		window.addEventListener('resize', function() {
			yearCalendarScroll.refresh();
		});
		new response("../my/space", 640, 1200, "main").start();
	}

	initMark();
	getMyMarkList($('.main .top .top-left')[0], initScroll);

	Notiflix.Block.Pulse('.mySpaceNotice', 'Please wait...');
	new myAjax({
		url:"/notice/getNotices",
		method:"GET",
		success:function(result){
			Notiflix.Block.Remove('.mySpaceNotice', 500);
			new NoticeControler({
				dataList: JSON.parse(result),
			});
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
	
	Notiflix.Block.Pulse('.messageBoard', 'Please wait...');
	new myAjax({
		url:"/message/leave/get?page="+'1',
		method:"GET",
		success:function(result){
			new generatePage({
				dataLDict: JSON.parse(result),
			});
			new commentPage({
				dataLDict: JSON.parse(result),
			},-1).showCommentPage();
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
})();
