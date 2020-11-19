const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener('DOMContentLoaded', () => {
  elementListener('#dog-image-container', imgUrl, 'div');
  elementListener('#dog-breeds', breedUrl, 'li');
  dropListener();
});

// REFACTOR CHALLENGE 1 & 2 COMBINED
const elementListener = (targetID, URL, newElement) => {
  const target = document.querySelector(targetID);

  fetch(URL)
  .then( (response) => response.json() )
  .then( (data) => showData(target, data.message, newElement) );
}

const showData = (target, data, element) => {
  if (element === 'div') {
    handleDiv(target, data, element);
  }
  if (element === 'li') {
    handleList(target, data, element);
  }
}

const handleDiv = (target, data, element) => {
  data.forEach(dogImage => {
    let dogContainer = document.createElement(element);
    target.appendChild(dogContainer);
    dogContainer.innerHTML = `<img src="${dogImage}" size="50">`;
  }) 
}

const handleList = (target, data, element) => {
  for (const breed in data) {
    let dogList = document.createElement(element);
    target.appendChild(dogList);
    dogList.innerText = breed;
    listChildListener(dogList);
  }
}

// CHALLENGE 3
const listChildListener = (child) => {
  child.addEventListener('click', () => {
    child.style.color = 'blue';
  })
}

// CHALLENGE 4
const dropListener = () => {
  const dropDown = document.querySelector('#breed-dropdown');
  dropDown.addEventListener('change', (event) => {
    listFilter(event.target.value);
  });
}

const listFilter = (value) => {
  const children = document.querySelector('#dog-breeds').children;
  for (child of children) {
    if (child.innerHTML.charAt(0) === value) {
      child.style.display = 'block';
    } else {
      child.style.display = 'none';
    }
  }
}