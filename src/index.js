// Get references to the necessary elements
const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
const filterBtn = document.querySelector('#good-dog-filter');

// Function to create a span element for a pup
function createPupSpan(pup) {
  const span = document.createElement('span');
  span.textContent = pup.name;

  // Add event listener to show pup info on click
  span.addEventListener('click', () => {
    showPupInfo(pup);
  });

  return span;
}

// Function to render pup spans in the dog bar
function renderPupSpans(pups) {
  dogBar.innerHTML = '';
  pups.forEach((pup) => {
    const pupSpan = createPupSpan(pup);
    dogBar.appendChild(pupSpan);
  });
}

// Function to fetch pup data from the API
function fetchPups() {
  fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((pups) => {
      renderPupSpans(pups);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to show pup info in the dog info section
function showPupInfo(pup) {
  dogInfo.innerHTML = '';

  const img = document.createElement('img');
  img.src = pup.image;

  const h2 = document.createElement('h2');
  h2.textContent = pup.name;

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

  // Add event listener to toggle good/bad dog status
  toggleBtn.addEventListener('click', () => {
    toggleGoodDogStatus(pup);
  });

  // Append elements to the dog info section
  dogInfo.appendChild(img);
  dogInfo.appendChild(h2);
  dogInfo.appendChild(toggleBtn);
}

// Function to toggle good/bad dog status
function toggleGoodDogStatus(pup) {
  const updatedStatus = !pup.isGoodDog;

  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isGoodDog: updatedStatus,
    }),
  })
    .then(() => {
      // Fetch the updated pup data and show the pup info again
      fetchPups();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to toggle the filter for good dogs
function toggleFilter() {
  const filterText = filterBtn.textContent;
  filterBtn.textContent = filterText.includes('ON') ? 'Filter good dogs: OFF' : 'Filter good dogs: ON';
  fetchPups();
}

// Event listener for filter button click
filterBtn.addEventListener('click', toggleFilter);

// Fetch pup data on page load
fetchPups();