var mqtt = require('mqtt')

var client  = mqtt.connect('wss://www.vishalpandey.xyz:8080')

client.on('connect', function () {
  client.subscribe('iotswitch', function (err) {
    if (!err) {
      client.publish('iotswitch', 'My Cannel Testing 1')
    }
  })
})


client.on('message', function (topic, message) {
	if (window.location.pathname == '/') {
	  if (message.toString() == '1') {
	  	console.log("On")

	  	document.querySelector('.off').style = 'display:none';
	  	document.querySelector('.on').style = 'display:flex';
	  }else if(message.toString() == '0'){
	  	console.log("Off")
	  	document.querySelector('.off').style = 'display:flex';
	  	document.querySelector('.on').style = 'display:none';
	  }
	}
	if (window.location.pathname == '/control.html') {
	  if (message.toString() == '1') {
	  	console.log("On")
	  	document.querySelector('.button-on').setAttribute('disabled', true);
			document.querySelector('.button-off').removeAttribute('disabled');
	  }else if(message.toString() == '0'){
	  	console.log("Off")
	  	document.querySelector('.button-on').removeAttribute('disabled');
			document.querySelector('.button-off').setAttribute('disabled', true);
	  }
	}
})


window.onload = ()=>{
	if (window.location.pathname == '/control.html') {
		document.querySelector('.button-on').addEventListener('click', ()=>{
			client.publish('iotswitch', '1')
		})
		document.querySelector('.button-off').addEventListener('click', ()=>{
			client.publish('iotswitch', '0')
		})
	}
}
