class permissionItemSelect{
	constructor(permissionList,select,pre) {
		this.permissionList = permissionList;
		this.select = select;
		this.pre = pre;
		this.generateEle();
	}
	generateEle(){
		var content = this;
		var root = this.pre;
		this.count = 0;
		this.jqEle = $('<div class="permissionSelectEle"></div>');
		this.permissionItemListjqEle = $('<div class="permissionItemList"></div>');
		for (let item in this.permissionList) {
			try{
				if(item==this.select) var color = "rgba(130,250,30)";
				else var color = "rgba(250,250,250)";
				this.permissionItemListjqEle
				.append($('<div class="permissionItem"></div>')
					.text(this.permissionList[item])
					.append($('<div class="select_circle"></div>')
						.css({
							backgroundColor: color,
						})
						.click(function(){
							$(this).parent().parent()[0].refresh(this,item);
							root.getSelectPermission().text(content.permissionList[item]);
						})
					)
				)
				this.count++;
			}catch(e){
				console.log(e);
			}
		}
		this.permissionItemListjqEle[0].refresh = function(select,item){
			this.selectItemId = item;
			var selectCircle = this.getElementsByClassName('select_circle');
			for (var i = 0; i < selectCircle.length; i++) {
				if(selectCircle[i] === select){
					selectCircle[i].style.backgroundColor = "rgba(130,250,30)";
				}
				else{
					selectCircle[i].style.backgroundColor = "rgba(250,250,250)";
				}
			}
		}
		
		this.jqEle
		.append(this.permissionItemListjqEle)
		.append($('<div class="userSelectEleBottom"></div>')
			.append($('<div class="confirmBTN">确认</div>')
				.click(function(){
					new myAjaxForm({
						url:'../admin/editPermission',
						data:{
							userId:root.dictx.id,
							permissionId:content.getSelectItemId(),
						},
						method:"POST",
						typeSpecialDeal:{
							'-4001':function(dictObj){
								dialog({
									title: '消息提示',
									content: dictObj.content,
									padding: '40px',
								}).show();
								content.hiden();
							}
						},
						responseCorrect:function(){},
						responseError:function(){},
						failureEnd:function(){},
					}).ajax();
				})
			)
			.append($('<div class="cancleBTN">取消</div>')
				.click(function(){
					content.hiden();
				})
			)
		);
	}
	getSelectItemId(){
		return this.permissionItemListjqEle[0].selectItemId;
	}
	show(){
		this.jqEle.css({
			height:this.count*46+70+"px",
		})
	}
	hiden(){
		this.jqEle.css({
			height:"0",
		})
	}
}
class permissionUserItem{
	constructor(dictx,permissionList) {
		this.dictx = dictx;
		this.permissionList = permissionList;
		this.generateEle();
	}
	generateEle(){
		var content = this;
		this.jqEle = 
		$('<div class="permissionUserItem"></div>')
		.append(
			$('<div class="userContentEle"></div>')
			.append($('<div class="userHeadPortrait"></div>')
				.css({
					backgroundImage: "url(../../baseLibrary/img/HeadPortrait/"+Math.round(Math.random()*9)+".jpg)",
				})
			)
			.append($('<div class="userContent"></div>')
				.append($('<div class="userContentName"></div>')
					.append($('<div class="userID"></div>')
						.html(this.dictx.schoolID+" ")
					)
					.append($('<div class="userNickName"></div>')
						.text(this.dictx.nickName)
					)
				)
				.append($('<div class="userContentMessage"></div>')
					.append($('<div class="direction-ico"></div>')
						.css({
							backgroundImage: "url(../../baseLibrary/img/direction/"+this.dictx.directionName+".png)",
						})
					)
				)
			)
			.append($('<div class="userPermission"></div>')
				.append($('<div class="selectPermission"></div>')
					.text(this.permissionList[this.dictx.roleId])
					.click(function(){
						content.permissionItemSelect.show();
					})
				)
			)
		);
		this.permissionItemSelect = 
			new permissionItemSelect(this.permissionList,this.dictx.roleId,this);
		this.jqEle
		.append(
			this.permissionItemSelect.jqEle
		);
	}
	getSelectPermission(){
		return this.jqEle.find('.selectPermission');
	}
}
class permissionEditUserItem extends itemModel{
	constructor(){super();}
	generateEle(dictx,index,root){
		console.log(dictx);
		return new permissionUserItem(dictx,permissionList).jqEle[0];
	}
}

