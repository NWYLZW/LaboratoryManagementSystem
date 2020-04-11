(() =>{
	class day{
		constructor(userMark,daySize,dayMargin,colorArr,callBackDict) {
			this.userMark = userMark;
			this.daySize = daySize || 20,this.dayMargin = dayMargin || 2;
			this.colorArr = colorArr || [
				"rgb( 215, 215, 215)",
				"rgb( 172, 242, 213)",
				"rgb( 172, 242, 213)",
				"rgb( 127, 209, 168)",
				"rgb( 73 , 155, 114)",
				"rgb( 73 , 155, 114)",
				"rgb( 37 , 119, 78 )",
			];
			this.callBackDict = callBackDict || {};
			this.createDayEle();
		}
		createDayEle(){
			this.jqEle = $('<div class="day"></div>').css({
				transition:".5s",
				margin: this.dayMargin+"px",
				width: this.daySize+"px",height: this.daySize+"px",
			});
			this.ele = this.jqEle[0];
			this.ele.userMark = this.userMark;
			for (let key in this.callBackDict)
				this.ele.addEventListener(key,this.callBackDict[key]);
			if(this.userMark.markNum<this.colorArr.length)
				this.ele.style.backgroundColor = this.colorArr[this.userMark.markNum];
			else
				this.ele.style.backgroundColor = this.colorArr[this.colorArr.length-1];
		}
	}
	class weekCalendar{
		constructor(userMarkListWeek,daySize,dayMargin,colorArr,callBackDict) {
			this.dayList = [];
			this.daySize = daySize || 20,this.dayMargin = dayMargin || 2;
			for (var i = 0; i < userMarkListWeek.length; i++) {
				this.dayList.push(new day(userMarkListWeek[i],this.daySize,this.dayMargin,colorArr,callBackDict));
			}
			this.createWeekEle();
		}
		createWeekEle(){
			this.jqEle = $('<div class="week"></div>').css({
				position: "relative",float: "right",
				display: "flex",
				flexDirection: "column-reverse",
				width: (this.daySize+this.dayMargin*2)+"px",height: "100%",
			});
			this.ele = this.jqEle[0];
			for (var i = 0; i < this.dayList.length; i++) {
				this.ele.appendChild(this.dayList[i].ele);
			}
			this.ele.style.height = ((this.daySize+this.dayMargin*2)*this.dayList.length)+"px";
		}
	}
	class monthCalendar{
		constructor(userMarkListMonth,daySize,dayMargin,colorArr,callBackDict) {
			this.weekList = [];
			this.daySize = daySize || 20,this.dayMargin = dayMargin || 2;
			
			var tempList = [];
			for (var i = 0; i < userMarkListMonth.length; i++) {
				tempList.push(userMarkListMonth[i]);
				if(userMarkListMonth[i].date.getDay() == 1 || i == userMarkListMonth.length-1){
					this.weekList.push(new weekCalendar(tempList,this.daySize,this.dayMargin,colorArr,callBackDict));
					tempList.splice(0, tempList.length);
				}
			}
			this.createMonthEle();
		}
		createMonthEle(){
			this.jqEle = $('<div class="month"></div>').css({
				marginLeft: "5px",
				position: "relative",float: "left",
				height: "100%",
			});
			this.ele = this.jqEle[0];
			for (var i = 0; i < this.weekList.length; i++) {
				this.ele.appendChild(this.weekList[i].ele);
				if(i == this.weekList.length-1){
					this.weekList[i].ele.style.height = (this.daySize+this.dayMargin*2)*7+"px";
				}
			}
		}
	}
	class yearCalendar{
		constructor(userMarkDict,daySize,dayMargin,colorArr,callBackDict) {
			this.monthCalendarList = [];
			this.daySize = daySize || 20,this.dayMargin = dayMargin || 2;
			var todayTemp = userMarkDict.today.split('-');
			this.today = [todayTemp[0],todayTemp[1],todayTemp[2],];
			
			var tempList = [];
			for (var i = 0; i < userMarkDict.userMarkList.length; i++) {
				this.today[2] -= 1;
				userMarkDict.userMarkList[i].date = (new Date(this.today[0],this.today[1]-1,this.today[2]+1));
				tempList.push(userMarkDict.userMarkList[i]);
				if (this.today[2] == 0) {
					this.today[1] -= 1;
					if(this.today[1]==0){
						this.today[0]-=1;
						this.today[1]=12;
					}
					if (this.today[1] == 2) {
						if ((todayTemp[0] % 4 == 0 && todayTemp[0] % 100 != 0) || (todayTemp[0] % 400 == 0))
							this.today[2] = 29;
						else
							this.today[2] = 28;
					}
					else if (this.judgeMaxMonth()){
						this.today[2] = 31;
					}
					else{
						this.today[2] = 30;
					}
					this.monthCalendarList.push(new monthCalendar(tempList,this.daySize,this.dayMargin,colorArr,callBackDict));
					tempList.splice(0, tempList.length);
				}
			}
			this.createYearEle();
		}
		judgeMaxMonth(){
			var maxMonth = [1, 3, 5, 7, 8, 10, 12]
			for(var i = 0;i < maxMonth.length;i++){
				if(this.today[1] == maxMonth[i])
					return true;
			}
			return false;
		}
		createYearEle(){
			var weekSum = 0;
			for (let i = this.monthCalendarList.length-1; i >= 0; i--) {
				weekSum += this.monthCalendarList[i].weekList.length;
			}
			var eleWidth = (this.daySize+this.dayMargin*2)*weekSum + this.monthCalendarList.length*5;
			this.jqEle = $('<div class="year"></div>').css({
				position: "relative",float: "left",
				top:"calc(50% - "+(this.daySize+this.dayMargin*2)*7/2+"px"+")",
				width: eleWidth+"px",
				height: (this.daySize+this.dayMargin*2)*7+"px",
			});
			this.ele = this.jqEle[0];
			for (let i = this.monthCalendarList.length-1; i >= 0; i--) {
				this.ele.appendChild(this.monthCalendarList[i].ele);
			}
		}
		setCss(cssDict){
			this.jqEle.css(cssDict);
			return this;
		}
		mark(){
			var today = this.monthCalendarList[0].weekList[0].dayList[0];
			today.userMark.markNum+=1;
			today.ele.style.backgroundColor = "rgba(255,255,255,1)";
			setTimeout(function() {
				if(today.userMark.markNum<today.colorArr.length)
					today.ele.style.backgroundColor = today.colorArr[today.userMark.markNum];
				else
					today.ele.style.backgroundColor = today.colorArr[today.colorArr.length-1];
			}, 500);
		}
	}
	window.yearCalendar = yearCalendar;
})();

// var userMarkDict = {
// 	today:"",
// 	userMarkList:[],
// }
// userMarkDict.today = 2020+'-'+2+'-'+23;
// userMarkDict.today = (Math.round(Math.random()*100)+1950)+'-'+(Math.round(Math.random()*11)+1)+'-'+Math.round(Math.random()*25);
// for (var i = 0; i < 365; i++) {
// 	userMarkDict.userMarkList.push({
// 		markNum:Math.round(Math.random()*6),
// 		// markNum:i,
// 	});
// }
// document.body.appendChild(
// 	new yearCalendar(userMarkDict,
// 		16,2,
// 		[
// 			"rgb( 215, 215, 215)",
// 			"rgb( 172, 242, 213)",
// 			"rgb( 172, 242, 213)",
// 			"rgb( 127, 209, 168)",
// 			"rgb( 73 , 155, 114)",
// 			"rgb( 73 , 155, 114)",
// 			"rgb( 37 , 119, 78 )",
// 		],
// 		{
// 			'mouseover':function() {
// 				this.message = $('<div></div>').css({
// 					zIndex:"100000",
// 					position:"relative",
// 					left:"calc(50% - 70px)",top:"-38px",
// 					width:"140px",height:"36px",
// 					borderRadius:"6px",
// 					boxShadow:"0 0 2px gray",
// 					fontSize:"12px",textAlign:"center",
// 					color:"rgba(255,255,255,0)",
// 					backgroundColor:"rgba(50,50,50,0)",
// 					transition:".5s",
// 				});
// 				var message = this.message;
// 				setTimeout(function() {
// 					message.css({
// 						boxShadow:"0 0 10px gray",
// 						color:"rgba(240,240,240,1)",
// 						backgroundColor:"rgba(50,50,50,1)",
// 					});
// 				}, 100);
// 				this.message.html(
// 					this.userMark.markNum+"  marks on"+'<br/>'+
// 					this.userMark.date.format("D M d,Y")
// 					);
// 				this.appendChild(this.message[0]);
// 				this.style.borderRadius = "8px";
// 				this.style.boxShadow = "0 0 5px gray";
// 			},
// 			'mouseout':function() {
// 				this.message.remove();
// 				this.style.borderRadius = "0";
// 				this.style.boxShadow = "0 0 0 gray";
// 			},
// 		})
// 	);
// userMarkDict.userMarkList.splice(0, userMarkDict.userMarkList.length);