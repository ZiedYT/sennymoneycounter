var element
var bags
var current = 0
var target = 500
document.addEventListener("DOMContentLoaded", function() {
    element = document.querySelector('#money');
    element.textContent = "DROP LEGO SET: "+ current+"/"+ target 

});    
function update(){
  element.textContent = "DROP LEGO SET: "+ current+"/"+ target 
}



var urlParams = new URLSearchParams(window.location.search);
const channelname = urlParams.get('channel'); 
const oauthToken =urlParams.get('key');  
const token =urlParams.get('jwt');  

console.log(token)
current = parseInt( localStorage.getItem("current-progress-bar-"+channelname) || 0) ;
console.log(current)

if(current==NaN)
  current=0;
// Define configuration options
const opts = {
  identity: {
    username: 'botreading',
    password: oauthToken
  },
  channels: [
    channelname
  ]
};

// Create a client with our options
const client = new tmi.client(opts);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (chan, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  var text = msg.trim();
  if( context.username.toLowerCase() == channelname.toLowerCase() || context.mod){
    if(text.split(" ")[0] == "!goal"){
        var bagnumb = parseInt(text.split(" ")[1]);
        if( !isNaN(bagnumb) ){
            target = bagnumb;
            current=0
            console.log(bagnumb)
            element.textContent = "DROP LEGO SET: "+ current+"/"+ target 
        }
    }
    else if(text.split(" ")[0] == "!current"){
        var bagnumb = parseFloat(text.split(" ")[1]);
        if( !isNaN(bagnumb) ){
            current = bagnumb;
            
            element.textContent = "DROP LEGO SET: "+ current+"/"+ target 
        }
    }
    else if(text.split(" ")[0] == "!clear"){

        current = 0;
        element.textContent = "DROP LEGO SET: "+ current+"/"+ target 
      
  }

  }
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

