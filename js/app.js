'use strict';

// ====================== GLOBAL VARIABLES ======================//
let allProducts = [];
// querySelector = method
let myContainer = document.querySelector('section');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let clicks = 0;
let clicksAllowed = 25;
let indexArray = [];
let numberOfUniqueIndexes = 6;

// ====================== CONSTRUCTOR ======================//
function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
// display images
function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

  //use the .includes 
  // .pop() - removes last item
  // .push() - appends to the end of an array
  // .shift() - removes the first item
  // .unshift() - adds to the beginning of an array
function renderProducts() {
  while (indexArray.length < numberOfUniqueIndexes) {
    let randomNumber = selectRandomProduct();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
  }
}
console.log(indexArray);

let prod1 = indexArray.shift();
let prod2 = indexArray.shift();
let prod3 = indexArray.shift();

// deleting and adding to the array
  image1.src = allProducts[prod1].src;
  image2.src = allProducts[prod2].src;
  image3.src = allProducts[prod3].src;
  image1.alt = allProducts[prod1].name;
  image2.alt = allProducts[prod2].name;
  image3.alt = allProducts[prod3].name;
  allProducts[prod1].views++;
  allProducts[prod2].views++;
  allProducts[prod3].views++;
}
// create Local Storage
function storeToStorage () {
  let stringifiedProducts = JSON.stringify(allProducts);
  localStorage.setItem('productStorage', stringifiedProducts);
}

// check to see if there is a local storage
function checkLocalStorage () {
  let potentialProducts = localStorage.getItem('productStorage');
    if (potentialProducts) {
      let parsedProducts = JSON.parse(potentialProducts);
      allProducts = parsedProducts;
    }
}


// ====================== EVENT HANDLER ======================//
function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  console.log(clickedProduct);
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
    // calling the created storage
    storeToStorage();
  }
  console.log(indexArray);
}

// ====================== NEW INSTANCES ======================//
new Products ('bag');
new Products ('banana');
new Products ('bathroom');
new Products ('boots');
new Products ('breakfast');
new Products ('bubblegum');
new Products ('chair');
new Products ('cthulhu');
new Products ('dog-duck');
new Products ('dragon');
new Products ('pen');
new Products ('pet-sweep');
new Products ('scissors');
new Products ('shark');
new Products ('sweep', 'png');
new Products ('tauntaun');
new Products ('unicorn');
new Products ('water-can');
new Products ('wine-glass');

console.log(allProducts);
renderProducts();

// ====================== CHART DATA ======================//
function renderChart() {
  let productClicks = [];
  let productViews = [];
  let productNames = [];
    for (let i = 0; i < allProducts.length; i++) {
      productNames.push(allProducts[i].name);
      productClicks.push(allProducts[i].clicks);
      productViews.push(allProducts[i].views)
  }

console.log(renderProducts);


let chartObject = {
    type: 'bar',
    data: {
        labels: productNames,
        datasets: [{
            label: '# of Views',
            data: productViews,
            backgroundColor: '#9E971E',
            borderColor: '#9E971E',
            borderWidth: 1
        },
      {
      label: '# of Clicks',
            data: productClicks,
            backgroundColor: '#8E5CEB',
            borderColor: '#8E5CEB',
            borderWidth: 1
        }
      ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};   
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, chartObject);
  }

// ====================== EVENT LISTENER ======================//
myContainer.addEventListener('click', handleProductClick);

// check local storage - see in applications on server
checkLocalStorage();