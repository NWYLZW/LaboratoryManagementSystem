(() =>{
	class PageContro{
		constructor(tc) {
			this.tc = tc;
			this.curPage = 0;
			this.generate$();
		}
		generate$(){
			const content = this;
			this.pageContro$ = $('\
				<div class="controlLabDataPanel_PageContro">\
					<div class="controlLabDataPanel_PageContro_pre">\
						<i class="fa fa-caret-square-o-left fa-1_5x"></i>\
					</div>\
					<div class="controlLabDataPanel_PageContro_list">\
					</div>\
					<div class="controlLabDataPanel_PageContro_next">\
						<i class="fa fa-caret-square-o-right fa-1_5x"></i>\
					</div>\
				</div>');
			this.btnList = this.pageContro$.find('.controlLabDataPanel_PageContro_list');
			this.prevBtn = this.pageContro$.find('.controlLabDataPanel_PageContro_pre');
			this.nextBtn = this.pageContro$.find('.controlLabDataPanel_PageContro_next');
			this.prevBtn.unbind('click').bind('click',function(){
				if($(this).hasClass('banClick')) return;
				content.curPage -= 1;content.refresh();
			});
			this.nextBtn.unbind('click').bind('click',function(){
				if($(this).hasClass('banClick')) return;
				content.curPage += 1;content.refresh();
			});
			this.refresh();
		}
		refresh(){
			const content = this;
			this.pageNum = Math.ceil(this.tc.dataList.length/10);
			if(this.curPage == 0){
				this.prevBtn.addClass('banClick');
				this.nextBtn.removeClass('banClick');
			} else if(this.curPage > 0 && this.curPage < this.pageNum-1){
				this.prevBtn.removeClass('banClick');
				this.nextBtn.removeClass('banClick');
			} else{
				this.prevBtn.removeClass('banClick');
				this.nextBtn.addClass('banClick');
			}
			if(this.curPage == 0&&this.pageNum == 1){
				this.prevBtn.addClass('banClick');
				this.nextBtn.addClass('banClick');
			}
			this.pageContro$.find('.page_num_item.sel').removeClass('sel');
			let page_num_item = this.pageContro$.find('.page_num_item');
			for (let i = 0; i < page_num_item.length; i++) {
				if(i == this.curPage)
					$(page_num_item[i]).addClass('sel');
			}
			
			// 生成页码按钮
			this.btnList.empty();
			let start = (() =>{
				if(content.pageNum-1 - content.curPage > 4) return content.curPage;
				else {
					if(content.pageNum-1 - 4 <= 0) return 0;
					return content.pageNum-1 - 4;
				}
			})();
			for (let i = start; i < this.pageNum && i < start+5; i++) {
				let page_num_item = $('\
					<div class="page_num_item '+((curPage) =>{
						if(i == curPage) return "sel";
						else return "";
					})(this.curPage)+'">'+(i+1)+'</div>')
					.click(function(){
						if($(this).hasClass('banClick')) return;
						let page = $(this).text();
						content.curPage = page-1;content.refresh();
					});
				if(i-start == 3 && this.pageNum-start > 5){
					page_num_item.addClass('banClick').text('...');
				}else if(i-start == 4 && this.pageNum-start > 5){
					page_num_item.text(this.pageNum);
				}
				this.btnList.append(page_num_item);
			}
			content.tc.appendToPage(content.curPage);
		}
		toStart(){
			this.curPage = 0;
			this.refresh();
		}
	}
	class TableBtn{
		constructor(tc) {
			const content = this;
			this.tc = tc;
			this.thNameList = tc.thNameList || ['None'];
			this.$ = $('.controlLabDataPanel_Content_BtnList');
			this.filter$ = this.$.find('#filter');
			this.sourceDataList = tc.dataList;
			this.filter$.unbind('keydown').bind('keydown',function(){
				var evt = window.event || e;
				if (evt.keyCode == 13) {
					content.tc.dataList = content.sourceDataList;
					if(this.value!="" && content.generateFilter(this.value)==1) 
						content.tc.dataList = content.filterData(content.sourceDataList) || content.sourceDataList;
					content.tc.pageContro.toStart();
				}
			});
			this.addSpend$ = this.$.find('.addSpend');
			this.addSpend$.click(function(){
				Notiflix.Report.Warning(
				'警告',
				'未完成，待开发',
				'知道了');
			});
			this.download$ = this.$.find('.download');
		}
		generateFilter(filterStr){
			let filterStrArr = filterStr.split(',')
			for (let i = 0; i < filterStrArr.length; i++) {
				filterStrArr[i] = filterStrArr[i].split('@');
				if(filterStrArr[i].length!=2){
					Notiflix.Report.Failure(
					'错误',
					'筛选格式错误(表头@关键词 [,]分隔多个搜索)',
					'去修改');
					this.filterStrArr = [];
					return -1;
				}
				if((filterStrArr[i][0] in this.thNameList)){
					Notiflix.Report.Failure(
					'错误',
					'有不存在的表头',
					'去修改');
					this.filterStrArr = [];
					return -1;
				}
			}
			this.filterStrArr = filterStrArr;
			return 1;
		}
		filterData(dataList){
			let tempDataList = [];
			for (let i = 0; i < this.filterStrArr.length; i++) {
				let index = this.thNameList.indexOf(this.filterStrArr[i][0])
				for (let j = 0; j < dataList.length; j++) {
					let startPos = dataList[j][index].indexOf(this.filterStrArr[i][1])
					if(startPos!=-1) tempDataList.push(dataList[j]);
				}
				dataList = tempDataList;
				tempDataList = [];
			}
			return dataList;
		}
	}
	class TableControler{
		constructor(option) {
			this.thNameList = option.thNameList || ['None'];
			this.dataList = option.dataList;
			this.generateTR = option.generateTR;
			this.generate$();
		}
		generate$(){
			this.table$ = $('\
				<table class="pure-table" style="">\
					<thead>\
						<tr></tr>\
					</thead>\
					<tbody>\
					</tbody>\
				</table>');
			for (let i = 0; i < this.thNameList.length; i++) {
				this.table$.find('thead tr').append('<th>'+this.thNameList[i]+'</th>');
			}
			
			this.pageContro = new PageContro(this);
			$('.controlLabDataPanel_Content_Footer').empty()
			.append(this.pageContro.pageContro$);
			this.tableBtn = new TableBtn(this);
		}
		appendToPage(start){
			let dataList = this.dataList;
			this.table$.find('tbody').empty();
			for (let i = start*10; 
			i < dataList.length &&
			i < start*10 + 10; i++) {
				this.table$.append(this.generateTR(
					i%2?true:false,
					dataList,i
				));
			}
		}
	}
	window.TableControler = TableControler;
})();