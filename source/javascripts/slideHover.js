/*!
 * Vanilla Javascript Boilerplate with optional jQuery initialization
 * Author: Jan Rembold
 * Git: https://github.com/janrembold
 * License: MIT
 */

(function (root, factory) {
    var pluginName = 'slideHover';

    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
}(this, function (pluginName) {
    'use strict';

    var defaults = {
        className: 'foo'
    };


    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function (target, options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


    /**
     * Some private helper function
     */
    var getClass = function(event) {
        console.log(event);
    };


    /**
     * Plugin Object
     * @param element The html element to initialize
     * @param {Object} options User options
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = extend(defaults, options);
        console.log('Plugin inititalized');
    }


    // Plugin prototype
    Plugin.prototype = {

        init: function() {
            let getClassSettings = this.element.innerHTML = this.options.className;

            for (var i = 0; i < this.element.length; i++) {

              this.element[i].classList.add(getClassSettings)
            }

        }

    };

    return Plugin;
}));






// document.addEventListener('DOMContentLoaded', function () {
//   let hoverSlideContainer = document.querySelectorAll('.hover-slide')
//
//   for (let item of hoverSlideContainer) {
//     let getChildren = item.querySelectorAll('.hover-slide > *')
//     let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(getChildren.length) + '</div>'
//     item.insertAdjacentHTML( 'afterbegin', repeatQuery );
//     getChildren[0].classList.add('active');
//     console.log(item);
//
//     function parentCoord ( event ) {
//       let bounds = item.getBoundingClientRect();
//       let x = event.clientX - bounds.left;
//       let y = event.clientY - bounds.top;
//       let width = bounds.width;
//       return {x: x, y: y, width: width};
//     }
//     item.addEventListener('mousemove', function() {
//       let parent = parentCoord(event)
//       let percentage = parent.x / parent.width;
//       let imageNumber = Math.floor(percentage * getChildren.length);
//
//       getChildren.forEach(getChildren => {
//         getChildren.classList.remove('active')
//       });
//       getChildren[imageNumber].classList.add('active')
//     })
//
//   }
// });
