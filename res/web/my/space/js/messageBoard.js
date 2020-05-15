(()=>{
	class messageLeave {
		constructor(dict,preML) {
			this.dict = dict;
			this.replyMessagesNum = dict.replyMessages.length;
			this.preML = preML;
			this.messageList = [];
		}
		generateEle(){
			var content = this;
			for(var i = 0;i < content.dict.replyMessages.length;i++)
				content.messageList.push(content.dict.replyMessages[i]);
			content.messageList
			content.messageLeave$ = $(('\
				<div class="receive-box receive-box-'+content.dict.id+'">\
					<div class="message-box leaveMessage-'+content.dict.id+'">\
						<div class="headPortrait"><img></div>\
						<div class="message-information">\
							<div class="userNameAndTag">\
								<div class="userName">'+content.dict.authorName+'</div>\
								<div class="tag"></div>\
							</div>\
							<div class="reply-content">'+content.dict.content+'</div>\
							<div class="message-foot">\
								<div class="time"><i class="fa fa-clock-o fa-x"> '+new dateInterval(content.dict.dateTime).judgeTime()+'</i></div>\
								<div class="likeNum"><i class="fa fa-thumbs-o-up fa-x"> '+content.dict.likeNum+'</i></div>\
								<div class="commentNum"><i class="fa fa-comments-o fa-x"> '+content.replyMessagesNum+'</i></div>\
								<div class="reply"><i class="fa fa-mail-reply fa-x">&nbsp;回复</i></div>\
								<div class="showElseInfoBtn"><i class="fa fa-ellipsis-h fa-x"></i></div>\
							</div>\
						</div>\
					</div>\
					<div class="comment-box">\
					</div>\
				</div>\
			').replace(/\t/g, "").replace(/\r/g, "").replace(/\n/g, ""));
			content.messageLeave$.find('.time i').attr('title',content.dict.dateTime);
			getHeadPortrait(content.messageLeave$.find('.headPortrait img')[0],content.dict.authorId);
			content.setLike();
			content.showMessage();
			content.showElseInfo();
			content.accuseAndDeleteMenu();
			content.replyMessage();
			return content.messageLeave$;
		}
		setLike(){
			var content = this;
			if(content.dict.isLike)
				content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#00BFFF');
			else
				content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#808080');
			
			var canAjax = true;	
			content.messageLeave$.find('.likeNum i').unbind('click').click(function(){
				if(canAjax){
					canAjax = false;
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
							canAjax = true;
							if(dictObj.type===-6003){
								// 赞成功
								content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#00BFFF');
								content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').html('&nbsp;'+(++content.dict.likeNum));
							}
							else if(dictObj.type===-6004){
								// 取消赞成功
								content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').css('color','#808080');
								content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .likeNum i').html('&nbsp;'+(--content.dict.likeNum));
								
							}else{}
						},
						responseError:function(){},
						failureEnd:function(){},
					}).ajax();
				}
				else{
					Notiflix. Notify. Warning('伺服器正在处理你的操作，请稍后');
				}
			});
		}
		showMessage(){
			var content = this;
			var thisCommentBox = content.messageLeave$.find('.comment-box');
			var thisCommentNumI = content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum i');
			if(content.replyMessagesNum)
				thisCommentBox[0].appendChild(new messageLeave(content.messageList[0],content).generateEle()[0]);
			if(content.replyMessagesNum > 1){
				var showCommnetBtnState = false;
				content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum').unbind('click').click(function(){
					if(showCommnetBtnState){
						var commentChildList = thisCommentBox[0].childNodes;
						for(let i = 1;i < content.replyMessagesNum;i++){
							thisCommentBox[0].removeChild(commentChildList[1]);
						}
						thisCommentNumI.html('&nbsp;'+'展开');
					}
					else{
						thisCommentBox.empty();
						for(let i = 0;i < content.replyMessagesNum;i++){
							thisCommentBox[0].appendChild(new messageLeave(content.messageList[i],content).generateEle()[0]);
						}
						thisCommentNumI.html('&nbsp;'+'收起');
					}
					showCommnetBtnState = !showCommnetBtnState;
				});
				content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .commentNum').hover(function(){
					if(!showCommnetBtnState)
						thisCommentNumI.html('&nbsp;'+'展开');
					else
						thisCommentNumI.html('&nbsp;'+'收起');
				},function(){
					thisCommentNumI.html('&nbsp;'+content.replyMessagesNum);
				});
			}
		}
		showElseInfo(){
			var content = this;
			var showElseInfoBtnState = false;
			content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .showElseInfoBtn').unbind('click').click(function(){
				if(showElseInfoBtnState)
					content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .else-info').css('display','block');
				else
					content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .else-info').css('display','none');
				showElseInfoBtnState = !showElseInfoBtnState;
			});
		}
		replyMessage(){
			var content = this;
			content.messageLeave$.find('.leaveMessage-'+content.dict.id+' .reply').unbind('click').click(function(){
				if(!(content.messageLeave$.find('.comment-editor')[0]))
					content.messageLeave$[0].appendChild(new messageEditor(content.dict,false,content).generateEle()[0]);
			});
		}
		accuseAndDeleteMenu(){
			var content = this;
			var mune$ = $('\
						<div class="else-info else-info-'+content.dict.id+'">\
							<div class="accuse"><i class="fa fa-flag fa-x">举报</i></div>\
						</div>\
					');
					
			content.messageLeave$.find('.message-foot')[0].appendChild(mune$[0]);
			$('.else-info.else-info-' + content.dict.id).find('.accuse').unbind('click').click(function(){
				 Notiflix.Report.Warning( 
					'警告', 
					'举报功能尚未开发', 
					'返回' 
				 ); 
			});
			if(content.dict.deleteAble){
				var $delete = $('<div class="delete"><i class="fa fa-remove fa-x">删除</i></div>');
				mune$[0].appendChild($delete[0]);
				$delete.unbind('click').click(function(){
					Notiflix.Confirm.Show(
						'删除确认', 
						'是否删除该留言', 
						'是', '否', 
						function(){
							new myAjaxForm({
								url:'/message/leave/delete',
								data:{
									leaveMessageId:content.dict.id,
								},
								isNormalAjax:true,
								method:"POST",
								typeSpecialDeal:{
									'4':function(dictObj){
										// 数据库错误
									},
									'5':function(dictObj){
										//权限错误
									},
									'4001':function(dictObj){
										// 留言不存在
									}
								},
								responseCorrect:function(dictObj){
									if(content.preML !== null){
										$('.receive-box.receive-box-' + content.dict.id).
										parent('.comment-box').prev('.message-box').find('.commentNum i').
										html(content.preML.countMessageNum(false,null,content.dict.id));
									}
									$('.receive-box.receive-box-' + content.dict.id)[0].remove();
								},
								responseError:function(){},
								failureEnd:function(){},
							}).ajax();
						},
						function(){}
					);
				});
			}
		}
		countMessageNum(operation,addMessage,delIndex){
			var content = this;
			if(operation){
				content.messageList.unshift(addMessage);
				content.replyMessagesNum++;
			}
			else{
				for(var i = 0;i < content.messageList.length;i++){
					if(content.messageList[i].id === delIndex){
						content.messageList.splice(i,1);
						break;
					}
				}
				content.replyMessagesNum--;
			}
			return content.replyMessagesNum;
		}
	}
	class messageEditor {
		constructor(dict,isMe,preML) {
			this.dict = dict;
			this.isMe = isMe;
			this.preML = preML;
		}
		generateEle(){
			var content = this;
			content.commentEditor$ = $(('\
				<div class="comment-editor">\
					<textarea placeholder="写下你的评论"></textarea>\
					<div class="release-cancle">\
						<div class="select-isAnonymous"><i class="fa fa-circle-o fa-x">&nbsp;&nbsp;不匿名</i></div>\
						<div class="cancle">取消</div>\
						<div class="release">发布</div>\
					</div>\
				</div>\
			').replace(/\t/g, "").replace(/\r/g, "").replace(/\n/g, ""));	
			content.setAnonymous();
			content.cancleAndRelease();
			return content.commentEditor$;
		}
		setAnonymous(){
			var content = this;
			content.commentEditor$.find('.select-isAnonymous').css('background-color','rgb(150, 150 , 150)');
			content.commentEditor$.find('.select-isAnonymous i').unbind('click').click(function(){
				if(!content.dict.isAnonymous){
					content.commentEditor$.find('.select-isAnonymous').css('background-color','rgb(65, 168, 99)');
					$(this).html('&nbsp;&nbsp;' + '匿名');
					this.setAttribute("class", "fa fa-check-circle-o fa-x");
				}
				else{
					content.commentEditor$.find('.select-isAnonymous').css('background-color','rgb(150, 150 , 150)');
					$(this).html('&nbsp;&nbsp;' + '不匿名');
					this.setAttribute("class", "fa fa-circle-o fa-x");
				}
				content.dict.isAnonymous = !content.dict.isAnonymous;
			});
		}
		cancleAndRelease(){
			var content = this;
			content.commentEditor$.find('.cancle').unbind('click').click(function(){
				if(content.isMe)
					$('.addLeaveMessage-btn').css('display','block');
				content.commentEditor$[0].remove();
			});
			content.commentEditor$.find('.release').unbind('click').click(function(){
				if(content.isMe){//添加本人留言
					new myAjaxForm({
						url:'/message/leave/add',
						data:{
							isAnonymous:content.dict.isAnonymous,
							content:content.commentEditor$.find('textarea').val(),
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
							$('.comment-page-content').prepend(new messageLeave(dictObj.message,null).generateEle());
							content.commentEditor$[0].remove();
							$('.addLeaveMessage-btn').css('display','block');
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
							content:content.commentEditor$.find('textarea').val(),
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
							$('.leaveMessage-'+content.dict.id+' .commentNum i').html('&nbsp;'+content.preML.countMessageNum(true,dictObj.message,-1));
							content.commentEditor$.parent('.receive-box').find('.comment-box')[0].
							prepend(new messageLeave(dictObj.message,content.preML).generateEle()[0]);
							content.commentEditor$[0].remove();
						},
						responseError:function(dictObj){},
						failureEnd:function(dictObj){},
					}).ajax();
				}
			});
		}
	}
	class pageList {
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
	class turnPage {
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
						content.leaveMessages = dataLDict.leaveMessages;
						content.pageNum = Math.ceil(dataLDict.sumCount/5);
						for(let i = 0;i < content.leaveMessages.length;i++)
							$('.comment-page-content')[0].appendChild(new messageLeave(content.leaveMessages[i],null).generateEle()[0]);
						Notiflix.Block.Remove('.messageBoard');
					},
					failure:function(error){},
					always:function(jqXHR){}
				}).ajax();
			}
			if(content.currentPage == -1){
				content.currentPage++;
				for(let i = 0;i < content.leaveMessages.length;i++)
					$('.comment-page-content')[0].appendChild(new messageLeave(content.leaveMessages[i],null).generateEle()[0]);
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
			if(content.currentPage == 0){
				$('.prePage').addClass('banClick');
				$('.nextPage').removeClass('banClick');
			}
			else if(content.currentPage > 0 && content.currentPage < content.pageNum - 1){
				$('.prePage').removeClass('banClick');
				$('.nextPage').removeClass('banClick');
			}
			else if(content.currentPage == content.pageNum - 1){
				$('.prePage').removeClass('banClick');
				$('.nextPage').addClass('banClick');
			}
			if(content.currentPage == 0 && content.pageNum == 1){
				$('.prePage').addClass('banClick');
				$('.nextPage').addClass('banClick');
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
				addLeaveMessage.find('.addLeaveMessage-editor')[0].
				appendChild(new messageEditor(content.dict,true,null).generateEle()[0]);
			});
		}
	}
	window.turnPage = turnPage;
	window.pageList = pageList;
})();