const navigation = document.querySelector('.navigation');
const navigationBtns = document.querySelectorAll('.btn-nav');
const sections = {
  register: document.getElementById('register'),
  home: document.getElementById('home'),
  character: document.getElementById('character'),
  settings: document.getElementById('settings'),
  battle: document.getElementById('battle')
};
const addCharacterForm = document.getElementById('character-form');
const characterNameInput = document.getElementById('character-name');
const characterSelectLegend = document.getElementById('js-character-select-legend');
const playerName = document.getElementById('js-player-name');
const editBtn = document.getElementById('js-edit-btn');
const characterSelectForm = document.getElementById('character-select');
const chooseRobotBtn = document.getElementById('js-choose-btn');

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
    document.querySelector('.body-background').style.backgroundImage = `url(assets/img/background/garden-home.webp)`;
  };
  if (targetId === 'settings') {
    document.querySelector('.body-background').style.backgroundImage = `url(assets/img/background/garden-character.webp)`;
    const playerNameValue = localStorage.getItem('characterName');
    playerName.textContent = playerNameValue;
  };
  if (targetId === 'character') {
    const wins = localStorage.getItem('wins');
    const loses = localStorage.getItem('loses');
    document.querySelector('.body-background').style.backgroundImage = `url(assets/img/background/garden-character.webp)`;
    document.querySelector('.character-img').style.backgroundImage = `url('${localStorage.getItem('characterImageUrl')}')`;
    document.getElementById('js-character-name').textContent = localStorage.getItem('characterName');
    document.getElementById('js-wins').textContent = wins || '0';
    document.getElementById('js-loses').textContent = loses || '0';
  };
  if (targetId === 'battle') {
    document.querySelector('.body-background').style.backgroundImage = `url(assets/img/background/garden.webp)`;
    document.getElementById('js-battle-character-name').textContent = localStorage.getItem('characterName');
    document.querySelector('.battle-character-img').style.backgroundImage = `url('${localStorage.getItem('characterImageUrl')}')`;
    document.querySelector('.battle-robot-img').style.backgroundImage = `url('${localStorage.getItem('robotImageUrl')}')`;
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

  resetRangeToMax('js-robot-range', 'js-current-robot-range');
  resetRangeToMax('js-character-range', 'js-current-character-range');

  showSection('battle');
});

function setupRangeUpdater(rangeId, currentValueId, maxValueId) {
  const rangeInput = document.getElementById(rangeId);
  const currentRangeValue = document.getElementById(currentValueId);
  const maxRangeValue = document.getElementById(maxValueId);

  maxRangeValue.textContent = rangeInput.max;

  rangeInput.addEventListener('input', () => {
    currentRangeValue.textContent = rangeInput.value;
    const rangePercent = (rangeInput.value / rangeInput.max) * 100;
    rangeInput.style.background = `linear-gradient(to right, #bb470c ${rangePercent}%, #ccc ${rangePercent}%)`;
  });

  const initialPercent = (rangeInput.value / rangeInput.max) * 100;
  rangeInput.style.background = `linear-gradient(to right, #bb470c ${initialPercent}%, #ccc ${initialPercent}%)`;
};

setupRangeUpdater('js-robot-range', 'js-current-robot-range', 'js-max-robot-range');
setupRangeUpdater('js-character-range', 'js-current-character-range', 'js-max-character-range');

function resetRangeToMax(rangeId, currentValueId) {
  const rangeInput = document.getElementById(rangeId);
  const currentRangeValue = document.getElementById(currentValueId);

  rangeInput.value = rangeInput.max;
  const rangePercent = 100;
  currentRangeValue.textContent = rangeInput.value;
  rangeInput.style.background = `linear-gradient(to right, #bb470c ${rangePercent}%, #ccc ${rangePercent}%)`;
};

chooseRobotBtn.addEventListener('click', () => {
  const selectedRobot = document.querySelector('input[name="robot"]:checked');
  const currentRobotId = localStorage.getItem('selectedRobot');
  if (!selectedRobot) {
    showSection('battle');
    return;
  };
  const newRobotId = selectedRobot.value;
  if (newRobotId === currentRobotId) {
    alert('You are already playing against this character.');
    showSection('battle');
    return;
  };
  const newRobotImageUrl = document.getElementById(newRobotId).getAttribute('src');
  localStorage.setItem('robotImageUrl', newRobotImageUrl);
  localStorage.setItem('selectedRobot', newRobotId);

  resetRangeToMax('js-robot-range', 'js-current-robot-range');
  resetRangeToMax('js-character-range', 'js-current-character-range');
  showSection('battle');
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('register');
  if (!localStorage.getItem('robotImageUrl')) {
    const defaultRobotId = 'robot1';
    const defaultRobotImageUrl = document.getElementById(defaultRobotId).getAttribute('src');
    localStorage.setItem('robotImageUrl', defaultRobotImageUrl);
    localStorage.setItem('selectedRobot', defaultRobotId);
  };
});
