document.addEventListener('DOMContentLoaded', function () {
  let hoverSlideContainer = document.querySelectorAll('.hover-slide')

  for (let item of hoverSlideContainer) {
    let getChildren = item.querySelectorAll('.hover-slide > *')
    let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(getChildren.length) + '</div>'
    item.insertAdjacentHTML( 'afterbegin', repeatQuery );
    getChildren[0].classList.add('active');
    console.log(item);

    function parentCoord ( event ) {
      let bounds = item.getBoundingClientRect();
      let x = event.clientX - bounds.left;
      let y = event.clientY - bounds.top;
      let width = bounds.width;
      return {x: x, y: y, width: width};
    }
    item.addEventListener('mousemove', function() {
      let parent = parentCoord(event)
      let percentage = parent.x / parent.width;
      let imageNumber = Math.floor(percentage * getChildren.length);

      getChildren.forEach(getChildren => {
        getChildren.classList.remove('active')
      });
      getChildren[imageNumber].classList.add('active')
    })

  }
});
