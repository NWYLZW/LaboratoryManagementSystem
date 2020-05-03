(() =>{
	new response("captal",439,1000).start();
	
	(() =>{
		const dataList = [
			{
				'labID':1,
				'labName':'E601',
			},{
				'labID':2,
				'labName':'F608',
			},
		];
		class controlLabListPanel{
			constructor(option) {
				this.dataList = option.dataList;
				this.generate$();
			}
			generate$(){
				const content = this;
				this.$controlLabListPanel = $('.controlLabListPanel_Content');
				for (let i = 0; i < this.dataList.length; i++) {
					this.$controlLabListPanel
						.append(
							$('<div class="controlLabListPanel_item '+(() =>{
									if(i==0) return "sel";
								})()+'">'+this.dataList[i].labName+'</div>').click(() =>{
									content.$controlLabListPanel.find('.sel').removeClass('sel');
									content.$controlLabListPanel.find('.controlLabListPanel_item')[i].classList.add('sel');
									generateTableControler(content.dataList[i].labID);
								})
						);
				}
				generateTableControler(content.dataList[0].labID);
			}
		}
		let CLL = new controlLabListPanel({
			dataList:dataList,
		});
	})();
	
	function generateTableControler(labID){
		Notiflix.Block.Dots('.controlLabDataPanel_Content');
		// const dataDict = {
		// 	"laboratory": {
		// 		"id": 1,
		// 		"blockNum": "E",
		// 		"doorNum": "601",
		// 		"content": "位于E座人工智能的实验室"
		// 	},
		// 	"journalDaybook": []
		// };
		// for (var i = 0; i < 150; i++) {
		// 	dataDict.journalDaybook.push({
		// 		"id": i,
		// 		"captalId": 1,
		// 		"changeMoneyUserId": 54,
		// 		"changeMoneyUser": {
		// 			"id": 54,
		// 			"schoolID": "201801010101",
		// 			"nickName": "实验室管理",
		// 			"maleBool": true,
		// 			"directionName": "Java",
		// 			"directionImgName": "Java",
		// 			"laboratoryName": "E-601",
		// 			"professionalClass": "网络工程-1801",
		// 			"markNumInYear": 0
		// 		},
		// 		"changeReason": "测试更改资金"+i,
		// 		"changeMoney": "0.00",
		// 		"remainingMoney": "17.70",
		// 		"dateTime": "2020-05-03 00:4"+i%10+":08",
		// 	});
		// };
		
		new myAjax({
			url:'/captal/getJournalDaybook?laboratoryId='+labID,
			method:"GET",
			success:function(result){
				__g(JSON.parse(result));
			},
			failure:function(error){
			},
			always:function(jqXHR){
			}
		}).ajax();
		
		function __g(dataDict){
			for (var i = 0; i < dataDict.journalDaybook.length; i++) {
				dataDict.journalDaybook[i] = [
					dataDict.journalDaybook[i].dateTime,
					dataDict.journalDaybook[i].changeMoneyUser.nickName,
					dataDict.journalDaybook[i].changeReason,
					dataDict.journalDaybook[i].changeMoney,
					dataDict.journalDaybook[i].remainingMoney,
				]
			};
			let tc = new TableControler({
				thNameList:['时间','负责人','原因','金额变动','余额'],
				dataList:dataDict.journalDaybook,
				generateTR:function(isOdd,dict,i){
					dict = {
						'time':dict[i][0],
						'userName':dict[i][1],
						'reason':dict[i][2],
						'changeNum':dict[i][3],
						'remainingMoney':dict[i][4],
					};
					return $('\
						<tr class="'+((isOdd) =>{
							if(isOdd) return "pure-table-odd";
							return "";
						})(isOdd)+'">\
							<td>'+(dict.time||'null')+'</td>\
							<td>'+(dict.userName||'null')+'</td>\
							<td>'+(dict.reason||'null')+'</td>\
							<td>'+(dict.changeNum||'null')+'</td>\
							<td>'+(dict.remainingMoney||'null')+'</td>\
						</tr>');
				},
			});
			
			Notiflix.Block.Remove('.controlLabDataPanel_Content', 600);
			$('.controlLabDataPanel_Content_Table')
			.empty()
			.append(tc.table$);
		};
	}
})();