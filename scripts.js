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
const playerName = document.querySelector('#js-player-name');
const editBtn = document.querySelector('#js-edit-btn');
const characterSelectForm = document.getElementById('character-select');

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
  if (targetId === 'settings') {
    const playerNameValue = localStorage.getItem('characterName');
    playerName.textContent = playerNameValue;
  };
  if (targetId === 'character') {
    const characterName = localStorage.getItem('characterName');
    const wins = localStorage.getItem('wins'); // пока еше не будет данные - не сделала страницу с боем
    const loses = localStorage.getItem('loses'); // пока еше не будет данные - не сделала страницу с боем
    const characterImageUrl = localStorage.getItem('characterImageUrl');
    document.querySelector('.character-img').style.backgroundImage = `url('${characterImageUrl}')`;
    document.getElementById('js-character-name').textContent = characterName;
    document.getElementById('js-wins').textContent = wins || '0';
    document.getElementById('js-loses').textContent = loses || '0';
  };
};

navigationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.id.replace('-icon', '');
    showSection(targetId);
  });
});

editBtn.addEventListener('click', () => {
  localStorage.removeItem('characterName');
  localStorage.removeItem('characterImageUrl');
  showSection('register');
  characterNameInput.value = '';
});

characterSelectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedCharacter = characterSelectForm.querySelector('input[name="character"]:checked');
  if (!selectedCharacter) {
    alert('Please select a character before fighting!');
    return;
  };

  const selectedImageUrl = document.getElementById(`${selectedCharacter.value}`).getAttribute('src');
  localStorage.setItem('characterImageUrl', selectedImageUrl);

  showSection('battle');
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('register');
});
