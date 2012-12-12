var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var pluginPlayer;
var pluginNNavi;

var isStarted = false;
var current;

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
	
	// get firmware object
    //pluginNNavi = document.getElementById("pluginNNavi");

    //var firmware = pluginNNavi.GetFirmware();

	// TODO: fix this with dynamic URL
    pluginPlayer.InitPlayer("http://5.5.5.1:8080/tvserver/structure?path=G:/Music/Yiruma/1.mp3");
	
	

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
		default :
			break;
	}
}

Main.Content = function()
{
	var contents = "";
	
	widgetAPI.putInnerHTML(content, contents);
}


