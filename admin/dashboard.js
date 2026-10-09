const gameData = window.TREND_HUNTER_DATA;

const formatDetails = {
  'spot-trend': {
    label: 'Spot the trend',
    icon: '✳',
    description: 'Match a trend signal to the product that brings it to life.'
  },
  'buyer-choice': {
    label: 'Be the buyer',
    icon: '▣',
    description: 'Choose the product you would bet on for the shelf.'
  },
  'exhibitor-match': {
    label: 'Be the exhibitor',
    icon: '↗',
    description: 'Give a product its strongest trend story.'
  },
  'trend-or-hype': {
    label: 'Trend or hype?',
    icon: '✦',
    description: 'Make a fast call on whether an idea has staying power.'
  },
  'final-challenge': {
    label: 'Trend of the Year',
    icon: '❄',
    description: 'Finish with a special decision tied to the primary trend.'
  }
};

const preview = document.getElementById('challenge-preview');
const examples = gameData.challengePool;
let previewIndex = 0;

function getChallengeTitle(challenge) {
  if (challenge.type === 'spot-trend') return challenge.trendName;
  if (challenge.type === 'buyer-choice') return 'Your next shelf bet';
  if (challenge.type === 'exhibitor-match') return challenge.product.name;
  if (challenge.type === 'trend-or-hype') return challenge.productName;
  return challenge.subtitle;
}

function getChallengeDescription(challenge) {
  if (challenge.type === 'spot-trend') return challenge.description;
  if (challenge.type === 'buyer-choice') return challenge.scenario;
  if (challenge.type === 'exhibitor-match') return challenge.product.description;
  if (challenge.type === 'trend-or-hype') return challenge.productDetail;
  return challenge.scenario;
}

function getChallengeChoices(challenge) {
  if (challenge.type === 'trend-or-hype') {
    return [
      { label: '🔥 TREND', correct: challenge.isTrend },
      { label: 'HYPE', correct: !challenge.isTrend }
    ];
  }

  return challenge.choices.map((choice) => ({
    label: choice.name || choice.label,
    correct: choice.correct
  }));
}

function renderChallengePreview(challenge, index) {
  const format = formatDetails[challenge.type];
  const choices = getChallengeChoices(challenge);

  preview.replaceChildren();

  const type = document.createElement('p');
  type.className = 'preview-type';
  type.textContent = `${format.icon} ${format.label}`;

  const title = document.createElement('h3');
  title.className = 'preview-title';
  title.textContent = getChallengeTitle(challenge);

  const description = document.createElement('p');
  description.className = 'preview-description';
  description.textContent = getChallengeDescription(challenge);

  const prompt = document.createElement('p');
  prompt.className = 'preview-prompt';
  prompt.textContent = challenge.prompt;

  const choiceList = document.createElement('ul');
  choiceList.className = 'preview-choices';
  choices.forEach((choice) => {
    const item = document.createElement('li');
    item.className = `preview-choice${choice.correct ? ' is-answer' : ''}`;

    const label = document.createElement('span');
    label.textContent = choice.label;
    item.append(label);

    if (choice.correct) {
      const answer = document.createElement('span');
      answer.className = 'answer-label';
      answer.textContent = 'Sample answer';
      item.append(answer);
    }

    choiceList.append(item);
  });

  const explanation = document.createElement('p');
  explanation.className = 'preview-explanation';
  explanation.textContent = challenge.explanation;

  preview.append(type, title, description, prompt, choiceList, explanation);
  document.getElementById('preview-position').textContent = `Example ${index + 1} of ${examples.length}`;
}

function renderFormatSummary() {
  const counts = new Map();
  examples.forEach((challenge) => {
    counts.set(challenge.type, (counts.get(challenge.type) || 0) + 1);
  });

  const list = document.getElementById('format-list');
  Object.entries(formatDetails).forEach(([type, format]) => {
    const count = counts.get(type) || 0;
    const row = document.createElement('div');
    row.className = 'format-row';

    const icon = document.createElement('span');
    icon.className = 'format-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = format.icon;

    const copy = document.createElement('span');
    copy.className = 'format-copy';
    const label = document.createElement('strong');
    label.textContent = format.label;
    const description = document.createElement('small');
    description.textContent = format.description;
    copy.append(label, description);

    const total = document.createElement('strong');
    total.className = 'format-count';
    total.textContent = String(count);
    total.setAttribute('aria-label', `${count} sample challenges`);

    row.append(icon, copy, total);
    list.append(row);
  });
}

function renderPersonas() {
  const list = document.getElementById('persona-list');
  gameData.personas.forEach((persona) => {
    const card = document.createElement('article');
    card.className = 'persona-card';

    const name = document.createElement('strong');
    name.textContent = persona.name;

    const blurb = document.createElement('small');
    blurb.textContent = persona.blurb;

    card.append(name, blurb);
    list.append(card);
  });
}

document.getElementById('challenge-count').textContent = String(examples.length);
document.getElementById('format-count').textContent = String(new Set(examples.map((item) => item.type)).size);
document.getElementById('persona-count').textContent = String(gameData.personas.length);

renderFormatSummary();
renderPersonas();
renderChallengePreview(examples[previewIndex], previewIndex);

document.getElementById('next-example').addEventListener('click', () => {
  previewIndex = (previewIndex + 1) % examples.length;
  renderChallengePreview(examples[previewIndex], previewIndex);
});
