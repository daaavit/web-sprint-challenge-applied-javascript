import axios from "axios"

const Card = (articles) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const cardsWrapper = document.createElement('div')
  cardsWrapper.classList.add('card')

  const articlesData = Object.values(articles).flat().map(art => art);

  for (let i = 0; i < articlesData.length; i++) {
    let articleItem = articlesData[i];
    console.log("articleItem", articleItem);

    const headlinDiv = document.createElement('div')
    const authorDiv = document.createElement('div')
    const imgContainer = document.createElement('div')
    const authorImg = document.createElement('img')
    const authorsNameSpan = document.createElement('span')

    headlinDiv.classList.add('headline')
    authorDiv.classList.add('author')
    imgContainer.classList.add('img-cointainer')
    cardsWrapper.classList.add('card')

    headlinDiv.textContent = articleItem.headline;
    imgContainer.alt = "Author Photo";
    authorImg.src = articleItem.authorPhoto;
    authorsNameSpan.textContent = articleItem.authorName;


    cardsWrapper.append(headlinDiv, authorDiv, imgContainer, authorImg, authorsNameSpan)

    authorImg.width ='50';
    authorImg.style.borderRight = '1px solid gray'

    
    


  }

  cardsWrapper.addEventListener('click', () => { console.log(cardsWrapper) })
  return cardsWrapper;
}



const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get(`http://localhost:5000/api/articles`)
    .then(response => {
      const cards = Card(response.data.articles);
      document.querySelector(selector).appendChild(cards);
    }).catch(error => {
      console.log(error)
    });
}

export { Card, cardAppender }
