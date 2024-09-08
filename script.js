const slider = document.querySelector('.slider');
const list = document.querySelector('.list');
const thumbnail = document.querySelector('.thumbnail');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

// load data from json
fetch('data/hero.json')
  .then((respone) => respone.json())
  .then((data) => {
    populateSlider(data.items);
    populateThumbnail(data.items);
  })
  .catch((error) => console.error('Error loading JSON', error));

// populate slider items
function populateSlider(items) {
  const template = list.querySelector('.template'); // Get the template
  items.forEach((item) => {
    const sliderItem = template.cloneNode(true); // Clone the template
    sliderItem.style.display = 'block'; // Show the item
    sliderItem.classList.remove('template'); // Remove the template class

    sliderItem.querySelector('.slider-image').src = item.image;
    sliderItem.querySelector('.slider-image').alt = item.name;
    sliderItem.querySelector('.title').textContent = item.title;
    sliderItem.querySelector('.name').textContent = item.name;
    sliderItem.querySelector('.avatar').src = item.avatar;
    sliderItem.querySelector('.avatar').alt = item.role;
    sliderItem.querySelector('figcaption').textContent = item.role;
    sliderItem.querySelector('.desc p').textContent = item.description;

    list.appendChild(sliderItem);
  });
}

// Populate thumbnail items
function populateThumbnail(items) {
  const template = thumbnail.querySelector('.template'); // Get the template
  items.forEach((item) => {
    const thumbnailItem = template.cloneNode(true); // Clone the template
    thumbnailItem.style.display = 'block'; // Show the item
    thumbnailItem.classList.remove('template'); // Remove the template class

    thumbnailItem.querySelector('.thumbnail-image').src = item.image;
    thumbnailItem.querySelector('.thumbnail-image').alt = 'thumbnail of ' + item.name;
    thumbnailItem.querySelector('.name').textContent = item.name;
    thumbnailItem.querySelector('blockquote').textContent = item.quote;

    thumbnail.appendChild(thumbnailItem);
  });
}

// autoplay slider
let runAutoPlay = setTimeout(() => {
  next.click();
}, 8000);

next.addEventListener('click', () => {
  initSlider('next');
});

prev.addEventListener('click', () => {
  initSlider('prev');
});

const initSlider = (type) => {
  const sliderItems = list.querySelectorAll('.item');
  const thumbnailItems = thumbnail.querySelectorAll('.item');

  if (type === 'next') {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add('next');
  } else {
    const lastItemPosition = sliderItems.length - 1;
    list.prepend(sliderItems[lastItemPosition]);
    thumbnail.prepend(thumbnailItems[lastItemPosition]);
    slider.classList.add('prev');
  }
  setTimeout(() => {
    slider.classList.remove('next');
    slider.classList.remove('prev');
  }, 2000);

  clearTimeout(runAutoPlay);

  runAutoPlay = setTimeout(() => {
    next.click();
  }, 8000);
};
