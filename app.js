const tvshowInput = document.getElementById('tvshow-input');
const addButton = document.getElementById('add-button');
const tvshowList = document.getElementById('tvshow-list');


let tvshows = [];


const loadTvshows = () => {
  const storedTvshows = localStorage.getItem('tvshows')
  if (storedTvshows) {
    tvshows = JSON.parse(storedTvshows);
    renderTvshows();
  }
};


const saveTvshows = () => {
  localStorage.setItem('tvshows', JSON.stringify(tvshows));
};


const addTvshow = () => {
  const tvshowText = tvshowInput.value.trim();
  if (tvshowText !== '') {
    const newTvshow = {
      text: tvshowText,
      watched: false
    };

    tvshows.push(newTvshow);
    tvshowInput.value = '';
    renderTvshows();
    saveTvshows();
  }
};

addButton.addEventListener('click', addTvshow);

const renderTvshows = () => {
  tvshowList.innerHTML = '';
  tvshows.forEach((tvshow, index) => {
    const li = document.createElement('li');
    
    // Create span for text (similar to a div)
    const span = document.createElement('span');
    span.textContent = tvshow.text;
    li.appendChild(span);

    if (tvshow.watched) {
      li.classList.add('watched');
    }

    const watchedButton = document.createElement('button');
    watchedButton.textContent = 'Watched'; 
    watchedButton.addEventListener('click', () => {
      toggleWatched(index);
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove'; 
    removeButton.addEventListener('click', () => {
      removeTvshow(index);
    });

    li.appendChild(watchedButton);
    li.appendChild(removeButton);
    tvshowList.appendChild(li);
  });
};

const toggleWatched = (index) => {
  tvshows[index].watched = !tvshows[index].watched;
  renderTvshows();
  saveTvshows();
};

const removeTvshow = (index) => {
  tvshows.splice(index, 1);
  renderTvshows();
  saveTvshows();
};

loadTvshows();