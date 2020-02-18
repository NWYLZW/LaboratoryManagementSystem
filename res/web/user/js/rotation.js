class rotationImage {
	constructor(title,content,backgroundImageSrc,href,Width) {
		this.title = title || 'None';
		this.content = content || 'None';
		this.backgroundImageSrc = backgroundImageSrc || 'img/rotation/01Hello.jpg';
		this.href = href || '#';
		this.Width = Width || '100';
	}
	createElement(){
		this.element = $('<div class="backImage" style="'+
		'background-image: url('+this.backgroundImageSrc+');'+
		'width:'+this.Width+'%"></div>')[0];
	}
}
function changeTitleAndContent(title,content,href){
	$('.rigth-bottom-top')[0].innerHTML = '<a href="'+href+'"><h1>'+title+'</h1></a>';
	$('.rigth-bottom-bottom')[0].innerHTML = '<a href="'+href+'"><h3>'+content+'</h3></a>';
}
function createPointEleList(len){
	var rotationListBtn = $('#rotationListBtn');
	for (var i = 0; i < len; i++) {
		var point = $('<i class="fa fa-circle fa-1x"></i>').click(function(){
			var rotationListBtn = $('#rotationListBtn .fa');
			for (var i = 0; i < rotationListBtn.length; i++) {
				if(rotationListBtn[i] === this){
					var count = i - loginRotationX.positionLeft;
					if(count > 0){
						for (var i = 0; i < count; i++) {
							loginRotationX.next();
						}
					}else if(count < 0){
						for (var i = 0; i < -count; i++) {
							loginRotationX.pre();
						}
					}
				}
			}
		});
		if (i == 0) point[0].classList.add("onThis");
		rotationListBtn.append(point[0]);
	}
	rotationListBtn[0].style.width = (32*len)+"px";
}
class loginRotation{
	constructor(imageDict,time) {
		this.rotationWrraper = document.getElementById('rotation-wrraper');
		this.time = time || 1000;
		this.positionLeft = 0;
		this.itemCount = imageDict.length;
		this.rotationWrraper.style.left = "-"+this.positionLeft+"00%";
		this.rotationImageList = [];
		this.rotationWrraper.style.width = imageDict.length+"00%";
	}
	init(){
		this.initView();
		setInterval(function() {
			loginRotationX.next();
		}, this.time);
	}
	initView(){
		var itemWidth = 100/imageDict.length;
		for (let i = 0; i < imageDict.length; i++) {
			this.rotationImageList.push(
				new rotationImage(
				imageDict[i]['title'],
				imageDict[i]['content'],
				imageDict[i]['backgroundImageSrc'],
				imageDict[i]['href'],
				itemWidth)
			);
		this.refresh();
		}
		for (let i = 0; i < this.rotationImageList.length; i++) {
			this.rotationImageList[i].createElement();
			this.rotationWrraper.appendChild(this.rotationImageList[i].element);
		}
		createPointEleList(imageDict.length);
		document.getElementById('left').controler = this;
		document.getElementById('right').controler = this;
		document.getElementById('left').onclick = function(){
			this.controler.pre();
		};
		document.getElementById('right').onclick = function(){
			this.controler.next();
		};
	}
	refresh(){
		this.rotationWrraper.style.left = "-"+this.positionLeft+"00%";
		changeTitleAndContent(
			this.rotationImageList[this.positionLeft]['title'],
			this.rotationImageList[this.positionLeft]['content'],
			this.rotationImageList[this.positionLeft]['href'],)
		var rotationListBtn = $('#rotationListBtn .fa');
		if(rotationListBtn.length>0){
			for (var i = 0; i < rotationListBtn.length; i++) {
				rotationListBtn[i].classList.remove("onThis");
			}
			rotationListBtn[this.positionLeft].classList.add("onThis");
		}
	}
	next(){
		if(this.positionLeft + 1 < this.itemCount){
			this.positionLeft += 1;
		}else{
			this.positionLeft = 0;
		}
		this.refresh();
	}
	pre(){
		if(this.positionLeft - 1 >= 0){
			this.positionLeft -= 1;
		}else{
			this.positionLeft = this.itemCount-1;
		}
		this.refresh();
	}
}