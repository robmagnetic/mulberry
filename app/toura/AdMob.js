dojo.provide('toura.AdMob');

/**
 *
 */


dojo.declare('toura.AdMob', null, {

  /**
   * @constructor
   * @param {String} id  The site ID to associate with publisher id
   *
   * Subscribes to various application events.
   */
  constructor : function (id) {
    //can do pub/sub type stuff in here if needed
    //need to listen for orientation change

    this.loadBanner(id, mulberry.Device.type, window.orientation);

    window.addEventListener("orientationchange", dojo.hitch(this, function() {
      this.destroy();
      this.loadBanner(id, mulberry.Device.type, window.orientation);
    }, false));

  },

  /**
   * @loadBanner
   * @param {String} id  The site ID to associate with publisher id
   * @param {String} deviceType Type of device - phone or tablet
   * @param {int} x   The x position value for the banner to display
   * @param {int} y   The y position value for the banner to display
   * @param {int} h   The height of the banner
   * @param {int} w   The width of the banner
   * @param {int} lat The latitude of the location of the device
   * @param {int} lon The longitude of the location of the device
   *
   * Calls the phonegap plugin to create, load, and then move the banner into place.
   */
  loadBanner : function (id, deviceType, orientation) {

    window.plugins.adMob.createBanner(id, deviceType);

    switch(window.orientation) {
      //Portrait
      case 0:
      case 180:
        window.plugins.adMob.moveBanner(id, deviceType, 0, window.innerHeight); // these values need to be dynamic based on device?
        break;
      //Landscape
      case -90:
      case 90:
        window.plugins.adMob.moveBanner(id, deviceType, window.innerWidth / 2, window.innerHeight); // these values need to be dynamic based on device?
        break;
      default:
        window.plugins.adMob.moveBanner(id, mulberry.Device.type, 0, window.innerHeight);
        break;
    }

  },

  /**
   * @destroy
   *
   * Deletes banner ad in native code
   */
  destroy : function () {
    console.log('destroy');
    window.plugins.adMob.deleteBanner();
  }
});

(function(){
  dojo.subscribe('/app/ready', function() {
    var amConfig = mulberry.app.Config.get('app');

    if ( amConfig.ad_mob ) {
      toura.AdMob = new toura.AdMob(amConfig.ad_mob.publisher_id);
    } else {
      return;
    }

  });
}());
