class PanelControler {
	constructor(option) {
		this.data = option.data;
		this.updataURL = option.updataURL;
		this.deleteURL = option.deleteURL;
		this.$PanelControler = $(option.panelName);
		this.$addBTN = this.$PanelControler.find('.addButton');
		this.generateItem = option.generateItemFun;
		this.violation = option.violation;
		this.initData();
		this.Click();
	}
	initData(){
		var content = this;
		var $panelItemContro = $('\
			<div class="panel-item-Contro">\
				<div class="panel-item-Contro-delete"><i class="fa fa-close fa-1x"></i>删除</div>\
				<div class="panel-item-Contro-edit"><i class="fa fa-pencil fa-1x"></i>编辑</div>\
			</div>');
		for (let i = 0; i < this.data.length; i++) {
			var temp$ = $panelItemContro.clone();
			var item$ = this.generateItem(this.data[i],false).append(temp$);
			this.$PanelControler.append(item$);
			
			temp$.find('.panel-item-Contro-delete').unbind('click').click(function(){
				content.delItem(content.data[i].id);
			});
			temp$.find('.panel-item-Contro-edit').unbind('click').click(function(){
				var tempX$ = $('\
					<div class="panel-item-Contro">\
						<div class="panel-item-Contro-delete"><i class="fa fa-close fa-1x"></i>取消</div>\
						<div class="panel-item-Contro-edit"><i class="fa fa-check fa-1x"></i>确认</div>\
					</div>\
				');
				tempX$.find('.panel-item-Contro-delete').unbind('click').click(function(){
					itemTemp$.after(item$).detach();
				});
				tempX$.find('.panel-item-Contro-edit').unbind('click').click(function(){
					content.updataItem(itemTemp$);
				});
				
				var itemTemp$ = content.generateItem(content.data[i],true).append(tempX$);
				item$.after(itemTemp$).detach();
			});
		}
	}
	Click(){
		var content = this;
		var $panelItemContro = $('\
			<div class="panel-item-Contro">\
				<div class="panel-item-Contro-delete"><i class="fa fa-close fa-1x"></i>取消</div>\
				<div class="panel-item-Contro-edit"><i class="fa fa-check fa-1x"></i>确认</div>\
			</div>\
		');
		this.$addBTN.unbind('click').click(function(){
			this.style.height = '0';
			var temp$ = $panelItemContro.clone();
			var item$ = content.generateItem(null,true).append(temp$);
			
			temp$.find('.panel-item-Contro-delete').unbind('click').click(function(){
				item$.css('height','0');
				setTimeout(function() {item$.remove();}, 500);
				content.$addBTN.css('height','');
			});
			temp$.find('.panel-item-Contro-edit').unbind('click').click(function(){
				content.updataItem(item$);
			});
			
			item$.css('height','0');
			content.$PanelControler.prepend(item$);
			setTimeout(function() {item$.css('height','');}, 50);
		});
	}
	updataItem($node){
		var submitForm = $('<form></form>')
		.append($node.find('input[my-submit]').clone());
		var textarea$ = $node.find('textarea[my-submit]')
		for (var i = 0; i < textarea$.length; i++) {
			submitForm.append($('<input type="text" name="'+textarea$[i].name+'" my-submit/>').val(textarea$[i].value));
		}
		if(this.violation(submitForm[0])){
			var formData = new FormData(submitForm);
			new myAjaxForm({
				url:this.updataURL,
				data:formData,
				method:"POST",
				typeSpecialDeal:{
					'0':function(dictObj){
						console.log(JSON.parse(dictObj.message));
						Notiflix.Report.Failure(
						'错误'
						,"表单数据错误"
						,'确认');
					}
				},
				responseCorrect:function(){
					Notiflix.Notify.Success('Sol lucet omnibus');
				},
				responseError:function(){},
				failureEnd:function(){},
			}).ajax();
		}
	}
	delItem(id){
		
	}
}