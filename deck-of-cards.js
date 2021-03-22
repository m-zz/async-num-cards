$("#get-card").on("click", getCard) 

let deckId;

async function getCard(){
  let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  console.log(result);
  console.log(`${result.data.cards[0].value} of ${result.data.cards[0].suit}`);
}

$(getNewDeck)

async function getNewDeck(){
  let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/");
  deckId = newDeck.data.deck_id;
}