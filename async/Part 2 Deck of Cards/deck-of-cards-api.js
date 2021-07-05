const url = 'https://deckofcardsapi.com/api/deck';

async function part1() {
   const data = await axios.get(`${url}/new/draw/`);
   let { suit, value } = data.data.cards[0];
   console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
part1();

async function part2() {
   let firstCardData = await axios.get(`${url}/new/draw/`);
   let deckId = firstCardData.data.deck_id;
   let secondCardData = await axios.get(`${url}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });
}
part2();

async function draw() {
   let $btn = $('button');
   let $area = $('#cards');
 
   let deckData = await axios.get(`${url}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cards = await axios.get(`${url}/${deckData.data.deck_id}/draw/`);
      let img = cards.data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let x = Math.random() * 40 - 20;
      let y = Math.random() * 40 - 20;
      console.log(cards.data.cards)
      console.log(cards.data.remaining)
      $area.append(
        $('<img>', {
          src: img,
          css: {
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
          }
        })
      );
      if (cards.data.remaining === 0) {
        $btn.remove();
        setTimeout(() => {
          location.reload();
        },2000);
      }
    });
  }


draw();
