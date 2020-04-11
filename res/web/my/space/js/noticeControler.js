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
	window.NoticeControler = NoticeControler;
})();