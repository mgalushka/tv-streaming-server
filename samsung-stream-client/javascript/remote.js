var defaultUrl = "http://5.5.5.1:8080/tvserver/structure?path="

var Request = {
    
}

Request.create = function () {
    
}

Request.sendRequest = function (path, callback) {
    alert("Request.sendRequest("+path+")");
    http = null;

	
	if (http) {
		http.destroy();
	}
	alert("http = " + http);
	http = new XMLHttpRequest();
	alert("http = " + http);
	if (http) {
		http.onreadystatechange = function () {
			if (http.readyState == 4) {
				callback();
			}
		};
		http.open("GET", defaultUrl + escape(path), true);
		alert("URL = " + defaultUrl + escape(path));
		http.send();
	} else {
		alert("HTTP Object is NULL");
	}
}

Request.receiveHandler = function (categoryID) {
   
}

Request.getCategoryData = function(categoryID) {
   
}