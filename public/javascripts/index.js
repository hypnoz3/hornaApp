const buttonz = document.querySelectorAll('.ripple')

buttonz.forEach((btn) => {
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


