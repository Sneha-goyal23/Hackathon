// build a small starfield
    const stars = document.getElementById('stars');
    for(let i=0;i<40;i++){
      const s = document.createElement('span');
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*100 + '%';
      s.style.animationDelay = (Math.random()*3) + 's';
      stars.appendChild(s);
    }

    // after 2.6s, fade out and go to the home page
    const NEXT_PAGE = 'CLIMO.html';   // <-- home page filename
    setTimeout(() => {
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = NEXT_PAGE; }, 500);
    }, 2600);

    // let the user tap to skip the wait
    document.body.addEventListener('click', () => {
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = NEXT_PAGE; }, 300);
    });
