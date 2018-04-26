(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
      define([], factory(root));
  } else if ( typeof exports === 'object' ) {
      module.exports = factory(root);
  } else {
      root.HoverSlide = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

  var window = root; // Map window to root to avoid confusion
  var HoverSlide = {}; // Placeholder for public methods

	var defaults = {
		selector: 'hover-slide',
    refreshRate: 66, //milliseconds
    showSegments: true,
    showIndicator: true,
    reverse: false
	};


  var extend = function () {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;
    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
        deep = arguments[0];
        i++;
    }
    // Merge the object into the extended object
    var merge = function (obj) {
        for ( var prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                // If deep merge and property is an object, merge properties
                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    extended[prop] = extend( true, extended[prop], obj[prop] );
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        var obj = arguments[i];
        merge(obj);
    }
    return extended;
  };

  var showSegments = function(selector, childLength) {
    let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(childLength) + '</div>'
    selector.insertAdjacentHTML( 'afterbegin', repeatQuery );
  }

  var getCoordinates = function(selector, event = false) {
    let bounds = selector.getBoundingClientRect();
    let x = event.clientX - bounds.left;
    let y = event.clientY - bounds.top;
    let width = bounds.width;
    return {x: x, y: y, width: width};
  }

  var throttled = function(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  var setImageIndex = function (selector, index, maxIndex = false) {
    selector[index].classList.add('active')
  }

  var setStylesOnElement = function(styles, element){
    Object.assign(element.style, styles);
  }

  var wrapInner = function(parent, wrapper, setClass) {
    if (typeof wrapper === "string")
      wrapper = document.createElement(wrapper);
    var div = parent.appendChild(wrapper);
      div.classList.add(setClass)
    while(parent.firstChild !== wrapper)
      wrapper.appendChild(parent.firstChild);
  }

  //
  // HoverSlide Constructor
  //

  var HoverSlide = function (options) {
    var hoverSlide = {}; // Object for public APIs
    var settings;

    var setClass = function(children, index) {
      if (settings.reverse) {
        children = children.reverse();
      } else {
        children = children
      }
      for (const child of children) {
        child.classList.remove('active')
      }
      setImageIndex(children, index)
    }

    var moveIndicator = function(parent, position, width) {
      let indicator = parent.querySelector('.hover-indicator');
      let c = returnCoordinates(parent, event)
      let setIndicatorPosition = position * c.segmentWidth

      setStylesOnElement({
        content: '',
        position: 'absolute',
        transform: 'translateX('+setIndicatorPosition+'px)',
        bottom: '0',
        left:'0',
        transition: 'transform .4s cubic-bezier(0,.85,0,.85)',
        width: width+'px',
        height: '3px',
        background: '#fff',
        // backdropFilter: 'contrast(300%) grayscale(100%) invert(100%)',
        opacity: '1',
      }, indicator);
    }

    var returnCoordinates = function(selector, event = false) {
      let parent = getCoordinates(selector, event)
      let children = selector.querySelector('.hover-content').children
      let parentWidth = parent.width;
      let percentage = parent.x / parentWidth;
      let imageNumber = Math.floor(percentage * children.length);
      let segmentWidth = parentWidth / children.length
      let position = imageNumber * segmentWidth
      return {percentage, imageNumber, segmentWidth, position, parentWidth}
    }

    var mouseX = function (selector, event, children) {
      let c = returnCoordinates(selector, event, children)
      setClass(children, c.imageNumber)
      if(settings.showIndicator) {
        moveIndicator(selector, c.imageNumber, c.segmentWidth)
      }
    }

    var hoverHandler = function( event ) {
      if (!event.target.classList.contains(settings.selector)) return
      let getChildren = [].slice.call(event.target.querySelector('.hover-content').children);
      mouseX(event.target, event, getChildren)
    }

  	hoverSlide.init = function (options) {
  		// Selectors and variables
  		settings = extend( defaults, options || {} ); // Merge user options with defaults
  		// When a toggle is clicked, run the click handler

      const tHandler = throttled(options.refreshRate, hoverHandler);
      document.addEventListener("mousemove", tHandler, false);
      let parents = document.querySelectorAll('.' + options.selector)

      for (let parent of parents) {
        wrapInner(parent, 'span', 'hover-content')
        let getHoverContent = parent.querySelector('.hover-content');
        let indicator = document.createElement('div')
        indicator.setAttribute('class','hover-indicator')
        parent.append(indicator);
        let c = returnCoordinates(parent, false)
        let childrenLength;
        if (settings.reverse) {
          childrenLength = getHoverContent.children.length - 1
        } else {
          childrenLength = 0
        }
        //set initial states and indexes
        setImageIndex(getHoverContent.children, childrenLength, getHoverContent.children.length)
        if (settings.showIndicator) {
          moveIndicator(parent, childrenLength, c.segmentWidth)
        }
        if (settings.showSegments == true) {
          showSegments(parent, getHoverContent.children.length)
        }
      }
  	};
	   hoverSlide.init(options);
	};

	return HoverSlide;
});
//
//
//
// var slideHover = function(selector) {
//   this.node = document.querySelectorAll(selector);
//     if (this.node.length == 0) {
//       console.error('Unable to find the element');
//     }
//   return this;
// }
//
// var showSegments = function(selector, childLength) {
//   let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(childLength.length) + '</div>'
//   selector.insertAdjacentHTML( 'afterbegin', repeatQuery );
// }
//
// // function to get the parents coordinates values
// var parentCoord = function(selector, event) {
//   let bounds = selector.getBoundingClientRect();
//   let x = event.clientX - bounds.left;
//   let y = event.clientY - bounds.top;
//   let width = bounds.width;
//   return {x: x, y: y, width: width};
// }
//
// var setClass = function(children, index) {
//   for (const child of children) {
//     child.classList.remove('active')
//   }
//   children[index].classList.add('active')
// }
//
// var mouseX = function (selector, event, children) {
//   let parent = parentCoord(selector, event)
//   let percentage = parent.x / parent.width;
//   let imageNumber = Math.floor(percentage * children.length);
//   setClass(children, imageNumber)
// }
//
// slideHover.prototype.init = function() {
//   Array.prototype.forEach.call(this.node, function (node) {
//     // get children of parent selector and convert to array
//     let getChildren = [].slice.call(node.children);
//     // add active class to first item in array
//     getChildren[0].classList.add('active')
//     // generate overlay to show segments
//     showSegments(node, getChildren)
//     // listen for mouse movement and update image
//     node.addEventListener('mousemove', function(event) {
//       mouseX(node, event, getChildren)
//     });
//   });
// }
