const fav_num = 3;
const url = "http://numbersapi.com";

async function part1() {
  const data = await axios.get(`${url}/${fav_num}?json`);
  console.log(data);
}
part1();

const fav_nums = [3, 7, 21];
async function part2() {
  const data = await axios.get(`${url}/${fav_nums}?json`);
  console.log(data);
}
part2();

async function part3() {
  const area = document.querySelector(".data");
  const facts = await Promise.all(
    Array.from({ length: 4 }, () => {
    return axios.get(`${url}/${fav_num}?json`);
  })
).then(facts => {
  for (var i = 0; i < facts.length; i++) {
    const list_facts = document.createElement("p");
    list_facts.textContent = facts[i].data.text;
    area.append(list_facts);
  }
});
}

part3();
