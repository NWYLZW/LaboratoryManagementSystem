class editMyDataControler {
	constructor() {
		this.BTN = $('.editBTN')[0];
		var content = this;
		this.edit = $('<div class="fa fa-pencil fa-2x"></div>')
		.css({
			float: 'left',
			width:'50px',
			height:'50px',
			lineHeight: '50px',
			textAlign: 'center'
		});
		this.save = $('<div class="fa fa-check fa-2x"></div>')
		.css({
			float: 'left',
			width:'50px',
			height:'50px',
			lineHeight: '50px',
			textAlign: 'center',
			transition: '.5s',
		})
		.hover(function(){
			$(this).css({color:'green'});
		},function(){
			$(this).css({color:'white'});
		});
		this.cancel = $('<div class="fa fa-close fa-2x"></div>')
		.css({
			float: 'left',
			width:'50px',
			height:'50px',
			lineHeight: '50px',
			textAlign: 'center',
			transition: '.5s',
		})
		.hover(function(){
			$(this).css({color:'red'});
		},function(){
			$(this).css({color:'white'});
		});
		$(this.BTN)
		.append(this.edit)
		.append(this.save)
		.append(this.cancel);
		
		this.save.click(function(){
			content.submitForm();
		});
		this.cancel.click(function(){
			content.cancel.css({display: 'none'});
			content.save.css({display: 'none'});
			content.edit.css({display: 'block'});
			content.BTN.style.width = '50px';
			content.BTN.style.borderRadius = '50%';
			$('.user-information-content').find('input').css({display:'none'});
			
			$('.qq-num').text(content.qqNum);
			$('.tel-num').text(content.telNum);
			$('#userName').text(content.userName);
			$('.major').text(content.major);
			$('.sex').html(content.sex)
			.css({
				borderRadius:"",
				backgroundColor:"",
			})[0].onclick = function(){};
		});
		this.edit.click(function(){
			content.cancel.css({display: 'block'});
			content.save.css({display: 'block'});
			content.edit.css({display: 'none'});
			content.BTN.style.width = '100px';
			content.BTN.style.borderRadius = '16px';
			
			content.qqNum = $('.qq-num')[0].textContent;
			content.telNum = $('.tel-num')[0].textContent;
			content.userName = $('#userName')[0].textContent;
			$('.qq-num').text('');
			$('.tel-num').text('');
			$('#userName').text('');
			$('.qq-num').append($('<input class="data-input" type="text" name="qqNum"/>').val(content.qqNum));
			$('.tel-num').append($('<input class="data-input" type="text" name="telNum"/>').val(content.telNum));
			$('#userName').append($('<input class="data-input" type="text" name="schoolNum"/>').val(content.userName));
			
			content.major = $('.major')[0].textContent;
			$('.major').text('');
			$('.major').append($('\
			<div class="major-select">\
				<select class="professional" name="professional">\
				</select>\
			</div>'));
			var selectList = [
				['.professional','请选择专业'],
			];
			var slectContro = new SelectControler(selectList).refresh();
			new myAjax({
				url:'../user/getProfessionalList',
				method:"POST",
				success:function(result){
					result = JSON.parse(result);
					let professionalList = [];
					let professionalExistList = [];
					for (let key in result) {
						if(professionalExistList.indexOf(result[key].professional)==-1){
							professionalExistList.push(result[key].professional);
							professionalList.push({
								value:key,
								text:result[key].professional,
							});
						}
					}
					slectContro.appendOption($('.professional'),professionalList);
				},
				failure:function(error){},
				always:function(jqXHR){}
			}).ajax();
			
			content.sex = $('.sex').html();
			$('.sex')
			.append($('\
			<select name="Sex">\
				<option value="-1" selected="selected">未选择</option>\
				<option value="0">男</option>\
				<option value="1">女</option>\
			</select>\
			'))
			.css({
				borderRadius:"50%",
				backgroundColor:"rgba(230,230,230)",
			});
			$('.sex')[0].onclick = function(){
				var sexI = $(this).find('.fa');
				var sexSelect = $(this).find('select');
				if(sexI.hasClass('fa-male')){
					sexI.removeClass('fa-male').addClass('fa-female');
					sexSelect.val('1');
				}else{
					sexI.removeClass('fa-female').addClass('fa-male');
					sexSelect.val('0');
				}
			};
		});
	}
	submitForm(){
		var content = this;
		var formData = new FormData(
			$('<form></form>')
				.append($('.sex select').clone().val($('.sex select').val()))
				.append($('.major select').clone())[0]
		);
		formData.set('name',$('#userName input').val());
		formData.set('telNum',$('.tel-num input').val());
		formData.set('QQ',$('.qq-num input').val());
		if($('.major select').val()==null){
			formData.set('professional',-1);
		}
		// for (let keys of formData.entries()) {
		// 	console.log(keys);
		// }
		new myAjaxForm({
			url:'../../my/editMyBaseData',
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
				content.cancel.css({display: 'none'});
				content.save.css({display: 'none'});
				content.edit.css({display: 'block'});
				content.BTN.style.width = '50px';
				content.BTN.style.borderRadius = '50%';
				$('.user-information-content').find('input').css({display:'none'});
				
				$('.qq-num')
				.text(formData.get('QQ'));
				$('.tel-num')
				.text(formData.get('telNum'));
				$('#userName')
				.text(formData.get('name'));
				if($('.major select').val()!=null){
					$('.major')
					.text($('.major select option:selected').text());
				}else $('.major').text(content.major);
				$('.sex')
				.css({
					borderRadius:"",
					backgroundColor:"",
				})[0].onclick = function(){};
				$('.sex select').remove();
			},
			responseError:function(){},
			failureEnd:function(){},
		}).ajax();
	}
}