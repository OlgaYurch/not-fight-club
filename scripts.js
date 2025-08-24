const navigation = document.querySelector('.navigation');
const navigationBtns = document.querySelectorAll('.btn-nav');
const sections = {
  register: document.querySelector('#register'),
  home: document.querySelector('#home'),
  character: document.querySelector('#character'),
  settings: document.querySelector('#settings'),
  battle: document.querySelector('#battle')
};
const addCharacterForm = document.querySelector('#character-form');
const characterNameInput = document.querySelector('#character-name');
const characterSelectLegend = document.querySelector('#js-character-select-legend');

addCharacterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const characterName = characterNameInput.value;
  localStorage.setItem('characterName', characterName);
  characterSelectLegend.textContent = `Hi, ${characterName}! Select your Character`;
  showSection('home');
});

function showSection(targetId) {
  Object.values(sections).forEach((section) => section.classList.add('hidden'));
  sections[targetId].classList.remove('hidden');
  if (targetId === 'register') {
    navigation.classList.add('hidden');
  } else {
    navigation.classList.remove('hidden');
  };
};

navigationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.id.replace('-icon', '');
    showSection(targetId);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('register');
});
