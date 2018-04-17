document.addEventListener('DOMContentLoaded', function () {
  let hoverSlideContainer = document.querySelectorAll('.hover-slide')

  for (let item of hoverSlideContainer) {
    let getChildren = item.querySelectorAll('.hover-slide > *')
    item.addEventListener('mousemove', function(event) {
    const x = event.offsetX;
    const width = this.offsetWidth;
    const percentage = x / width;
    // console.log(getChildren.length);
    const imageNumber = Math.floor(percentage * getChildren.length);
    console.log(imageNumber);
    //
    getChildren.forEach(getChildren => {
      getChildren.style.zIndex = 0;
    });
    //
    getChildren[imageNumber].style.zIndex = 1;

    })
  }
});
