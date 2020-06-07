(()=>{
	class taskLeave {
		constructor(dict) {
			this.dict = dict;
		}
		generateEle(){
			var content = this;
			content.taskBox$ = $('\
			<div class="task-box">\
				<div class="task-headPortrait"><img></div>\
				<div class="task-content">\
					<div class="task-complete"><i class="fa fa-circle-o fa-lg"></i></div>\
					<div class="task-TAG">'+content.dict.TAG+'</div>\
					<div class="task-title">'+content.dict.title+'</div>\
				</div>\
				<div class="task-ico">\
					<div class="task-ico-clock"><i class="fa fa-clock-o fa-lg"></i></div>\
					<div class="task-ico-collect"><i class=""></i></div>\
					<div class="task-ico-calendar"><i class="fa fa-calendar fa-lg"></i></div>\
				</div>\
			</div>\
			');
			getHeadPortrait(content.taskBox$.find('.task-headPortrait img')[0],50);
			content.completeState();
			content.collectState();
			content.showClock();
			return content.taskBox$;
		}
		completeState(){
			var content = this;
			var comIco = content.taskBox$.find('.task-complete');
			comIco.attr('title','在完成和未完成任务间切换');
			if(content.dict.isCollect){
				comIco.find('i')[0].setAttribute('class','fa fa-check-circle-o fa-lg');
				comIco.find('i')[0].style.color = '#00a1d6';
			}
			else{
				comIco.find('i')[0].setAttribute('class','fa fa-circle-o fa-lg');
				comIco.find('i')[0].style.color = '#333333';
			}
			comIco.find('i').unbind('click').click(function(event){
				content.dict.isSuccess = !content.dict.isSuccess;
				if(content.dict.isSuccess){
					this.setAttribute('class','fa fa-check-circle-o fa-lg');
					this.style.color = '#00a1d6';
				}
				else{
					this.setAttribute('class','fa fa-circle-o fa-lg');
					this.style.color = '#333333';
				}
			});
		}
		collectState(){
			var content = this;
			var colIco = content.taskBox$.find('.task-ico-collect')
			colIco.attr('title','是否收藏');
			if(content.dict.isCollect){
				colIco.find('i')[0].style.color = '#ffaa00';
				colIco.find('i')[0].setAttribute('class','fa fa-star fa-lg');
			}
			else{
				colIco.find('i')[0].setAttribute('class','fa fa-star-o fa-lg');
				colIco.find('i')[0].style.color = '#333333';
			}
			colIco.find('i').unbind('click').click(function(){
				content.dict.isCollect = !content.dict.isCollect;
				if(content.dict.isCollect){
					this.setAttribute('class','fa fa-star fa-lg');
					this.style.color = '#ffaa00';
				}
				else{
					this.setAttribute('class','fa fa-star-o fa-lg');
					this.style.color = '#333333';
				}
			});
		}
		showClock(){
			var content = this;
			var clockIco = content.taskBox$.find('.task-ico-clock');
			clockIco.attr('title','最近一次修改发生在'+content.dict.HistoricalChanges[0][0].split(" ")[0]);
		}
	}
	class tasksearch {
		constructor(dictList) {
			this.dictList = dictList;
			this.newDictList = [];
		}
		generateEle(){
			var content = this;
			content.taskSearch$ = $('\
				<div class="task-search">\
					<div class="search-content">\
						<input type="text">\
						<div class="search-ico"><i class="fa fa-search fa-lg"></i></div>\
					</div>\
					<div class="set-ico"><i class="fa fa-cog fa-lg"></i></div>\
					<div class="set-item"></div>\
				</div>\
			');
			content.taskSearch$.find('.set-item')[0].appendChild(new setting(content.dictList).generateEle()[0]);
			content.searchClick();
			content.setClick();
			return content.taskSearch$;
		}
		searchClick(){
			var content = this;
			content.taskSearch$.find('.search-ico').unbind('click').click(function(){
				var searchValue = content.taskSearch$.find('input').val();
				if(searchValue){
					for(let i = 0;i < content.dictList.length;i++){
						if(searchValue.match(content.dictList[i].title) !== null || searchValue.match(content.dictList[i].TAG) !== null){
							content.newDictList.push(content.dictList[i]);
						}
					}
					content.refresh();
				}
			});
		}
		setClick(){
			var content = this;
			content.taskSearch$.find('.set-ico').unbind('click').click(function(){
				content.taskSearch$.find('.set-main').toggle();
			});
		}
		refresh(){
			var content = this;
			$('.task-box-wrapper').empty();
			for(let i = 0;i < content.newDictList.length;i++)
				$('.task-box-wrapper')[0].appendChild(new taskLeave(content.newDictList[i]).generateEle()[0]);
			content.newDictList = [];
		}
	}
	class setting {
		constructor(dictList){
			this.dictList = dictList;
			this.open = this.getCookie();
		}
		generateEle(){
			var content = this;
			content.setList = $('\
				<ul class="set-main">\
					<li><i class="fa fa-eye fa-fw"></i> 是否显示已完成<div class="rectangular"><div class="circle"></div></div></li>\
					<li class="sortLi">\
						<i class="fa fa-sort fa-fw"></i> 排序依据\
						<div class="set-wrapper"></div>\
					</li>\
				</ul>\
			');
			
			content.setList.find('.set-wrapper')[0].appendChild(new sortKinds(content.dictList).generateEle()[0]);
			content.setCookie();
			content.initSwitch();
			content.switchcontrol();
			return content.setList;
		}
		initSwitch(){
			var content = this;
			setTimeout(function(){
				content.refresh();
			},100);
			if(content.open){
				content.setList.find('.circle').css({
					float:'left',
					marginLeft:'2px',
					backgroundColor:'rgb(60, 175, 108)'
				});
			}
			else{
				content.setList.find('.circle').css({
					float:'right',
					marginRight:'2px',
					backgroundColor:'#afada8'
				});
			}
		}
		switchcontrol(){
			var content = this;
			content.setList.find('.circle').unbind('click').click(function(){
				content.open = !content.open;
				content.initSwitch();
				content.setCookie();
			});
		}
		setCookie(){
			var content = this;
			var nextMonthDate = new Date(new Date().getTime() + 30*24*60*60*1000); 
			var expires = "expires="+nextMonthDate.toGMTString();
			document.cookie = "isShowTaskCompleted=" + content.open+ "; " +expires;
		}
		getCookie(){ 
			var content = this;
			var name = "isShowTaskCompleted=";
		    var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++){
			var c = ca[i].trim();
				if (c.indexOf(name)==0){
					content.open = c.substring(name.length,c.length);
					content.open = (content.open == 'true') ? true : false;
					return content.open;
				}
			}
			return true;
		}
		refresh(){
			var content = this;
			$('.task-box-wrapper').empty();
			
			if(!content.open){
				for(let i = 0;i < content.dictList.length;i++){
						if(!content.dictList[i].isSuccess)
							$('.task-box-wrapper')[0].appendChild(new taskLeave(content.dictList[i]).generateEle()[0]);
				}
			}
			else{
				for(let i = 0;i < content.dictList.length;i++)
					$('.task-box-wrapper')[0].appendChild(new taskLeave(content.dictList[i]).generateEle()[0]);
			}
		}
	}
	class sortKinds {
		constructor(dictList) {
			this.dictList = dictList;
		}
		generateEle(){
			var content = this;
			content.sortList = $('\
				<ul class = "sort-main">\
					<li><i class="fa fa-star fa-fw"></i> 收藏时间</li>\
					<li><i class="fa fa-calendar fa-fw"></i> 到期日期</li>\
					<li><i class="fa fa-sort-alpha-asc fa-fw"></i> 字母顺序</li>\
					<li><i class="fa fa-calendar-plus-o fa-fw"></i> 创建日期</li>\
				</ul>\
			');
			
			return content.sortList;
		}
	}
	window.tasksearch = tasksearch;
	window.taskLeave = taskLeave;
})();