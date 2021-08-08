
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

 
const progress = 'https://raider.io/api/v1/guilds/profile?region=eu&realm=Twisting-nether&name=Horna&fields=raid_progression';
const progressBOX_nathria = document.getElementById('progress_nathria');

async function getProgress(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { raid_progression} = data
  
  console.log(raid_progression['castle-nathria'].summary)
}


getProgress(progress)




