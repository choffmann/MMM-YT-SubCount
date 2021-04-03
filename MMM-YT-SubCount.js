/* global Module */

/* Magic Mirror
 * Module: MMM-YT-SubCount
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

Module.register("MMM-YT-SubCount", {
	defaults: {
		apiKey: '',
		channelIds: [
			{
				id: '',
				name: null
			}
		],
		showChannelImg: true,
		updateInterval: 60000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function () {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		this.sendSocketNotification('MMM-YT-SubCount-HERE_IS_CONFIG', this.config);
		setInterval(function () {
			self.updateDom();
		}, this.config.updateInterval);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function () {

	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function (delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad;
		var self = this;
		setTimeout(function () {
			self.getData();
		}, nextLoad);
	},

	getDom: function () {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		var h = document.createElement("p");
		h.innerHTML = this.translate("Hello World");
		wrapper.appendChild(h);

		return wrapper;
	},

	getScripts: function () {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-YT-SubCount.css",
		];
	},

	// Load translations files
	getTranslations: function () {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	processData: function (data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed); }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("MMM-YT-SubCount-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-YT-SubCount-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
