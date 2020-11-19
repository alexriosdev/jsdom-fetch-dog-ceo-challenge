console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
  // imageListener();
  ulListener();
  dropListener();
  compareToList();
});


// Challenge 1 Solution
const imageListener = () => {
  const dogContainer = document.querySelector('#dog-image-container');

  fetch(imgUrl)
  .then( (promise) => promise.json() )
  .then( (result) => showImage(dogContainer, result.message) );

}

const showImage = (target, dogObject) => {
  dogObject.forEach(dog => {
    let dogContainer = document.createElement('div');
    target.appendChild(dogContainer);
    dogContainer.innerHTML = `<img src="${dog}" size="50">`;
  }) 
}

//Challenge 2 Solution
const ulListener = () => {
  const dogBreed = document.querySelector('#dog-breeds');  
  
  fetch(breedUrl)
  .then( (promise) => promise.json() )
  .then( (result) => showList(dogBreed, result.message) );
}

const showList = (target, dogBreed) => {
  for (const breed in dogBreed) {
    let dogList = document.createElement('li');
    target.appendChild(dogList);
    dogList.innerText = breed;
    listChildListener(dogList);
  }
}

// Challenge 3
// Add Listener To Every List
// Change Font
const listChildListener = (child) => {
  child.addEventListener('click', () => {
    child.style.color = 'blue';
  })
}

// Challenge 4
// Add listerner to dropdown
// for every letter, filter the list with a conditional
const dropListener = () => {
  const dropDown = document.querySelector('#breed-dropdown');
  dropDown.addEventListener('change', (event) => {
    let dropValue = event.target.value;
    listFilter(dropValue);
  });
}

const listFilter = (value) => {
  const children = document.querySelector('#dog-breeds').children;
  for (child of children) {
    if (child.innerHTML.charAt(0) !== value) {
      child.style.display = 'none';
    } else {
      child.style.display = 'block';
    }
  }
}
