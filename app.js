const tvshowInput = document.getElementById('tvshow-input');
const addButton = document.getElementById('add-button');
const tvshowList = document.getElementById('tvshow-list');
const randomButton = document.getElementById('random-button');


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
      watched: false,
      liked: false,
      disliked: false
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
    
    if (tvshow.liked) li.classList.add('liked');
    if (tvshow.disliked) li.classList.add('disliked');

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

    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('like-btn');
    if (tvshow.liked) likeButton.classList.add('active');
    likeButton.addEventListener('click', () => {
      toggleLike(index);
    });

    const dislikeButton = document.createElement('button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.classList.add('dislike-btn');
    if (tvshow.disliked) dislikeButton.classList.add('active');
    dislikeButton.addEventListener('click', () => {
      toggleDislike(index);
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove'; 
    removeButton.addEventListener('click', () => {
      removeTvshow(index);
    });

    li.appendChild(likeButton);
    li.appendChild(dislikeButton);
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

const toggleLike = (index) => {
  tvshows[index].liked = !tvshows[index].liked;
  renderTvshows();
  saveTvshows();
};

const toggleDislike = (index) => {
  tvshows[index].disliked = !tvshows[index].disliked;
  renderTvshows();
  saveTvshows();
};

const removeTvshow = (index) => {
  tvshows.splice(index, 1);
  renderTvshows();
  saveTvshows();
};


const pickRandomSeries = () => {
  const unwatched = tvshows.filter(tvshow => !tvshow.watched);
  if (unwatched.length > 0) {
    const randomIndex = Math.floor(Math.random() * unwatched.length);
    alert(`Watch this next: ${unwatched[randomIndex].text}`);
  } else {
    alert("No unwatched series left! Add some more.");
  }
};

if (tvshowInput && addButton && tvshowList && randomButton) {
  addButton.addEventListener('click', addTvshow);
  randomButton.addEventListener('click', pickRandomSeries); 
  loadTvshows();
} else {
  console.error('One or more required DOM elements are missing.');
}

loadTvshows();