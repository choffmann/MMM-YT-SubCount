/* Magic Mirror
 * Node Helper: MMM-YT-SubCount
 *
 * By Cedrik Hoffmann (https://github.com/choffmann)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const fetch = require('node-fetch');

module.exports = NodeHelper.create({

	start: function () {
		this.finalData = [];
		this.channelIds = [];
		this.apiKey = null;
		this.url = "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&part=snippet&id="
	},

	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "MMM-YT-SubCount-HERE_IS_CONFIG":
				this.apiKey = payload.apiKey;
				this.channelIds = payload.channelIds;
				this.breakDownChannelIds();
				break;
			case "UPDATE_PLEASE":
				this.crypto();
				break;
		}
	},

	breakDownChannelIds: function () {
		this.channelIds.forEach(channel => {
			this.getData(channel.id)
		});
	},

	getData: function (channelId) {
		fetch(this.url + channelId + "&key=" + this.apiKey, {
			method: 'GET',
			headers: {
				"Accept": "application/json"
			},
		})
			.then(response => response.json())
			.then(data => this.handleData(data))
			.catch(error => console.log('Error: ', error));
	},

	handleData: function (data) {
		console.log(data)
	}
});
