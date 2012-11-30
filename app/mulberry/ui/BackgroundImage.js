dojo.provide('mulberry.ui.BackgroundImage');

/**
 * This provides a simple interface for rendering an image in a way that it
 * will not cause a memory leak. <img> tags never release their memory on
 * mobile webkit, even when they are removed from the DOM. Instead, we render
 * the image as a CSS background image, and provide an interface to load or
 * unload the image. This lets us unload the image if the image if it outside
 * the viewport.
 */

dojo.require('dijit._Widget');

dojo.declare('mulberry.ui.BackgroundImage', dijit._Widget, {
  // These attributes must be present on the dom element
  imageUrl : '',
  isLoaded : false,
  loadOnInit : false,

  postCreate : function() {
    this.inherited(arguments);

    if (this.loadOnInit) {
      this.loadImage();
    }
  },

  loadImage : function() {
    if (this.isLoaded) { return; }

    dojo.style(this.domNode, {
      'backgroundImage': 'url(' + this.imageUrl + ')',
      'backgroundRepeat': 'no-repeat'
    });

    if (this.height) {
      dojo.style(this.domNode, {
        'height': this.height + 'px'
      });
    }

    this.isLoaded = true;
  },

  unloadImage : function() {
    dojo.style(this.domNode, 'backgroundImage', null);
    this.isLoaded = false;
  },

  _setBackgroundImageAttr : function(imageProps) {
    if (!imageProps) { return; }

   this.imageUrl = imageProps.url;
  }

});

