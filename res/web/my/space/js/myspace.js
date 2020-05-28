function initMark() {
	$('.mark').click(function() {
		var curTime = new Date().getHours();//
		if((curTime > 7 && curTime < 12)||(curTime > 14 && curTime < 16)||(curTime > 18 && curTime < 22)){
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
		}
		else{
			Notiflix. Notify. Warning('此时不在打卡时间范围内');
		}
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
			new pageList({
				dataLDict: JSON.parse(result),
			});
			new turnPage({
				dataLDict: JSON.parse(result),
			},-1).showCommentPage();
		},
		failure:function(error){},
		always:function(jqXHR){}
	}).ajax();
	
	var dict = [
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title",
			"note":"note",
			"TAG":"TAG",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":true,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title1",
			"note":"note1",
			"TAG":"TAG1",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":true,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title2",
			"note":"note2",
			"TAG":"TAG2",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":true,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title3",
			"note":"note3",
			"TAG":"TAG3",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":false,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title3",
			"note":"note3",
			"TAG":"TAG3",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":true,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title3",
			"note":"note3",
			"TAG":"TAG3",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":true,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
		{
			"id":10001,
			"publishUser":{
				"id":1001,
			},
			"title":"title3",
			"note":"note3",
			"TAG":"TAG3",
			"HistoricalChanges":[
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
				["2020-01-01 00:00:00","修改了备注"],
			],
			"isSuccess":false,
			"isCollect":true,
			"isRemind":true,
			"remindTime": "2020-01-01 00:00:00",
		},
	]
	
	// Notiflix.Block.Pulse('.taskBoard', 'Please wait...');
	$('.taskBoard').prepend(new tasksearch(dict).generateEle());
	for(let i = 0;i < dict.length;i++)
		$('.task-box-wrapper')[0].appendChild(new taskLeave(dict[i]).generateEle()[0]);
})();
