(()=>{
	class messageLeave {
		constructor(dict,container) {
			this.dict = dict;
			this.container = container;
			this.generateEle();
		}
		generateEle(){
			var content = this;
			var messageLeave$ = $('\
				<div class="receive-box">\
					<div class="message-box">\
						<div class="headPortrait"><img></div>\
						<div class="message-information">\
							<div class="userNameAndTag">\
								<div class="userName"></div>\
								<div class="tag"></div>\
							</div>\
							<div class="content"></div>\
							<div class="message-foot">\
								<div class="time"><i class="fa fa-clock-o fa-x"></i></div>\
								<div class="likeNum"><i class="fa fa-thumbs-o-up fa-x"></i></div>\
								<div class="commentNum"><i class="fa fa-comments-o fa-x"></i></div>\
								<div class="reply"><i class="fa fa-mail-reply fa-x">&nbsp;回复</i></div>\
								<div class="showElseInfoBtn"><i class="fa fa-ellipsis-h fa-x"></i></div>\
								<div class="else-info">\
									<div class="accuse"><i class="fa fa-flag fa-x">举报</i></div>\
									<div class="delete"><i class="fa fa-remove fa-x">删除</i></div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="comment-box">\
					</div>\
				</div>\
			');
			content.container[0].appendChild(messageLeave$[0]);
			getHeadPortrait(messageLeave$.find('.headPortrait img')[0],content.dict.authorId);
			messageLeave$.find('.userName').html(content.dict.authorName);
			messageLeave$.find('.tag').html(content.dict.tag);
			messageLeave$.find('.content').html(content.dict.content);
			messageLeave$.find('.time i').html('&nbsp;'+content.dict.dateTime);
			messageLeave$.find('.likeNum i').html('&nbsp;'+content.dict.likeNum);
			messageLeave$.find('.commentNum i').html('&nbsp;'+content.dict.replyMessages.length);
			if(content.dict.replyMessages.length)
				new messageLeave(content.dict.replyMessages[0],messageLeave$.find('.comment-box'));
			
			var showCommnetBtnState = false;
			messageLeave$.find('.commentNum').first().unbind('click').click(function(){
				if(showCommnetBtnState){
					var commentChildList = messageLeave$.find('.comment-box')[0].childNodes;
					for(var i = 1;i < content.dict.replyMessages.length;i++)
						messageLeave$.find('.comment-box')[0].removeChild(commentChildList[i]);
				}
				else{
					for(var i = 1;i < content.dict.replyMessages.length;i++)
						new messageLeave(content.dict.replyMessages[i],messageLeave$.find('.comment-box'));
				}
				showCommnetBtnState = !showCommnetBtnState;
			});
			messageLeave$.find('.commentNum').hover(function(){
				messageLeave$.find('.commentNum i').first().html('&nbsp;'+'展开');
			},function(){
				messageLeave$.find('.commentNum i').first().html('&nbsp;'+content.dict.replyMessages.length);
			});
			
			var showElseInfoBtnState = false;
			messageLeave$.find('.showElseInfoBtn').unbind('click').click(function(){
				if(showElseInfoBtnState)
					messageLeave$.find('.else-info').css('display','block');
				else
					messageLeave$.find('.else-info').css('display','none');
				showElseInfoBtnState = !showElseInfoBtnState;
			});
			
			messageLeave$.find('.reply').unbind('click').click(function(){
				if(!(messageLeave$.find('.comment-editor')[0]))
					new commentEditor(messageLeave$);
			});
		}
	}
	class commentEditor{
		constructor(container) {
		    this.container = container;
			this.generateEle();
		}
		generateEle(){
			var content = this;
			var commentEditor$ = $('\
				<div class="comment-editor">\
					<textarea placeholder="写下你的评论"></textarea>\
					<div class="release-cancle">\
						<div class="cancle">取消</div>\
						<div class="release">发布</div>\
					</div>\
				</div>\
				');
			content.container[0].appendChild(commentEditor$[0]);
			
			commentEditor$.find('.cancle').unbind('click').click(function(){
				content.container[0].removeChild(commentEditor$[0]);
			});
			commentEditor$.find('.release').unbind('click').click(function(){
				
			});
		}
	}
	class generatePage{
		constructor(option) {
			this.container = $('.messageBoard .messageBoard-content');
			this.pageNum = Math.ceil(option.dataLDict.sumCount/5);
			this.generateEle();
		}
		generateEle(){
			var content = this;
			var commentPage$ = $('\
				<div class="comment-page-wrapper">\
					<div class="comment-page-content"></div>\
				</div>\
			');
			content.container.append(commentPage$);
			var pageList$ = $('\
					<div class="comment-page-list">\
						<div class="comment-page-foot">\
							<ul>\
							</ul>\
						</div>\
					</div>\
			');
			$('.messageBoard-foot').append(pageList$);
			var pageList = pageList$.find('ul');
			pageList[0].appendChild($('<li class="prePage"><</li>')[0]);
			for(var i = 0;i < content.pageNum;i++){
				if(i > 4 && content.pageNum > 6){
					pageList[0].appendChild($('<li class="pages">...</li>')[0]);
					pageList[0].appendChild($('<li class="pages"></li>').text(content.pageNum)[0]);
					break;
				}
				pageList[0].appendChild($('<li class="pages"></li>').text(i+1)[0]);
			}
			pageList[0].appendChild($('<li class="nextPage">></li>')[0]);
		}
	}
	class commentPage{
		constructor(option,currentPage) {
		    this.leaveMessages = option.dataLDict.leaveMessages;
			this.pageNum = Math.ceil(option.dataLDict.sumCount/5);
			this.currentPage = currentPage;
			this.goPage();
		}
		goPage(){
			var content = this;
			$('.nextPage').unbind('click').click(function(){
				if(content.currentPage >= 0 && content.currentPage < content.pageNum-1){
					content.currentPage++;
					content.showCommentPage();
				}
			});
			$('.prePage').unbind('click').click(function(){
				if(content.currentPage > 0 && content.currentPage <= content.pageNum){
					content.currentPage--;
					content.showCommentPage();
				}
			});
			$('.pages').unbind('click').click(function(){
				if(content.currentPage >= 0 && content.currentPage <= content.pageNum){
					if($('.pages')[$('.pages').index(this)].textContent !== '...'){
						content.currentPage = $('.pages')[$('.pages').index(this)].textContent-1;
						content.showCommentPage();
					}
				}
			});
		}
		showCommentPage(){
			const content = this;
			if($('.comment-page-content').html() != null && content.currentPage != -1){
				console.log(1);
				$('.comment-page-content').empty();
				new myAjax({
					url:"/message/leave/get?page="+(content.currentPage+1),
					method:"GET",
					success:function(result){
						let dataLDict = JSON.parse(result);
						content.leaveMessages = dataLDict.leaveMessages;
						content.pageNum = Math.ceil(dataLDict.sumCount/5);
						for(let i = 0;i < content.leaveMessages.length;i++)
							new messageLeave(content.leaveMessages[i],$('.comment-page-content'));
						
						console.log(result);
						console.log(dataLDict);
					},
					failure:function(error){},
					always:function(jqXHR){}
				}).ajax();
			}

			if(content.currentPage == -1){
				content.currentPage++;
				for(let i = 0;i < content.leaveMessages.length;i++)
					new messageLeave(content.leaveMessages[i],$('.comment-page-content'));
			}
			const page = $('.pages');
			if(content.pageNum > 7){
				if(content.currentPage > 3 && content.pageNum-content.currentPage > 3){
					page[1].textContent = '...';
					page[2].textContent = content.currentPage;
					page[3].textContent = content.currentPage+1;
					page[4].textContent = content.currentPage+2;
				}
				else if(content.currentPage < 4){
					page[1].textContent = 2;
					page[2].textContent = 3;
					page[3].textContent = 4;
					page[4].textContent = 5;
					page[5].textContent = '...';
				}
				if(content.currentPage == 1)
					page[1].textContent = 2;
				else if(content.currentPage == content.pageNum-4)
					page[5].textContent = content.pageNum-1;
			}
			
			for(var i = 0; i < page.length;i++){
				if(page[i].textContent-1 != content.currentPage){
					page[i].style.border = '#ffffff solid 1px';
					page[i].style.backgroundColor = '#ffffff';
				}
				else{
					page[i].style.border = '#00BFFF solid 1px';
					page[i].style.backgroundColor = '#f4f4f4';
					page[i].stylecolor = '#00BFFF';
				}
			}
		}
	}
	window.commentPage = commentPage;
	window.generatePage = generatePage;
})();
