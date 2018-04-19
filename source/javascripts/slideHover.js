var slideHover = function(selector) {
  this.node = document.querySelectorAll(selector);
    if (this.node.length == 0) {
      console.error('Unable to find the element');
    }
  return this;
}

var showSegments = function(selector, length) {
  let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(length) + '</div>'
  selector.insertAdjacentHTML( 'afterbegin', repeatQuery );
}

// function to get the parents coordinates values
var parentCoord = function(selector, event) {
  let bounds = selector.getBoundingClientRect();
  let x = event.clientX - bounds.left;
  let y = event.clientY - bounds.top;
  let width = bounds.width;
  return {x: x, y: y, width: width};
}


slideHover.prototype.init = function() {
  Array.prototype.forEach.call(this.node, function (node) {

    // get children of parent selector and convert to array
    let getChildren = [].slice.call(node.children);

    // add active class to first item in array
    getChildren[0].classList.add('active')

    // generate overlay to show segments
    showSegments(node, getChildren.length)

    node.addEventListener('mousemove', function(event) {
      let parent = parentCoord(node, event)
      let percentage = parent.x / parent.width;
      let imageNumber = Math.floor(percentage * getChildren.length);
      for (const item of getChildren) {
        item.classList.remove('active')
      }
      getChildren[imageNumber].classList.add('active')
    });

  });
}





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
//       console.log(event);
//       let x = event.clientX - bounds.left;
//       let y = event.clientY - bounds.top;
//       let width = bounds.width;
//       return {x: x, y: y, width: width};
//     }
//     item.addEventListener('mousemove', function() {
//       let parent = parentCoord(event)
//       let percentage = parent.x / parent.width;
//
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
