document.addEventListener('DOMContentLoaded', function () {


  let hoverSlideContainer = document.querySelectorAll('.hover-slide')
  let getContainers = []

  for (let item of hoverSlideContainer) {
    let getChildren = item.querySelectorAll('.hover-slide > *')
    console.log(getChildren.length);
    getContainers.push(getChildren);
    let repeatQuery = '<div class=hover-cover">' + '<div class="hover-segment"></div>'.repeat(getChildren.length) + '</div>'
    item.insertAdjacentHTML( 'afterbegin', repeatQuery );
  }

  document.querySelectorAll('.hover-cover').classList.add('test')




  for (let child of getContainers) {
    for (let [index, val] of child.entries()) {

      // console.log(val);
      // console.log(index);
    }
  }


});



// document.addEventListener('DOMContentLoaded', function () {
//
//   let = hoverSlideContainer = document.querySelectorAll('.hoverslide > *')
//   let = hoverSlideLength = hoverSlideContainer.length
//   let array = []
//
//   for (var i = 0; i < hoverSlideContainer.length; i++) {
//     array.push(hoverSlideContainer[i])
//   }
//
//   console.log(array);
//
// });
