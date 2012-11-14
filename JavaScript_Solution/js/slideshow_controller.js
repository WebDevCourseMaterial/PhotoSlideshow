
/**
 * @fileoverview Serves as the view controller for the Slideshow.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('slideshow.SlideshowController');

goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.ui.Control');


/**
 * Connects listeners to the buttons.
 *
 * @param {!Element} contentElement The element for this controller’s content.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
slideshow.SlideshowController = function(contentElement) {
  goog.base(this);

  /**
   * Container element for this controller's content.
   * @type {!Element}
   * @private
   */
  this.container_ = contentElement;
  
  /**
   * Control for the next button.
   * @type {goog.ui.Control}
   * @private
   */
  this.nextControl_ = null;

  
  /**
   * Control for the previous button.
   * @type {goog.ui.Control}
   * @private
   */
  this.prevControl_ = null;
  
  /**
   * Center photo index.
   * @type {number}
   */
  this.centerPhoto = 0;
  
  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  this.init_();
};
goog.inherits(slideshow.SlideshowController, goog.events.EventTarget);


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
slideshow.SlideshowController.prototype.logger =
    goog.debug.Logger.getLogger('slideshow.SlideshowController');


/**
 * Initialize the view controller.
 * @private
 */
slideshow.SlideshowController.prototype.init_ = function() {
  this.nextControl_ = new goog.ui.Control('');
  this.eventHandler_.listen(this.nextControl_,
      goog.ui.Component.EventType.ACTION, this.handleMovement_);
  this.nextControl_.decorate(goog.dom.getElementByClass('next'));

  this.prevControl_ = new goog.ui.Control('');
  this.eventHandler_.listen(this.prevControl_,
      goog.ui.Component.EventType.ACTION, this.handleMovement_);
  this.prevControl_.decorate(goog.dom.getElementByClass('prev'));

  this.updateView_();
};

/**
 * Handles a click on a light.
 * @param {goog.events.Event} e Click event.
 * @private
 */
slideshow.SlideshowController.prototype.handleMovement_ = function(e) {
  var imgEls = goog.dom.getElementsByTagNameAndClass('img');
  if (e.target == this.nextControl_) {
    this.centerPhoto++;
  } else {
    this.centerPhoto--;
  }
  if (this.centerPhoto < 0) {
    this.centerPhoto = 0;
  } else if (this.centerPhoto >= imgEls.length) {
    this.centerPhoto = imgEls.length - 1;
  }
  this.updateView_();
};


/**
 * Updates the light states.
 * @private
 */
slideshow.SlideshowController.prototype.updateView_ = function() {
  var imgEls = goog.dom.getElementsByTagNameAndClass('img');
  var captionEl = goog.dom.getElementByClass('caption');
  for (var i = 0; i < imgEls.length; i++) {
    var currentImg = imgEls[i];
    if (i == this.centerPhoto - 2) {
      goog.dom.classes.set(currentImg, 'center-minus-2');
    } else if (i == this.centerPhoto - 1) {
      goog.dom.classes.set(currentImg, 'center-minus-1');
    } else if (i == this.centerPhoto) {
      goog.dom.classes.set(currentImg, 'center');
      captionEl.innerHTML = currentImg.title;
    } else if (i == this.centerPhoto + 1) {
      goog.dom.classes.set(currentImg, 'center-plus-1');
    } else if (i == this.centerPhoto + 2) {
      goog.dom.classes.set(currentImg, 'center-plus-2');
    } else {
      goog.dom.classes.set(currentImg, '');
    }
  }
};


/** @inheritDoc */
slideshow.SlideshowController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  // Remove listeners added by controls.
  goog.dispose(this.nextControl_);
  delete this.nextControl_;
  goog.dispose(this.prevControl_);
  delete this.prevControl_;
  
  // Remove the DOM elements.
  //goog.dom.removeChildren(this.container_);
};
