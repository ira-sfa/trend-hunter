const data = window.TREND_HUNTER_DATA;

const state = {
  challenges: [],
  currentIndex: 0,
  score: 0,
  answered: false,
  categoryScores: {
    'trend-spotting': { total: 0, count: 0 },
    'buyer-instinct': { total: 0, count: 0 },
    'product-iq': { total: 0, count: 0 }
  }
};

const ui = {
  screens: {
    start: document.getElementById('start-screen'),
    instructions: document.getElementById('instructions-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
  },
  challengeNumber: document.getElementById('challenge-number'),
  scoreValue: document.getElementById('score-value'),
  challengeCard: document.getElementById('challenge-card'),
  startButton: document.getElementById('start-game-btn'),
  howToButton: document.getElementById('how-to-play-btn'),
  closeInstructionsButton: document.getElementById('close-instructions-btn'),
  playAgainButton: document.getElementById('play-again-btn'),
  shareButton: document.getElementById('share-result-btn'),
  finalScore: document.getElementById('final-score'),
  personaName: document.getElementById('persona-name'),
  personaBlurb: document.getElementById('persona-blurb'),
  metricTrend: document.getElementById('metric-trend'),
  metricBuyer: document.getElementById('metric-buyer'),
  metricProduct: document.getElementById('metric-product'),
  toast: document.getElementById('toast')
};

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(name) {
  Object.entries(ui.screens).forEach(([key, screen]) => {
    screen.classList.toggle('active', key === name);
  });
}

function resetGameState() {
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;
  Object.keys(state.categoryScores).forEach((key) => {
    state.categoryScores[key].total = 0;
    state.categoryScores[key].count = 0;
  });
}

function getAverage(categoryKey) {
  const bucket = state.categoryScores[categoryKey];
  if (!bucket.count) return 0;
  return Math.round(bucket.total / bucket.count);
}

function startGame() {
  resetGameState();
  const pool = shuffle(data.challengePool);
  state.challenges = pool.slice(0, 5);
  ui.scoreValue.textContent = state.score;
  ui.challengeNumber.textContent = String(state.currentIndex + 1);
  showScreen('game');
  renderChallenge();
}

function answerChallenge(challenge, selectedIndex) {
  if (state.answered) {
    return;
  }

  state.answered = true;

  const isTrendOrHype = challenge.type === 'trend-or-hype';
  const correctIndex = isTrendOrHype ? (challenge.isTrend ? 0 : 1) : challenge.choices.findIndex((item) => item.correct);
  const correct = selectedIndex === correctIndex;

  if (correct) {
    state.score += 20;
  }

  const bucket = state.categoryScores[challenge.category];
  bucket.total += correct ? 100 : 0;
  bucket.count += 1;

  ui.scoreValue.textContent = state.score;

  const feedbackTitle = correct ? 'You spotted it.' : 'Not quite.';
  const feedbackCopy = correct
    ? challenge.explanation || 'Nice read.'
    : challenge.explanation || 'Here\'s the stronger match.';

  if (challenge.type === 'spot-trend' || challenge.type === 'buyer-choice' || challenge.type === 'exhibitor-match' || challenge.type === 'final-challenge') {
    const answerMarkup = challenge.choices
      .map((choice, index) => {
        const active = index === selectedIndex ? 'selected' : '';
        const cls = index === correctIndex ? 'correct' : active && !correct ? 'incorrect' : '';
        const label = challenge.type === 'final-challenge' ? `${choice.label} — ${choice.description}` : `${choice.name || choice.label} ${choice.detail ? `<small>${choice.detail}</small>` : ''}`;
        return `
          <button class="choice-button ${cls}" type="button" aria-label="${choice.name || choice.label}">
            ${label}
          </button>
        `;
      })
      .join('');

    ui.challengeCard.innerHTML = `
      <div class="feedback-box ${correct ? 'correct' : 'incorrect'}">
        <h3>${feedbackTitle}</h3>
        <p>${feedbackCopy}</p>
      </div>
      <div class="choice-grid">${answerMarkup}</div>
      <button id="next-challenge-btn" class="next-button" type="button">NEXT →</button>
    `;
  } else {
    const answerButtons = [
      {
        className: 'trend',
        label: '🔥 TREND',
        detail: 'Follow the signal',
        correct: challenge.isTrend,
        selected: selectedIndex === 0
      },
      {
        className: 'hype',
        label: '👎 HYPE',
        detail: 'This one is noise',
        correct: !challenge.isTrend,
        selected: selectedIndex === 1
      }
    ];

    ui.challengeCard.innerHTML = `
      <div class="feedback-box ${correct ? 'correct' : 'incorrect'}">
        <h3>${feedbackTitle}</h3>
        <p>${feedbackCopy}</p>
      </div>
      <div class="trend-or-hype-row">
        ${answerButtons
          .map((button, index) => {
            const styleClass = button.correct ? 'correct' : button.selected && !correct ? 'incorrect' : '';
            return `
              <button class="huge-button ${button.className} ${styleClass}" type="button" aria-label="${button.label}">
                <strong>${button.label}</strong>
                <small>${button.detail}</small>
              </button>
            `;
          })
          .join('')}
      </div>
      <button id="next-challenge-btn" class="next-button" type="button">NEXT →</button>
    `;
  }

  document.getElementById('next-challenge-btn').addEventListener('click', () => {
    state.currentIndex += 1;
    state.answered = false;
    if (state.currentIndex >= state.challenges.length) {
      showResult();
      return;
    }
    ui.challengeNumber.textContent = String(state.currentIndex + 1);
    renderChallenge();
  });
}

function renderChallenge() {
  const challenge = state.challenges[state.currentIndex];
  if (!challenge) {
    showResult();
    return;
  }

  let html = '';

  if (challenge.type === 'spot-trend') {
    html = `
      <div class="challenge-header">
        <p class="challenge-kicker">TREND</p>
        <h2 class="challenge-title">${challenge.trendName}</h2>
      </div>
      <p class="challenge-description">${challenge.description}</p>
      <div class="choice-grid">
        ${challenge.choices
          .map(
            (choice, index) => `
              <button class="choice-button" data-index="${index}" type="button">
                <strong>${choice.name}</strong>
                <small>${choice.detail}</small>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  } else if (challenge.type === 'buyer-choice') {
    html = `
      <div class="challenge-header">
        <p class="challenge-kicker">YOU'RE THE BUYER</p>
        <h2 class="challenge-title">${challenge.scenario}</h2>
      </div>
      <div class="choice-grid">
        ${challenge.choices
          .map(
            (choice, index) => `
              <button class="choice-button" data-index="${index}" type="button">
                <strong>${choice.emoji} ${choice.name}</strong>
                <small>${choice.detail}</small>
                <small>Retail: ${choice.price} · ${choice.trend}</small>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  } else if (challenge.type === 'exhibitor-match') {
    html = `
      <div class="challenge-header">
        <p class="challenge-kicker">EXHIBITOR</p>
        <h2 class="challenge-title">${challenge.product.name}</h2>
      </div>
      <p class="challenge-description">${challenge.product.description}</p>
      <p class="challenge-description"><strong>${challenge.prompt}</strong></p>
      <div class="choice-grid">
        ${challenge.choices
          .map(
            (choice, index) => `
              <button class="choice-button" data-index="${index}" type="button">
                <strong>${choice.name}</strong>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  } else if (challenge.type === 'trend-or-hype') {
    html = `
      <div class="challenge-header">
        <p class="challenge-kicker">PRODUCT TEST</p>
        <h2 class="challenge-title">${challenge.productName}</h2>
      </div>
      <p class="challenge-description">${challenge.productDetail}</p>
      <p class="challenge-description"><strong>${challenge.prompt}</strong></p>
      <div class="trend-or-hype-row">
        <button class="huge-button trend" data-index="0" type="button"><strong>🔥 TREND</strong><small>Follow the signal</small></button>
        <button class="huge-button hype" data-index="1" type="button"><strong>👎 HYPE</strong><small>Skip the noise</small></button>
      </div>
    `;
  } else if (challenge.type === 'final-challenge') {
    html = `
      <div class="challenge-header">
        <p class="challenge-kicker">${challenge.title}</p>
        <h2 class="challenge-title">${challenge.subtitle}</h2>
      </div>
      <p class="challenge-description">${challenge.scenario}</p>
      <p class="challenge-description"><strong>${challenge.prompt}</strong></p>
      <div class="choice-grid">
        ${challenge.choices
          .map(
            (choice, index) => `
              <button class="choice-button" data-index="${index}" type="button">
                <strong>${choice.label}</strong>
                <small>${choice.description}</small>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  }

  ui.challengeCard.innerHTML = html;

  ui.challengeCard.querySelectorAll('[data-index]').forEach((button) => {
    button.addEventListener('click', () => {
      answerChallenge(challenge, Number(button.dataset.index));
    });
  });
}

function getPersona(score) {
  const persona = data.personas.find((entry) => score >= entry.min && score <= entry.max);
  return persona || data.personas[data.personas.length - 1];
}

function showResult() {
  const finalScore = state.score;
  const persona = getPersona(finalScore);

  ui.finalScore.textContent = String(finalScore);
  ui.personaName.textContent = persona.name;
  ui.personaBlurb.textContent = persona.blurb;
  ui.metricTrend.textContent = `${getAverage('trend-spotting')}`;
  ui.metricBuyer.textContent = `${getAverage('buyer-instinct')}`;
  ui.metricProduct.textContent = `${getAverage('product-iq')}`;
  showScreen('result');
}

async function shareResult() {
  const finalScore = state.score;
  const persona = getPersona(finalScore);
  const shareText = `I scored ${finalScore}/100 as ${persona.name} in Winter FancyFaire* Trend Hunter.`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Winter FancyFaire* Trend Hunter',
        text: shareText
      });
      showToast('Result shared!');
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      showToast('Result copied to clipboard!');
      return;
    }

    showToast('Share is not supported on this device.');
  } catch (error) {
    showToast('Share cancelled.');
  }
}

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add('visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    ui.toast.classList.remove('visible');
  }, 1800);
}

ui.startButton.addEventListener('click', startGame);
ui.howToButton.addEventListener('click', () => showScreen('instructions'));
ui.closeInstructionsButton.addEventListener('click', () => showScreen('start'));
ui.playAgainButton.addEventListener('click', startGame);
ui.shareButton.addEventListener('click', shareResult);

showScreen('start');
