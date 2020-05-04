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

	var testList = [{
			id: 0,
			title: "欢迎！！！",
			kindNum: 0,
			content: "欢迎大家来到人工智能实验室的实验室管理系统",
			authorId: 49,
			dateTime: "2020-03-12 11:00:00",
			viewCount: 0,
			isView: false,
		},
		{
			id: 1,
			title: "实验室总消息",
			kindNum: 0,
			content: '<a href="..\/">测试</a>',
			authorId: 49,
			dateTime: "2020-03-12 12:00:00",
			viewCount: 2,
			isView: false,
		},
		{
			id: 2,
			title: "Java方向第一次会议",
			kindNum: 1,
			content: "本周周二Java方向将举办开学来的第一次会议",
			authorId: 49,
			dateTime: "2020-03-12 16:00:00",
			message: "Java",
			viewCount: 1,
			isView: true,
		},
		{
			id: 3,
			title: "F608卫生安排",
			kindNum: 2,
			content: "本周开始进行轮值卫生打卡",
			authorId: 49,
			dateTime: "2020-03-12 16:00:00",
			message: "F-608",
			viewCount: 1,
			isView: true,
		},
	];
	new NoticeControler({
		dataList: testList,
	});
	var testList1 = [{
		"sumCount": 3,
		"leaveMessages": [
			{
				"id": 14,
				"authorId": 54,
				"authorName": "测试",
				"isAnonymous": 1,
				"content": "测试数据",
				"dateTime": "2020-04-18",
				"isLike": false,
				"likeNum": 0,
				"replyMessages": [],
			},
			{
				"id": 10,
				"authorId": 54,
				"authorName": "测试",
				"isAnonymous": 0,
				"content": "再测试一下",
				"dateTime": "2020-04-18",
				"isLike": false,
				"likeNum": 0,
				"replyMessages": [],
			},
			{
				"id": 9,
				"authorId": 54,
				"authorName": "测试",
				"isAnonymous": 0,
				"content": "测试数据",
				"dateTime": "2020-04-18",
				"isLike": false,
				"likeNum": 0,
				"replyMessages": [{
						"id": 13,
						"authorId": 54,
						"authorName": "测试",
						"isAnonymous": 1,
						"content": "cillum Duis laborum reprehenderit fugiat",
						"dateTime": "2020-04-18",
						"isLike": false,
						"likeNum": 0,
						"replyMessages": [],
					}, {
						"id": 12,
						"authorId": 54,
						"authorName": "测试",
						"isAnonymous": 0,
						"content": "occaecat nostrud",
						"dateTime": "2020-04-18",
						"isLike": false,
						"likeNum": 0,
						"replyMessages": [],
					},
					{
						"id": 11,
						"authorId": 54,
						"authorName": "测试",
						"isAnonymous": 0,
						"content": "magna laborum",
						"dateTime": "2020-04-18",
						"isLike": false,
						"likeNum": 0,
						"replyMessages": []
					},
				],
			}
		]
	}];
	
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
