var testList = [
	{
		id:0,
		title:"欢迎！！！",
		kindNum:0,
		content:"欢迎大家来到人工智能实验室的实验室管理系统",
		authorId:49,
		dateTime:"2020-03-12 11:00:00",
		viewCount:0,
		isView:false,
	},
	{
		id:1,
		title:"实验室总消息",
		kindNum:0,
		content:'<a href="..\/">测试</a>',
		authorId:49,
		dateTime:"2020-03-12 12:00:00",
		viewCount:2,
		isView:false,
	},
	{
		id:2,
		title:"Java方向第一次会议",
		kindNum:1,
		content:"本周周二Java方向将举办开学来的第一次会议",
		authorId:49,
		dateTime:"2020-03-12 16:00:00",
		message:"Java",
		viewCount:1,
		isView:true,
	},
	{
		id:3,
		title:"F608卫生安排",
		kindNum:2,
		content:"本周开始进行轮值卫生打卡",
		authorId:49,
		dateTime:"2020-03-12 16:00:00",
		message:"F-608",
		viewCount:1,
		isView:true,
	},
];

class Notice{
	constructor(dict) {
		this.dict = dict;
		this.tagNameList = ['全体','方向','实验室'];
		this.generateEle();
	}
	generateEle(){
		var content = this;
		this.$ = $('\
		<div class="mySpaceNotice-item">\
			<div class="mySpaceNotice-item-top">\
				<div class="mySpaceNotice-item-title">'+this.dict.title+'</div>\
			</div>\
			<div class="mySpaceNotice-item-content">'
			+this.dict.content+
			'</div>\
			<div class="mySpaceNotice-item-bottom">\
				<div class="mySpaceNotice-item-author"><img></div>\
				<div class="mySpaceNotice-item-viewNum"><i class="fa fa-eye fa-1x"></i>'+this.dict.viewCount+'人已阅</div>\
				<div class="mySpaceNotice-item-releaseTime">发布时间: '+this.dict.dateTime+'</div>\
			</div>\
		</div>');
		this.$tag = $('<div class="mySpaceNotice-item-tag"></div>');
		this.$.find('.mySpaceNotice-item-top')
		.append(this.$tag.clone().html(this.tagNameList[this.dict.kindNum]));
		if(this.dict.message)
			this.$.find('.mySpaceNotice-item-top')
			.append(this.$tag.clone().html(this.dict.message));
		if(this.dict.isView){
			this.$.find('.mySpaceNotice-item-viewNum i').css('color','#00AAFF');
			this.$.find('.mySpaceNotice-item-content').click(function(){
				Notiflix.Report.Info(
				content.dict.title,
				content.dict.content,
				'已查阅');
			});
		}
		else{
			this.$.find('.mySpaceNotice-item-content').click(function(){
				Notiflix.Confirm.Init({rtl:true,messageFontSize:"16px",titleFontSize:"20px", });
				Notiflix.Confirm.Show(
					content.dict.title,
					content.dict.content,
					'查阅', '点错了',
					function(){
						Notiflix.Notify.Success('已查阅');
					}, function(){
				});
			});
		}
	}
	setHeadPortrait(){
		getHeadPortrait(this.$.find('.mySpaceNotice-item-author img')[0],this.dict.authorId);
	}
}
class NoticeControler{
	constructor(options) {
		this.dataList = options.dataList;
		this.$root = $('.mySpaceNotice .mid-content');
		this.appendNotices();
	}
	appendNotices(){
		for (let i = 0; i < this.dataList.length; i++) {
			let dict = this.dataList[i];
			let NoticeX = new Notice(dict);
			this.$root.append(NoticeX.$);
			NoticeX.setHeadPortrait();
		}
		this.$root.append($('<div style="height: 20px;width: 100%;position: relative;float: left;"></div>'));
	}
}
new NoticeControler({
	dataList:testList,
});