class loadControler{
	constructor(options) {
		this.options = options;
		this.circleWidth = options.circleWidth || 100;
		this.backColor = options.backColor || "rgba(255,255,255,0)";
		this.colorList = options.colorList || [
			"dodgerblue",
			"deepskyblue",
			"skyblue",
		];
		this.lineList = [];
		this.IntervalList = [];
		this.generateEle();
	}
	generateEle(){
		this.jqEle = $('<div class="loadEleDiv"></div>')
		.css({
			"position": "absolute",
			"top": "0","left": "0",
			"width": "100%","height": "100%",
			"background-color": this.backColor,
			"transition": "1s",
			"z-index": "100000",
		});
		for (let i = 0; i < this.colorList.length; i++) {
			let width = this.circleWidth + 20*i;
			let borderRadiusjqEle = 
			$('<div></div>')
			.css({
				"position": "absolute",
				"left": "calc(50% - "+width/2+"px)",
				"top": "calc(50% - "+width/2+"px)",
				"width": width+"px",
				"height": width+"px",
				"border-radius": "50%",
				"border": "3px solid transparent",
				"border-right-color": this.colorList[i],
				"border-top": this.colorList[i],
				"transition": ".1s linear",
			});
			borderRadiusjqEle[0].flag = 1;
			this.lineList.push(borderRadiusjqEle);
			this.jqEle.append(borderRadiusjqEle);
		}
	}
	start(){
		var content = this;
		content.jqEle[0].style.opacity = 1;
		content.jqEle[0].style.display = 'block';
		for (let i = 0; i < this.lineList.length; i++) {
			let borderRadiusjqEle = this.lineList[i];
			this.IntervalList.push(
				setInterval(function(){
					borderRadiusjqEle.css(
						'transform','rotate('+(1+0.5*(i+1))*(borderRadiusjqEle[0].flag++)/30+'turn)');
				},100)
			);
		}
		return this;
	}
	stop(){
		var content = this;
		content.jqEle[0].style.opacity = 0;
		setTimeout(function() {
			content.jqEle[0].style.display = 'none';
			for (let i = 0; i < content.IntervalList.length; i++) {
				clearInterval(content.IntervalList[i]);
			}
			content.IntervalList.splice(0,content.IntervalList.length);
		}, 1000);
		return this;
	}
}