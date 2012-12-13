var SERVER = "127.0.0.1:8080";
var defaultUrl = "http://" + SERVER +"/tvserver/structure?path=";

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
				alert(http.responseText);
				callback(http.responseText);
			}
		};
		http.open("GET", defaultUrl + (path), true);
		alert("URL = " + defaultUrl + (path));
		http.send();
	} else {
		alert("HTTP Object is NULL");
	}
}

Request.receiveHandler = function (categoryID) {
   
}

Request.getCategoryData = function(categoryID) {
   
}