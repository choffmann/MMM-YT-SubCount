/* Magic Mirror
 * Module: MMM-YT-SubCount
 *
 * By Cedrik Hoffmann (https://github.com/choffmann)
 * MIT Licensed.
 */

Module.register("MMM-YT-SubCount", {
  defaults: {
    apiKey: "",
    channelIds: [
      {
        id: ""
      }
    ],
    showChannelImg: true,
    updateInterval: 60000
  },

  requiresVersion: "2.1.0", // Required version of MagicMirror

  start: function () {
    var self = this;
    this.finalPayload = [];

    // Schedule update timer.
    this.sendSocketNotification("MMM-YT-SubCount-HERE_IS_CONFIG", this.config);
    setInterval(function () {
      self.updateDom();
    }, this.config.updateInterval);
  },

  getDom: function () {
    var self = this;

    var wrapper = document.createElement("div");
    wrapper.id = "MMM-YT-SubCount-root";
    if (this.finalPayload !== undefined) {
      this.finalPayload.items.forEach((item) => {
        var section = document.createElement("div");
        section.id = "MMM-YT-SubCount-container";

        var img = document.createElement("div");
        img.innerHTML = `<img src="${item.snippet.thumbnails.default.url}" width="${item.snippet.thumbnails.default.width}" height="${item.snippet.thumbnails.default.height}">`;
        section.appendChild(img);

        var content = document.createElement("div");
        content.id = "MMM-YT-SubCount-content";

        var title = document.createElement("p");
        title.id = "MMM-YT-SubCount-title";
        title.innerText = `${item.snippet.title}`;

        var count = document.createElement("div");
        count.id = "MMM-YT-SubCount-count";
        count.innerHTML = `<p class="mdi mdi-youtube">${this.numFormatter(
          item.statistics.subscriberCount
        )}`;

        if (!this.config.showChannelImg) {
          img.style.visibility = "hidden";
        }

        content.appendChild(title);
        content.appendChild(count);
        section.appendChild(content);
        wrapper.appendChild(section);
      });
    }

    return wrapper;
  },

  numFormatter: function (num) {
    if (Math.abs(num) > 999999) {
      return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M";
    } else if (Math.abs(num) > 999) {
      return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K";
    } else {
      return Math.sign(num) * Math.abs(num);
    }
  },

  getScripts: function () {
    return [];
  },

  getStyles: function () {
    return [
      "MMM-YT-SubCount.css",
      "https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css"
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

  // socketNotificationReceived from helper
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-YT-SubCount-DATA_IS_READY") {
      this.finalPayload = payload;
      this.updateDom();
    }
  }
});
