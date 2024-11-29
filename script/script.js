const accordion = document.querySelector('.accordion');
const panel = document.querySelector('.panel');

accordion.addEventListener('click', () => {
  panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
});