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
    refreshRate: 0, //milliseconds
    firstSlide: 0,
    reverse: true,
    showSegments: true
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

  var getCoordinates = function(selector, event) {
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
      children[index].classList.add('active')
    }

    var mouseX = function (selector, event, children) {
      let parent = getCoordinates(selector, event)
      let percentage = parent.x / parent.width;
      let imageNumber = Math.floor(percentage * children.length);
      setClass(children, imageNumber)
    }

    var hoverHandler = function( event ) {
      if (!event.target.classList.contains(settings.selector)) return
      let getChildren = [].slice.call(event.target.children[1].children);
      mouseX(event.target, event, getChildren)
    }

  	hoverSlide.init = function (options, event) {
  		// Selectors and variables

  		settings = extend( defaults, options || {} ); // Merge user options with defaults
  		// When a toggle is clicked, run the click handler

      const tHandler = throttled(options.refreshRate, hoverHandler);
      document.addEventListener("mousemove", tHandler, false);

      let parents = document.querySelectorAll('.' + options.selector)

      for (let parent of parents) {
        wrapInner(parent, 'span', 'hover-content')
        let getHoverContent = parent.querySelectorAll('.hover-content')[0];
        let indicator = document.createElement('div')

        indicator.setAttribute('class','hover-indicator')
        parent.append(indicator);
        getHoverContent.children[0].classList.add('active')
        if (settings.showSegments == true) {
          showSegments(parent, getHoverContent.children.length)
        }
      }
      // Object.assign(document.querySelectorAll('.hover-indicator').style,{fontsize:"12px",left:"200px",top:"100px"})
      // setStylesOnElement({content: '', position: 'absolute', left: '0', bottom: '0px', width: '100px', height: '10px', background: '#f00'}, document.querySelectorAll('.hover-indicator'))

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
