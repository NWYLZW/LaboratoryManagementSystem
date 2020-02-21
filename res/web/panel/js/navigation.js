class navigationResponse extends response {
	constructor(proName, left, right, myScroll) {
		super(proName, left, right);
		this.myScroll = myScroll.c;
		this.start();
	}
	refresh(statux) {
		super.refresh(statux);
		var myScroll = this.myScroll;
		setTimeout(function() {
			myScroll.refresh();
		}, 500);
		if(this.statux == 2){
			$('.interface')[0].style.left = "100px";
			$('.interface')[0].style.width = "calc(100% - 140px)";
		}
		else if(this.statux == 3){
			$('.interface')[0].style.left = "250px";
			$('.interface')[0].style.width = "calc(100% - 290px)";
		}
	}
	start() {
		super.start();
		var navigationEle = document.getElementById('navigation_ico');
		navigationEle.response = this;
		navigationEle.judge = [true, true, true]
		navigationEle.onclick = function() {
			var offsetWid = document.documentElement.clientWidth;
			if (offsetWid <= 640) {
				if (this.judge[0]) this.response.refresh(3);
				else this.response.refresh(1);
				$('.interface')[0].style.left = "0";
				$('.interface')[0].style.width = "calc(100% - 40px)";
				this.judge[0] = !this.judge[0];
			} else if (offsetWid > 640 && offsetWid < 1000) {
				if (this.judge[1]){
					this.response.refresh(3);
				}
				else{
					this.response.refresh(2);
				}
				this.judge[1] = !this.judge[1];
			} else {
				if (this.judge[2]){
					this.response.refresh(2);
				}
				else{
					this.response.refresh(3);
				}
				this.judge[2] = !this.judge[2];
			}
		}
	}
}
