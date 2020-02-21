class myAjax {
	constructor(options) {
		this.url = options.url || "/";
		this.data = options.data || {};
		this.method = options.method || "GET";
		this.success = options.success || function(result) {console.log(result);};
		this.failure = options.failure || function(e){console.log(e.status);};
		this.always = options.always || function (jqXHR){console.log(jqXHR.status);};
	}
	ajax(){
		$.ajax({
			url:this.url,
			type:this.method,
			error:this.failure,
			success:this.success,
			data:JSON.stringify(this.data),
			contentType: "application/json;charset=UTF-8",
		}).always(this.always);
	}
}