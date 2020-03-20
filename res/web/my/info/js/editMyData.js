class editMyDataControler {
	constructor(BTN) {
		this.BTN = BTN;
	}
	start(){
		var state = 'edit';
		this.edit = $('<div class="fa fa-pencil fa-2x"></div>').css({
			float: 'left',
			width:'50px',
			height:'50px',
			lineHeight: '50px',
			textAlign: 'center'
		});
		this.BTN.appendChild(this.edit[0]);
		
		var thisEdit = this.edit;
		var thisBTN = this.BTN;
		this.edit[0].onclick = function(){
			if(state === 'edit'){
				state = 'save';
				this.save = $('<div class="fa fa-check fa-2x"></div>').css({
					float: 'left',
					width:'50px',
					height:'50px',
					lineHeight: '50px',
					textAlign: 'center'

				});
				thisBTN.appendChild(this.save[0]);
				thisEdit.css({display: 'none'});
				thisBTN.style.width = '100px';
				thisBTN.style.borderRadius = '16px';
				this.cancel = $('<div class="fa fa-close fa-2x"></div>').css({
					float: 'left',
					width:'50px',
					height:'50px',
					lineHeight: '50px',
					textAlign: 'center'
				});
				thisBTN.appendChild(this.cancel[0]);
				
				var qqNum = $('.qq-num')[0].textContent;
				var telNum = $('.tel-num')[0].textContent;
				var userName = $('#userName')[0].textContent;
				$('.qq-num').text('');
				$('.tel-num').text('');
				$('#userName').text('');
				$('.qq-num')[0].appendChild($('<input type="text" name="qqNum"/>').val(qqNum)[0]);
				$('.tel-num')[0].appendChild($('<input type="text" name="telNum"/>').val(telNum)[0]);
				$('#userName')[0].appendChild($('<input type="text" name="schoolNum"/>').val(userName)[0]);
				
				$('.major').text('');
				$('.major').append($('<div class="major-select"></div>'));
				$('.major-select').append($('<select class="professional" name="professional"></select>'));
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
			}
			
			var thisCancel = this.cancel;
			var thisSave = this.save;
			this.cancel.hover(function(){
				thisCancel.css({color:'red'});
			},function(){
				thisCancel.css({color:'white'});
			});
			this.save.hover(function(){
				thisSave.css({color:'green'});
			},function(){
				thisSave.css({color:'white'});
			});
			
			this.cancel[0].onclick = function(){
				state = 'edit';
				thisCancel.css({display: 'none'});
				thisSave.css({display: 'none'});
				thisEdit.css({display: 'block'});
				thisBTN.style.width = '50px';
				thisBTN.style.borderRadius = '50%';
				$('.user-information-content').find('input').css({display:'none'});
				$('.qq-num').text(qqNum);
				$('.tel-num').text(telNum);
				$('#userName').text(userName);
			}
		}
	}
}