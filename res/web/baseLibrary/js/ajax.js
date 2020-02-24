class myAjax {
	constructor(options) {
		this.url = options.url || "/";
		this.data = options.data || null;
		this.method = options.method || "GET";
		this.success = options.success || function(result) {console.log(result);};
		this.failure = options.failure || function(e){console.log(e.status);};
		this.always = options.always || function (jqXHR){console.log(jqXHR.status);};
	}
	ajax(){
		if(this.data!=null)
			this.data = JSON.stringify(this.data);
		$.ajax({
			url:this.url,
			type:this.method,
			error:this.failure,
			success:this.success,
			data:this.data,
			contentType: "application/json;charset=UTF-8",
		}).always(this.always);
		return this;
	}
}