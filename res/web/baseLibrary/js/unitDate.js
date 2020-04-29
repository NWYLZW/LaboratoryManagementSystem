(() =>{
	class dateInterval{
		constructor(date) {
			this.date = date;
		}
		judgeTime(){
			var date = this.date.toString();
			var year = date.substring(0, 4);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			var d1 = new Date(year + '/' + month + '/' + day);
			var dd = new Date();
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1;
			var d = dd.getDate();
			var d2 = new Date(y + '/' + m + '/' + d);
			var iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
			if(iday < 30){
				if(iday == 0)
					return '今天';
				else if(iday == 1)
					return '昨天';
				else if(iday == 2)
					return '前天';
				else
					return iday+'天前';
			  }
			else if(iday < 360){
				return Math.ceil(iday/30) + '月内';
			}
			else{
				return Math.ceil(iday/360) + '年内';
			}	
		}
	}
	window.dateInterval = dateInterval;
})();
