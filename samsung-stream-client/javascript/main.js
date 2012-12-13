var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var SERVER = "127.0.0.1:8080";

var pluginPlayer;
var pluginNNavi;

var isStarted = false;
var current;

var activeItem = "link_0";

var content;

var Main = 
{
}

Main.onLoad = function()
{
	// To enable the key event processing
	document.getElementById("anchor").focus();
	
	// Set Default key handler function
	widgetAPI.sendReadyEvent();
	
	// get player object
	pluginPlayer = document.getElementById("pluginPlayer");
	
	content = document.getElementById("content");
	document.getElementById("content").focus();
	
	// get firmware object
    //pluginNNavi = document.getElementById("pluginNNavi");

    //var firmware = pluginNNavi.GetFirmware();

	// TODO: fix this with dynamic URL
    //pluginPlayer.InitPlayer("http://" + SERVER + "/tvserver/structure?path=G:/Music/Yiruma/1.mp3");
	
	Request.create();
	Request.sendRequest("", Main.Callback);
	
	/*
    if(firmware > 'T-INFOLINK2011') {
		pluginPlayer.SetPlayerProperty(5, "MP3", 0);
    }
	*/
	
}

Main.onUnload = function()
{

}

Main.MainKeyHandler = function()
{
	var keyCode = event.keyCode;

	switch(keyCode)
	{
		case tvKey.KEY_PAUSE:
			alert("PAUSE");
			pluginPlayer.Pause();
			break;
		case tvKey.KEY_PLAY:
			alert("PLAY");
			if(!isStarted){
				pluginPlayer.StartPlayback();
				isStarted = true;
			}
			else{
				pluginPlayer.Resume();
			}
			break;
		case tvKey.KEY_STOP:
			alert("STOP");
			pluginPlayer.Stop();
			isStarted = false;
			break;
		case tvKey.KEY_RW:
			alert("BACK SEARCH");
			pluginPlayer.JumpBackward(10);
			break;
		case tvKey.KEY_FF:
			alert("FORWARD SEARCH");
			pluginPlayer.JumpForward(10);
			break;
		case tvKey.KEY_ENTER:
			alert("ENTER");
			var type = document.getElementById(activeItem).getAttribute("type");
			alert("ENTER TYPE: " + type);
			if(type == "MEDIA"){
				Main.StartPlayback(document.getElementById(activeItem).href);
			}
			else{
				Main.Content(document.getElementById(activeItem).href);
			}
            break;
		case tvKey.KEY_UP:
			var currentIndex = parseInt(activeItem.substring(activeItem.indexOf("_")+1));
			if(currentIndex > 0){
				alert("Current: " + currentIndex);
				alert("Next: " + (currentIndex-1));
				activeItem = "link_" + (currentIndex-1);
				Main.updateActive();
			}
			break;
		case tvKey.KEY_DOWN:
			var currentIndex = parseInt(activeItem.substring(activeItem.indexOf("_")+1));
			alert("Current: " + currentIndex);
			alert("Next: " + (currentIndex+1));
			activeItem = "link_" + (currentIndex+1);
			Main.updateActive();
			break;
		default :
			break;
	}
}

Main.StartPlayback = function(path){
	alert("Start payback: " + path);
	// clear content
	Main.clearContent();
	
	// init player and play
	// TODO: improve URLS handling across the application
	alert("Init with: " + "http://" + SERVER + "/tvserver/content?path=" + path);
	pluginPlayer.InitPlayer("http://" + SERVER + "/tvserver/content?path=" + path);
	pluginPlayer.StartPlayback();	
	isStarted = true;
	alert("started");
	document.getElementById("anchor").focus();
}

Main.Content = function(path){
	alert("AJAX to: " + path);
	// clear content
	Main.clearContent();
	Request.sendRequest(path, Main.Callback);
}

Main.Callback = function(jsonString){
	// cleanup
	Main.clearContent();
	alert("callback: " + jsonString);
	
	var contents = "<ul>";
	var json = eval("("+jsonString+")");
	alert("callback path testing: " + json.paths[0].path);
	contents += "<a id='link_0' href='" + json.parent + "'>&lt;&lt;" + json.parent + "</a>";

	for(var i=0; i<json.paths.length; i++){
		if(json.paths[i].type == "MEDIA"){
			//var URL = "http://" + SERVER + "/tvserver/content?path=" + escape(json.paths[i].path);
			contents += "<li><a id='link_" + (i+1) + "' href='" + json.paths[i].path + "' type='MEDIA'>PLAY&gt;&gt;&nbsp;&nbsp;&nbsp;" + json.paths[i].path + "</a></li>";
		}		
		else{
			//var URL = "http://" + SERVER + "/tvserver/structure?path=" + escape(json.paths[i].path);
			contents += "<li><a id='link_" + (i+1) + "' href='" + json.paths[i].path + "' type='OTHER'>" + json.paths[i].path + "</a></li>";
		}
	}
	contents += "</ul>";
	widgetAPI.putInnerHTML(content, contents);
	Main.updateActive();
}

Main.clearContent = function(){
	activeItem = "link_0";
	widgetAPI.putInnerHTML(content, "");
}

Main.updateActive = function(){
	alert("Try focus to: " + activeItem);
	if(document.getElementById(activeItem)){
		alert("Focus to: " + activeItem);
		document.getElementById(activeItem).focus();	
	}
	else{
		alert("No more elements in the list");
	}
}

