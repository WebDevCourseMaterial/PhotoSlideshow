
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
  
  /* TODO: Add member variables as necessary. */
  
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

};

/** @inheritDoc */
slideshow.SlideshowController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  // Remove listeners added by controls.
  
  // Remove the DOM elements.
  //goog.dom.removeChildren(this.container_);
};
