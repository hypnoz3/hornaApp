// function changeBanner(banner) {
//     alert("asd");
//     $('#expansion-banner').attr('src', banner);
//     document.querySelector('#expansion-banner').src = banner;
// }


function changeBanner(banner) {
    $('#expansion-banner').attr('src', banner);
    document.querySelector('#expansion-banner').src = banner;
}

// Button Ripple Effect//

const buttons = document.querySelectorAll('.ripple')

buttons.forEach((btn) => {
    const btnText = btn.innerHTML
    btn.addEventListener('click', (e) => {
      btn.innerHTML = 
        `${btnText}
        <span
            class="circle"
            style="left:${e.offsetX}px; top:${e.offsetY}px">
        </span>`
    })
  })

  // Expansion filter //
  const wodButton = getElementById('#wod_box');
  const legionButton = getElementById('#legion_box')
  let wod = expansion.findById('60dcb8d6de0ebf57f408a01e').then(console.log(wod));
  const Expansion = require('../models/expansion');
   function legion(Expansion) {
      expansion.findById('60dc58717404dd38d85c4307');
      console.log(Expansion)
  }




  