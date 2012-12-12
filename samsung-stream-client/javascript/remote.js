var defaultUrl = "http://5.5.5.1:8080/tvserver/structure?path="

var Request = {
    
}

Request.create = function () {
    
}

Request.sendRequest = function (path) {
    alert("Request.sendRequest("+path+")");
    http = null;
	this.sendRequest = function () {
		if (http) {
			http.destroy();
		}
		http = new XMLHttpRequest();
		if (http) {
			http.onreadystatechange = function () {
				if (http.readyState == 4) {
					receiveResponse();
				}
			};
			http.open("GET", defaultUrl + escape(path), true);
			http.send(null);
		} else {
			alert("HTTP Object is NULL");
		}
	}
	var receiveResponse = function () {
		if (http.status == 200) {
			alert("Good response"); sendResultFunc(true);
		} else {
			alert("Bad response."); sendResultFunc(false);
		}

		this.getResponseJson = function () {
			return http;
		}

		this.getHttpObj = function () {
			return http;
		}

		this.abortHttpObj = function () {
			if (http) {
				http.abort();
			}
		}
	}
    alert("Request.sendRequest("+path+") End");
}

Request.receiveHandler = function (categoryID) {
   
}

Request.getCategoryData = function(categoryID) {
   
}