class myAjax {
	constructor(method,url,data,succeed,failure) {
		this.method = method || "GET";
		this.url = "http://localhost:16000" + (url || "/");
		this.data = data || {};
		this.success = succeed || function(result) {console.log(result);};
		this.failure = failure || function(e){console.log(e.status);console.log(e.status);};
		return this;
	}
	setUrl(url) {
		this.url = "http://localhost:16000" + (url || "/");
	}
	ajax(){
		$.ajax({
			url:this.url,
			type:this.method,
			error:this.failure,
			success:this.success,
			data:JSON.stringify(this.data),
			contentType: "application/json;charset=UTF-8",
		})
	}
}