window.addEventListener('DOMContentLoaded', () => {
  const heart = document.getElementById('heart');
  let isDragging = false;
  let startPosition = { x: 0, y: 0 };
  let offset = { x: 0, y: 0 };

  // Adicionar eventos de interação de toque
  heart.addEventListener('touchstart', startDrag);
  heart.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', drag);

  // Adicionar eventos de interação de mouse
  heart.addEventListener('mousedown', startDrag);
  heart.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', drag);

  function startDrag(event) {
    event.preventDefault();
    isDragging = true;
    startPosition = { x: getEventX(event), y: getEventY(event) };
    offset = { x: heart.offsetLeft - startPosition.x, y: heart.offsetTop - startPosition.y };
  }

  function stopDrag() {
    isDragging = false;
  }

  function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    const currentPos = { x: getEventX(event), y: getEventY(event) };
    const newPosX = currentPos.x + offset.x;
    const newPosY = currentPos.y + offset.y;
    heart.style.left = newPosX + 'px';
    heart.style.top = newPosY + 'px';
  }

  function getEventX(event) {
    return event.type.startsWith('mouse') ? event.clientX : event.touches[0].clientX;
  }

  function getEventY(event) {
    return event.type.startsWith('mouse') ? event.clientY : event.touches[0].clientY;
  }

  // Função para animar os corações em 3D
  function animateHearts() {
    requestAnimationFrame(animateHearts);
    const time = Date.now() * 0.001;
    const heartElement = document.querySelector('#heart');
    const radius = 100;
    const speed = 0.5;
    const x = Math.cos(time * speed) * radius;
    const y = Math.sin(time * speed) * radius;
    heartElement.style.transform = `translate(${x}px, ${y}px)`;
  }

  animateHearts();
});
