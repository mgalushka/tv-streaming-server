var Server =
{
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    
    XHRObj : null,
    url : "http://127.0.0.1:8080/tvserver/content?path=D:/Media/Screencasts"
}

Server.init = function()
{
    var success = true;

    if (this.XHRObj)
    {
        this.XHRObj.destroy();  // Save memory
        this.XHRObj = null;
    }
    
    return success;
}

Server.fetchVideoList = function()
{
    if (this.XHRObj == null)
    {
        this.XHRObj = new XMLHttpRequest();
    }
    
    if (this.XHRObj)
    {
        this.XHRObj.onreadystatechange = function()
            {
                if (Server.XHRObj.readyState == 4)
                {
                    Server.createVideoList();
                }
            }
            
        this.XHRObj.open("GET", this.url, true);
        this.XHRObj.send(null);
     }
    else
    {
        alert("Failed to create XHR");
    }
}

Server.createVideoList = function()
{
    if (this.XHRObj.status != 200)
    {
        Display.status("XML Server Error " + this.XHRObj.status);
    }
    else
    {
		var json = eval("("+this.XHRObj.responseText+")");
        
        if (!json)
        {
            alert("Failed to get valid JSON");
        }
        else
        {
            // Parse JSON
            var items = json.paths;
            
            var videoNames = [ ];
            var videoURLs = [ ];
            var videoDescriptions = [ ];
            
			var outIndex = 0;
            for (var index = 0; index < items.length; index++){
				if(items[index].type == "MEDIA"){
					var titleElement = items[index].path.substring(items[index].path.lastIndexOf("/")+1);
					// TODO 2.0
					var descriptionElement = " ";
					var linkElement = items[index].path;               
					if (titleElement && descriptionElement && linkElement){
						videoNames[outIndex] = titleElement;
						videoURLs[outIndex] = linkElement;
						videoDescriptions[outIndex] = descriptionElement;
						outIndex++;
					}
				}
			}
        
            Data.setVideoNames(videoNames);
            Data.setVideoURLs(videoURLs);
            Data.setVideoDescriptions(videoDescriptions);
            
            if (this.dataReceivedCallback)
            {
                this.dataReceivedCallback();    /* Notify all data is received and stored */
            }
        }
    }
}
