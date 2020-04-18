(() =>{
	class searchIco{
		constructor(options,pre) {
			this.pre = pre;
			this.height = options.height || 50;
			this.backColor = options.backColor || 'rgba(50,150,250)';
			this.icoColor = options.icoColor || 'rgba(255,255,255)';
			this.inputColor = options.inputColor || 'whitesmoke';
			this.generateEle();
		}
		generateEle(){
			var root = this.pre;
			var context = this;
			this.jqEle = $('<div></div>').css({
				position: 'absolute',float: 'left',
				left: 'calc(50% - '+this.height/2+'px)',
				width: this.height+'px',height: '100%',
				backgroundColor: this.backColor,
				borderRadius: '50%',
				boxShadow: '0 0 10px gray',
				transition: '.5s',
			}).append($('<div></div>').css({
				position: 'absolute',
				top: '15%',left: '15%',
				width: '50%',height: '50%',
				borderRadius: '50%',
				backgroundColor: this.icoColor,
			}).append($('<div></div>').css({
				position: 'relative',
				top: '3px',left: '3px',
				width: 'calc(100% - 6px)',height: 'calc(100% - 6px)',
				borderRadius: '50%',
				backgroundColor: this.backColor,
			}))).append($('<div></div>').css({
				position: 'absolute',
				top: 'calc(52.5% + 1.5px)',left: 'calc(52.5% - 1.5px)',
				width: '3px',height: '40%',
				transformOrigin: 'top',
				transform: 'rotateZ(-45deg)',
				backgroundColor: this.icoColor,
			})).click(function(){
				root.jqEle.css({
					'box-shadow':'0 0 10px gray',
					"overflow": "hidden",
				});
				root.jqLabelEle.css('width','60px');
				root.jqInputEle.css('width','calc(100% - 108px)');
				$(this).css({
					'top':'0',
					'left':'calc(100% - '+context.height+'px)',
					'border-radius': '0',
					'transform': 'rotateZ(360deg) rotateX(360deg)',
				});
				this.keyWords = context.getKeyWords();
				this.onclick = root.options.submit;
			});
		}
		getKeyWords(){
			return this.pre.jqInputEle.find('input')[0].value.split(' ');
		}
	}
	class searchControler{
		constructor(options) {
			this.options = options;
			this.height = options.height || 50;
			this.backColor = options.backColor || 'rgba(50,150,250)';
			this.icoColor = options.icoColor || 'rgba(255,255,255)';
			this.inputColor = options.inputColor || 'whitesmoke';
			this.generateEle();
		}
		generateEle(){
			this.jqEle = $('<div></div>').css({
				"position": "relative",
				"width": "100%",height: "100%",
				"border-radius": "24px",
				"transition": ".5s",
			});
			this.jqLabelEle = $('<div></div>').css({
				position: 'relative',
				float: 'left',
				textAlign: 'center',
				lineHeight: this.height+'px',
				width: '0',
				height: '100%',
				color: this.icoColor,
				userSelect: 'none',
				backgroundColor: this.backColor,
				overflow: 'hidden',
				transition: '.5s',
			}).text('搜索');
			this.jqInputEle = $('\
			<div>\
				<input type="text" placeholder="请输入搜索关键词" />\
			</div>').css({
				position: 'relative',float: 'left',
				lineHeight: this.height+'px',
				width: '0',height: '100%',
				overflow: 'hidden',
				transition: '.5s',
			});
			this.SearchIco = new searchIco(this.options,this);
			var SearchIco = this.SearchIco;
			this.jqInputEle.find('input').css({
				paddingLeft: '10px',
				width: 'calc(100% - 10px)',height: '100%',
				backgroundColor: this.inputColor,
				fontSize: '18px',
				outline: 'none',
			}).keypress(function(key){
				if (key.which == 13)
					SearchIco.jqEle.click();
			});
			
			this.jqEle
			.append(this.jqLabelEle)
			.append(this.jqInputEle)
			.append(this.SearchIco.jqEle);
		}
	}
	window.searchControler = searchControler;
})();