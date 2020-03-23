var IFC = null;
function loadEnd(){
	initIFC();
	setMyData();
	initBackAndHP();
	getMyMarkList($('.MyCalendarP')[0],function(){
		var yearCalendarScroll = new IScroll('.MyCalendarP', {
			scrollX: true,
			scrollY: false,
			mouseWheel: true,
			scrollbars: true,
		});
		yearCalendarScroll.refresh();
		window.addEventListener('resize',function(){
			yearCalendarScroll.refresh();
		});
	});
	new editMyDataControler($('.editBTN')[0]).start();
	initPrivateInput();
}
function initPrivateInput(){
	var inputList = document.getElementsByClassName('formContent-input');
	for (var i = inputList.length-1; i >= 0; i--) {
		let inputLabel = inputList[i];
		inputLabel.input = inputLabel.getElementsByTagName('input')[0];
		inputLabel.input.addEventListener('focus',function(){
			inputLabel.classList.add('formContent-inputClick');
		})
		inputLabel.input.addEventListener('blur',function(){
			if(this.value==0)
				inputLabel.classList.remove('formContent-inputClick');
		})
		inputLabel.onfocus = function(){
			this.classList.add('formContent-inputClick');
			this.input.focus();
		}
		inputLabel.onblur = function(){
			if(this.value==0)
				inputLabel.classList.remove('formContent-inputClick');
		}
	}
	$(".inputMailList").mailAutoComplete();
}
function initBackAndHP(){
	getBackground($('.backgroundImage')[0]);
	getMyHeadPortrait($('.myHeadPortrait')[0]);
	$('.editMyHeadPortrait')[0].onclick = function(){
		IFC.pop('../my/changeHeadPortrait');
	}
	$('.change-background')[0].onclick = function(){
		IFC.pop('../my/changeBackground');
	}
	$('.deleterBtn')[0].onclick = function(){
		IFC.close();
		getBackground($('.backgroundImage')[0]);
		getMyHeadPortrait($('.myHeadPortrait')[0]);
	}
}
function initIFC(){
	IFC = new (function(){
		var iframe = $('#iframe-wrapper');
		this.pop = function(src){
			iframe.find('iframe')[0].src = src;
			Notiflix.Block.Circle('#iframe-wrapper', '加载中...');
			iframe.find('iframe')[0].onload = function(){
				Notiflix.Block.Remove('#iframe-wrapper',500);
			};
			iframe[0].style.display = 'block';
			iframe[0].style.opacity = '1';
		}
		this.close = function(){
			iframe[0].style.opacity = '0';
			setTimeout(function() {iframe[0].style.display = 'none';}, 500);
		}
		return this;
	})();
}
function setMyData(){
	getMyData(function(result){
		$('.permission-kind')[0].textContent = result.roleName;
		$('.qq-num')[0].textContent = result.qqNum;
		$('.tel-num')[0].textContent = result.telNum;
		var professionalClass = result.professionalClass.split('-');
		$('.major')[0].textContent = professionalClass[0];
		$('.class-num')[0].textContent = professionalClass[1];
		$('.bottom-top-mid-in')[0].textContent = result.schoolID;
		$('.bottom-top-mid-in')[1].textContent = result.nickName;
		
		$('.tagList')
		.append($('<div title="'+
		(function (sex) {
			if(!sex) return '女';else return '男';
		})(result.maleBool)+'" class="tag-ico sex"><i class="fa fa-'+
		(function (sex) {
			if(!sex) return 'fe';else return '';
		})(result.maleBool)+
		'male fa-1x"></i></div>'))
		.append($('<div title="'+result.directionName+'" class="tag-ico"><img class="'+result.directionImgName+'Ico"></img></div>'))
		.append($('<div class="tag-text">'+result.laboratoryName+'</div>'));
	});
}
loadEnd();