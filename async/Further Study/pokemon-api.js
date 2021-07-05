const url = "https://pokeapi.co/api/v2";

async function part1() {
  const data = await axios.get(`${url}/pokemon/?limit=1000`);
  console.log(data);
}
part1();

async function part2() {
  const data = await axios.get(`${url}/pokemon/?limit=1000`);
  let random_Urls = [];
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * data.data.results.length);
      let url = data.data.results.splice(x, 1)[0].url;
      random_Urls.push(url);
    }
  let pokemonData = await Promise.all(
      random_Urls.map(url => axios.get(url))
  );
    pokemonData.forEach(p => console.log(p));
}
part2();

async function part3() {
    const data = await axios.get(`${url}/pokemon/?limit=1000`);
    let random_Urls = [];
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * data.data.results.length);
      let url = data.data.results.splice(x, 1)[0].url;
      random_Urls.push(url);
    }
    let pokemonData = await Promise.all(
      random_Urls.map(url => axios.get(url))
    );
    // console.log(pokemonData[1].data.name)
    let speciesData = await Promise.all(
      pokemonData.map(p => axios.get(p.data.species.url))
    );
    descriptions = speciesData.map(d => {
      let descriptionObj = d.data.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      return descriptionObj
        ? descriptionObj.flavor_text
        : "No description available.";
    });
    descriptions.forEach((desc, i) => {
      console.log(`${pokemonData[i].data.name}: ${desc}`);
    });
}
part3();


$(document).ready(function() {
  let $btn = $("button");
  let $area = $("#pokemon");

  $btn.on("click", async function() {
    $area.empty();
    let data = await axios.get(`${url}/pokemon/?limit=1000`);
    let random_Urls = [];
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * data.data.results.length);
      let url = data.data.results.splice(x, 1)[0].url;
      random_Urls.push(url);
    }
    let pokemonData = await Promise.all(
      random_Urls.map(url => axios.get(url))
    );
    console.log(pokemonData);
    let speciesData = await Promise.all(
      pokemonData.map(p => axios.get(p.data.species.url))
    );
    speciesData.forEach((d, i) => {
      let descriptionObj = d.data.flavor_text_entries.find(function(entry) {
        return entry.language.name === "en";
      });
      let description = descriptionObj ? descriptionObj.flavor_text : "";
      let name = pokemonData[i].data.name;
      let src = pokemonData[i].data.sprites.front_default;
      let ability = pokemonData[i].data.abilities[0].ability.name
      let moveset = [];
      let move1 = pokemonData[i].data.moves[0].move.name
      let move2 = pokemonData[i].data.moves[1].move.name
      let move3 = pokemonData[i].data.moves[2].move.name
      moveset.push(move1 , move2 , move3);
      let type = pokemonData[i].data.types[0].type.name;
      console.log(type)
      
      $area.append(makePokeCard(name, src, description, ability, moveset, type));
    });
  });

  function makePokeCard(name, src, description, ability, moveset, type) {
    return `
      <div class="card">
        <h4 class="type">${type}</h4>
        <h1 class="name">${name}</h1>
        <img src=${src} />
        <p>${description}</p>
        <p>Special Ability: ${ability}</p>
        <ul style="list-style-type:none;">
        <li>Moves: ${moveset}</li>
        </ul> 
      </div>
    `;
  }
});