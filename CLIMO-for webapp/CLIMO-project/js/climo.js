// generate flowing wind streams across the hero
  (function(){
    const field = document.getElementById('flowField');
    if(field){
      const N = 14;
      for(let i=0;i<N;i++){
        const s = document.createElement('div');
        s.className = 'stream' + (Math.random()>0.5 ? ' blue' : '');
        s.style.top = (6 + Math.random()*88) + '%';
        s.style.left = (Math.random()*70) + '%';
        s.style.width = (60 + Math.random()*140) + 'px';
        s.style.animationDuration = (3.5 + Math.random()*4) + 's';
        s.style.animationDelay = (Math.random()*5) + 's';
        field.appendChild(s);
      }
    }
  })();

  // 3D parallax tilt for hero scene based on mouse position
  const wrap = document.getElementById('sceneWrap');
  const scene = document.getElementById('scene');
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    scene.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    scene.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  // subtle idle float when no mouse interaction (desktop-first, gentle)
  let idleAngle = 0;
  setInterval(() => {
    if (!wrap.matches(':hover')) {
      idleAngle += 0.006;
      const ry = Math.sin(idleAngle) * 4;
      const rx = Math.cos(idleAngle * 0.8) * 2;
      scene.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
    }
  }, 40);

  function cardTilt(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    el.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--mx', `${(x/rect.width)*100}%`);
    el.style.setProperty('--my', `${(y/rect.height)*100}%`);
  }
  function cardReset(el) {
    el.style.transform = '';
  }
