$("#get-card").on("click", getCard) 

let deckId;

$(getNewDeck)

async function getCard(){
  try {
    let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    // console.log(result);
    // console.log(`${result.data.cards[0].value} of ${result.data.cards[0].suit}`);
    let cardRotation = getRandomRotation();
    $("#card-results").append($(`<img src="${result.data.cards[0].image}">`).css("transform", `rotate(${cardRotation}deg)`));
  } catch(e){
    $("#deck-err").text("There are no more cards in the deck!");
  }
}



async function getNewDeck(){
  let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  deckId = newDeck.data.deck_id;
}

function getRandomRotation(){
  let rotation = Math.floor(Math.random() * (45));
  if(Math.random() > 0.5){
    rotation = rotation * -1;
  }
  return rotation;
}