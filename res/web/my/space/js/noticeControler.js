(() =>{
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
						<div class="mySpaceNotice-item-releaseTime">发布时间: '+new dateInterval(this.dict.dateTime).judgeTime()+'</div>\
					</div>\
				</div>');
			this.$.find('.mySpaceNotice-item-releaseTime').attr('title',this.dict.dateTime);
				
			this.$tag = $('<div class="mySpaceNotice-item-tag"></div>');
			this.$.find('.mySpaceNotice-item-top')
			.append(this.$tag.clone().html(this.tagNameList[this.dict.kindNum]));
			
			if(this.dict.message)
				this.$.find('.mySpaceNotice-item-top')
				.append(this.$tag.clone().html(this.dict.message));
			if(this.dict.isView){
				this.$.find('.mySpaceNotice-item-viewNum i').css('color','#00AAFF');
			}
			this.$.find('.mySpaceNotice-item-content').click(function(){
				content.check();
			});
		}
		check(){
			var content = this;
			if(this.dict.isView){
					Notiflix.Report.Info(
					content.dict.title,
					content.dict.content,
					'已查阅');
			}
			else{
				Notiflix.Confirm.Init({rtl:true,messageFontSize:"16px",titleFontSize:"20px", });
				Notiflix.Confirm.Show(
					content.dict.title,
					content.dict.content,
					'查阅', '点错了',
					function(){
						new myAjaxForm({
							url:'/notice/viewNotice?noticeId='+content.dict.id,
							method:"GET",
							isNormalAjax:true,//非form表单提交用true
							typeSpecialDeal:{
								'4':function(dictObj){//数据库错误
									console.log(dictObj);
								},
								'3101':function(dictObj){//该公告不存在
									console.log(dictObj);
								},
							},
							responseCorrect:function(dictObj){},
							responseError:function(dictObj){
								Notiflix.Notify.Success('已查阅');
							},
							failureEnd:function(dictObj){},
						}).ajax();
						
					}, function(){
					}
				);
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
	window.NoticeControler = NoticeControler;
})();