(()=>{
	class messageLeave {
		constructor(dict,container) {
			this.dict = dict;
			this.container = container;
			this.generateEle();
			this.accuseAndDeleteMenu();
		}
		generateEle(){
			var content = this;
			var messageLeave$ = $(('\
				<div class="receive-box receive-box-'+content.dict.id+'">\
					<div class="message-box leaveMessage-'+content.dict.id+'">\
						<div class="headPortrait"><img></div>\
						<div class="message-information">\
							<div class="userNameAndTag">\
								<div class="userName"></div>\
								<div class="tag"></div>\
							</div>\
							<div class="reply-content"></div>\
							<div class="message-foot">\
								<div class="time"><i class="fa fa-clock-o fa-x"></i></div>\
								<div class="likeNum"><i class="fa fa-thumbs-o-up fa-x"></i></div>\
								<div class="commentNum"><i class="fa fa-comments-o fa-x"></i></div>\
								<div class="reply"><i class="fa fa-mail-reply fa-x">&nbsp;回复</i></div>\
								<div class="showElseInfoBtn"><i class="fa fa-ellipsis-h fa-x"></i></div>\
							</div>\
						</div>\
					</div>\
					<div class="comment-box">\
					</div>\
				</div>\
			').replace(/\t/g, "").replace(/\r/g, "").replace(/\n/g, ""));
			content.container[0].appendChild(messageLeave$[0]);
			
			getHeadPortrait(messageLeave$.find('.headPortrait img')[0],content.dict.authorId);
			messageLeave$.find('.userName').html(content.dict.authorName);
			messageLeave$.find('.tag').html(content.dict.tag);
			messageLeave$.find('.reply-content').html(content.dict.content);
			
			var time = new dateInterval(content.dict.dateTime).judgeTime();
			messageLeave$.find('.time i').html('&nbsp;'+time);
			messageLeave$.find('.time i').attr('title',content.dict.dateTime);
			
			messageLeave$.find('.likeNum i').html('&nbsp;'+content.dict.likeNum);
			if(content.dict.isLike)
				messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#00BFFF');
			else
				messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#808080');
			
			messageLeave$.find('.likeNum i').unbind('click').click(function(){
				new myAjaxForm({
					url:'/message/leave/like',
					data:{
						leaveMessageId:content.dict.id,
					},
					isNormalAjax:true,
					method:"POST",
					typeSpecialDeal:{
						'4':function(dictObj){
							// 数据库错误
						},
						'4001':function(dictObj){
							// 留言不存在
						}
					},
					responseCorrect:function(dictObj){
						if(dictObj.type===-6003){
							// 赞成功
							messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#00BFFF');
							messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').html('&nbsp;'+(++content.dict.likeNum));
						}
						else if(dictObj.type===-6004){
							// 取消赞成功
							messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#808080');
							messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').html('&nbsp;'+(--content.dict.likeNum));
							
							
						}else{}
					},
					responseError:function(){},
					failureEnd:function(){},
				}).ajax();
			});
			
			messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+content.dict.replyMessages.length);
			if(content.dict.replyMessages.length)
				new messageLeave(content.dict.replyMessages[0],messageLeave$.find('.comment-box'));
			
			if(content.dict.replyMessages.length > 1){
				var showCommnetBtnState = false;
				messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum').unbind('click').click(function(){
					if(showCommnetBtnState){
						var commentChildList = messageLeave$.find('.comment-box')[0].childNodes;
						for(let i = 1;i < content.dict.replyMessages.length;i++){
							messageLeave$.find('.comment-box')[0].removeChild(commentChildList[1]);
						}
						messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+'展开');
					}
					else{
						for(let i = 1;i < content.dict.replyMessages.length;i++){
							new messageLeave(content.dict.replyMessages[i],messageLeave$.find('.comment-box'));
						}
						messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+'收起');
					}
					showCommnetBtnState = !showCommnetBtnState;
				});
				messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum').hover(function(){
					if(!showCommnetBtnState)
						messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+'展开');
					else
						messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+'收起');
				},function(){
					messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+content.dict.replyMessages.length);
				});
			}
			
			var showElseInfoBtnState = false;
			messageLeave$.find('.leaveMessage-'+content.dict.id+' .showElseInfoBtn').unbind('click').click(function(){
				if(showElseInfoBtnState)
					messageLeave$.find('.leaveMessage-'+content.dict.id+' .else-info').css('display','block');
				else
					messageLeave$.find('.leaveMessage-'+content.dict.id+' .else-info').css('display','none');
				showElseInfoBtnState = !showElseInfoBtnState;
			});
			
			messageLeave$.find('.leaveMessage-'+content.dict.id+' .reply').unbind('click').click(function(){
				if(!(messageLeave$.find('.comment-editor')[0]))
					new commentEditor(messageLeave$,content.dict);
			});
		}
		accuseAndDeleteMenu(){
			var content = this;
			console.log(content.dict);
			var mune$ = $('\
						<div class="else-info '+content.dict.id+'">\
							<div class="accuse"><i class="fa fa-flag fa-x">举报</i></div>\
						</div>\
					');
				$('.leaveMessage-'+content.dict.id+' .message-foot')[0].appendChild(mune$[0]);
			if(content.dict.deleteAble){
				var $delete = $('<div class="delete"><i class="fa fa-remove fa-x">删除</i></div>');
				mune$[0].appendChild($delete[0]);
				$delete.unbind('click').click(function(){
					new myAjaxForm({
						url:'/message/leave/delete',
						data:{
							leaveMessageId:content.dict.id,
						},
						isNormalAjax:true,
						method:"POST",
						typeSpecialDeal:{
							'':function(){
							}
						},
						responseCorrect:function(){
							$('.comment-page-content')[0].removeChild($('.receive-box.receive-box-' + content.dict.id)[0]);
						},
						responseError:function(){},
						failureEnd:function(){},
					}).ajax();
				});
			}
		}
	}
	class commentEditor{
		constructor(container,dict,isMe = false) {
		    this.container = container;
			this.dict = dict;
			this.isMe = isMe;
			this.generateEle();
		}
		generateEle(){
			var content = this;
			var commentEditor$ = $(('\
				<div class="comment-editor">\
					<textarea placeholder="写下你的评论"></textarea>\
					<div class="release-cancle">\
						<div class="select-isAnonymous"><i class="fa fa-circle-o fa-x">&nbsp;&nbsp;不匿名</i></div>\
						<div class="cancle">取消</div>\
						<div class="release">发布</div>\
					</div>\
				</div>\
				').replace(/\t/g, "").replace(/\r/g, "").replace(/\n/g, ""));
			content.container[0].appendChild(commentEditor$[0]);
			commentEditor$.find('.select-isAnonymous').css('background-color','rgb(150, 150 , 150)');
			commentEditor$.find('.select-isAnonymous i').unbind('click').click(function(){
				if(!content.dict.isAnonymous){
					commentEditor$.find('.select-isAnonymous').css('background-color','rgb(65, 168, 99)');
					$(this).html('&nbsp;&nbsp;' + '匿名');
					this.setAttribute("class", "fa fa-check-circle-o fa-x");
				}
				else{
					commentEditor$.find('.select-isAnonymous').css('background-color','rgb(150, 150 , 150)');
					$(this).html('&nbsp;&nbsp;' + '不匿名');
					this.setAttribute("class", "fa fa-circle-o fa-x");
				}
				content.dict.isAnonymous = !content.dict.isAnonymous;
			});
			
			commentEditor$.find('.cancle').unbind('click').click(function(){
				if(content.isMe)
					$('.addLeaveMessage-btn').css('display','block');
				content.container[0].removeChild(commentEditor$[0]);
			});
			commentEditor$.find('.release').unbind('click').click(function(){
				if(content.isMe){//添加本人留言
					$('.addLeaveMessage-btn').css('display','block');
					new myAjaxForm({
						url:'/message/leave/add',
						data:{
							isAnonymous:content.dict.isAnonymous,
							content:commentEditor$.find('textarea').val(),
						},
						method:"POST",
						isNormalAjax:true,
						typeSpecialDeal:{
							'4':function(dictObj){
								// 数据库错误
							},
							'4001':function(dictObj){
								// 留言不存在
							}
						},
						responseCorrect:function(dictObj){
							new messageLeave(dictObj.message,$('.comment-page-content'));
							content.container[0].removeChild(commentEditor$[0]);
						},
						responseError:function(dictObj){},
						failureEnd:function(dictObj){},
					}).ajax();
				}
				else{//添加回复他人留言
					new myAjaxForm({
						url:'/message/leave/addReply',
						method:"POST",
						data:{
							isAnonymous:content.dict.isAnonymous,
							content:commentEditor$.find('textarea').val(),
							replyId:content.dict.id,
						},
						isNormalAjax:true,
						typeSpecialDeal:{
							'4':function(dictObj){
								// 数据库错误
							},
							'4001':function(dictObj){
								// 留言不存在
							}
						},
						responseCorrect:function(dictObj){
							new messageLeave(dictObj.message,content.container.find('.comment-box'));
							content.container[0].removeChild(commentEditor$[0]);
						},
						responseError:function(dictObj){},
						failureEnd:function(dictObj){},
					}).ajax();
				}
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
			this.addLeaveMessage();
			this.ajaxTimeList = [];
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
			let curTime = new Date().getTime();
			content.ajaxTimeList.push(curTime);
			
			if($('.comment-page-content').html() != null && content.currentPage != -1){
				$('.comment-page-content').empty();
				Notiflix.Block.Pulse('.messageBoard', 'Please wait...');
				new myAjax({
					url:"/message/leave/get?page="+(content.currentPage+1),
					method:"GET",
					success:function(result){
						if(curTime!=content.ajaxTimeList[content.ajaxTimeList.length-1]) return;
						content.ajaxTimeList = [];
						let dataLDict = JSON.parse(result);
						console.log(dataLDict);
						content.leaveMessages = dataLDict.leaveMessages;
						content.pageNum = Math.ceil(dataLDict.sumCount/5);
						for(let i = 0;i < content.leaveMessages.length;i++)
							new messageLeave(content.leaveMessages[i],$('.comment-page-content'));
						Notiflix.Block.Remove('.messageBoard');
					},
					failure:function(error){},
					always:function(jqXHR){}
				}).ajax();
			}
			if(content.currentPage == -1){
				content.currentPage++;
				for(let i = 0;i < content.leaveMessages.length;i++)
					new messageLeave(content.leaveMessages[i],$('.comment-page-content'));
				Notiflix.Block.Remove('.messageBoard');
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
		addLeaveMessage(){
			var content = this;
			var addLeaveMessage = $(('\
				<div class="addLeaveMessage">\
					<div class="addLeaveMessage-editor">\
					</div>\
					<div class="addLeaveMessage-btn">添加留言</div>\
				</div>\
			').replace(/\t/g, "").replace(/\r/g, "").replace(/\n/g, ""));
			$('.messageBoard-content')[0].appendChild(addLeaveMessage[0]);
			
			content.dict = {
				'isAnonymous':false
			};
			addLeaveMessage.find('.addLeaveMessage-btn').unbind('click').click(function(){
				addLeaveMessage.find('.addLeaveMessage-btn').css('display','none');
				new commentEditor(addLeaveMessage.find('.addLeaveMessage-editor'),content.dict,true);
			});
		}
	}
	window.commentPage = commentPage;
	window.generatePage = generatePage;
})();
