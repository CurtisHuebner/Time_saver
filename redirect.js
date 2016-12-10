
var block_data = {"times":[]};

Date.prototype.setDay = function(dayOfWeek) {
    this.setDate(this.getDate() - this.getDay() + dayOfWeek);
}


function updateData(){
  chrome.storage.sync.get("data", function(data) {
    if (data["data"] != null){
        block_data = data["data"];
    }
    jsonString = JSON.stringify(data["data"],null,'\t');
    //console.log("Data updated!");
    //console.log(jsonString);
  });
}


function isAllowed(url,timeStamp){
    times = block_data["times"]
    date = new Date(timeStamp);
    //Check validity of url
    for (var i = 0;i < times.length;i++){
        time = times[i]
        var startDate = new Date(timeStamp);
        startDate.setDay(time["startDay"]);
        startDate.setHours(time["startHour"]);
        startDate.setMinutes(time["startMinute"]);

        var endDate = new Date(timeStamp);
        endDate.setDay(time["endDay"]);
        endDate.setHours(time["endHour"]);
        endDate.setMinutes(time["endMinute"]);
        if(!(startDate < date && endDate > date)){
            //console.log(JSON.stringify(time["urls"],null,'\t'))
            urls = time["urls"]
            for (var j = 0;j < urls.length;j++){
                if (url.indexOf(urls[j]) != -1){
                    //console.log(url+" blocked!");
                    return false;
                }
            }
        }
    }
    //console.log(url)
    return true;
}

updateData()
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        url = details.url;
        timeStamp = details.timeStamp;
        return {cancel:!isAllowed(url,timeStamp)};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);
