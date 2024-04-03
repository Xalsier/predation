let preyData;

fetch('../../JSON/prey.json')
  .then(response => response.json())
  .then(data => {
    preyData = data;
    updateTracersAndEcosystem();
  });

function updateTracersAndEcosystem() {
  const tracers = Array.from(new Set(preyData.flatMap(prey => prey.scent.concat(prey.tracks, prey.markings))));
  const uniqueTracers = new Set(tracers);
  document.getElementById('ecosystem-size').textContent = `Ecosystem Heat: ${preyData.length + uniqueTracers.size}`;
}

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');
const preyContainer = document.getElementById('prey-container');
const md = window.markdownit({ html: true });
let huntFilter = [];

searchInput.addEventListener('input', function() {
  updateSuggestions(this.value.toLowerCase());
  document.querySelector('.search-container').style.display = this.value ? '' : 'none';
});

function updateSuggestions(inputValue) {
  while (suggestionsList.firstChild) {
    suggestionsList.removeChild(suggestionsList.firstChild);
  }

  if (inputValue && preyData) {
    let suggestions = Array.from(new Set(preyData.flatMap(prey => prey.scent.concat(prey.tracks, prey.markings))))
      .filter(tracer => tracer.toLowerCase().startsWith(inputValue))
      .slice(0, 3);
    const fragment = document.createDocumentFragment();

    suggestions.forEach(suggestion => {
      const listItem = document.createElement('li');
      listItem.className = 'suggestion';
      listItem.addEventListener('click', () => addPrey(suggestion));

      const textSpan = document.createElement('span');
      textSpan.className = 'suggestion-text';

      if (preyData.some(prey => prey.scent.includes(suggestion))) {
        textSpan.classList.add('scent');  
      } else if (preyData.some(prey => prey.tracks.includes(suggestion))) {
        textSpan.classList.add('tracks');
      } else if (preyData.some(prey => prey.markings.includes(suggestion))) {
        textSpan.classList.add('marking-detail');
      }

      textSpan.textContent = suggestion;
      listItem.appendChild(textSpan);

      const countSpan = document.createElement('span');
      countSpan.className = 'suggestion-count';
      countSpan.textContent = `${preyData.filter(prey => 
        prey.scent.includes(suggestion) || prey.tracks.includes(suggestion) || prey.markings.includes(suggestion)
      ).length}`;
      listItem.appendChild(countSpan);

      fragment.appendChild(listItem);
    });

    suggestionsList.appendChild(fragment);
  }
}

function addPrey(tracer) {
  if (!huntFilter.includes(tracer)) {
    huntFilter.push(tracer);
    updatePreyContainer();
    updatePreyTrap();
  }
  searchInput.value = '';
  updateSuggestions('');
  document.querySelector('.search-container').style.display = 'none';
}

function removePrey(tracer) {
  huntFilter = huntFilter.filter(t => t !== tracer);
  updatePreyContainer();
  updatePreyTrap();
}

function updatePreyContainer() {
  preyContainer.innerHTML = '';
  huntFilter.forEach(tracer => {
    const tracerSpan = document.createElement('span');
    tracerSpan.className = 'suggestion-text';
    tracerSpan.textContent = tracer;
    tracerSpan.onclick = () => removePrey(tracer);
    preyContainer.appendChild(tracerSpan);
  });
}

function createTrap(prey) {
  const trapDiv = document.createElement('div');
  trapDiv.className = 'trap';
  const yiffToggle = document.getElementById('yiff-toggle');

  let imageIndex = 0;


  const img = document.createElement('img');
  img.src = prey.src[imageIndex]; 
  trapDiv.appendChild(img);
  const tracersDiv = document.createElement('div');
  tracersDiv.id = 'tracers';
  ['scent', 'tracks', 'markings'].forEach(attr => {
    if (attr === 'markings') {
      const attrDiv = document.createElement('div');
      attrDiv.className = `suggestion-text ${attr}`;
      attrDiv.textContent = prey[attr].length > 1 ? '+' : prey[attr][0];
      attrDiv.onclick = () => {
          tracersDiv.querySelectorAll(`.marking-detail`).forEach(element => {
              element.style.display = element.style.display === 'none' ? '' : 'none';
          });
      };
      tracersDiv.appendChild(attrDiv);

      prey[attr].forEach(item => {
          const detailDiv = document.createElement('div');
          detailDiv.className = `suggestion-text marking-detail`;
          detailDiv.textContent = item;
          detailDiv.style.display = 'none';
          tracersDiv.appendChild(detailDiv);
      });
    } else {
      prey[attr].forEach(item => {
          const attrDiv = document.createElement('div');
          attrDiv.className = `suggestion-text ${attr}`;
          attrDiv.textContent = item;
          tracersDiv.appendChild(attrDiv);
      });
    }
  });

  trapDiv.appendChild(tracersDiv);
  return trapDiv;
}

function updatePreyTrap() {
  const preyTrap = document.getElementById('prey-trap');
  preyTrap.innerHTML = '';
  const mdFile = `https://hunt.predation.jp/Prey/${huntFilter[0]}.md`;

  fetch(mdFile)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('MD file not found, proceeding with other traps.');
      }
    })
    .then(text => {
      const markdownTrap = createMdTrap(text, huntFilter[0]);
      preyTrap.appendChild(markdownTrap);
    })
    .catch(error => {
      console.error(error.message);
    })
    .finally(() => {
      preyData.forEach(prey => {
        huntFilter.forEach(tracer => {
          if (prey.scent.includes(tracer) || prey.tracks.includes(tracer) || prey.markings.includes(tracer)) {
            const trapDiv = createTrap(prey);
            preyTrap.appendChild(trapDiv);
          }
        });
      });
    });
}

function createMdTrap(mdContent, tracer) {
  const trapDiv = document.createElement('div');
  trapDiv.className = 'trap';
  const markdownDiv = document.createElement('div');
  markdownDiv.id = 'markdown-content';
  markdownDiv.innerHTML = md.render(mdContent);
  trapDiv.appendChild(markdownDiv);

  const tracersDiv = document.createElement('div');
  tracersDiv.id = 'tracers';
  const tracerDiv = document.createElement('div');
  tracerDiv.className = 'suggestion-text tracks';
  tracerDiv.textContent = tracer;
  tracersDiv.appendChild(tracerDiv);
  trapDiv.appendChild(tracersDiv);

  return trapDiv;
}
