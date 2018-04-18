document.addEventListener('DOMContentLoaded', function () {
  let hoverSlideContainer = document.querySelectorAll('.hover-slide')

  for (let item of hoverSlideContainer) {
    let getChildren = item.querySelectorAll('.hover-slide > *')
    let repeatQuery = '<div class="hover-cover">' + '<div class="hover-segment"></div>'.repeat(getChildren.length) + '</div>'
    item.insertAdjacentHTML( 'afterbegin', repeatQuery );
    getChildren[0].classList.add('active');
    console.log(item);

    function relativeCoords ( event ) {
      var bounds = item.getBoundingClientRect();
      var x = event.clientX - bounds.left;
      var y = event.clientY - bounds.top;
      return {x: x, y: y};
    }
    item.addEventListener('mousemove', function() {
      var rel = relativeCoords(event)
      let x = rel.x;
      let width = this.getBoundingClientRect().width;
      let percentage = x / width;
      let imageNumber = Math.floor(percentage * getChildren.length);

      getChildren.forEach(getChildren => {
        getChildren.classList.remove('active')
      });
      getChildren[imageNumber].classList.add('active')
    })

  }
});
