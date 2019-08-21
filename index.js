var mqtt = require('mqtt')

window.onload = ()=>{
	var btn = document.querySelector('.submit').addEventListener('click', (e)=>{
		e.preventDefault()
		var client  = mqtt.connect('wss://www.vishalpandey.xyz:8080')


		var mytopic = document.querySelector('input').value

		client.on('connect', function () {
		  client.subscribe(mytopic, function (err) {
		    if (!err) {
		      client.publish(mytopic, 'My Cannel Testing 1')
		    }
		  })
		})

		// client.on('message', function (topic, message) {
		//   console.log(message.toString())
		// })
	})
}
