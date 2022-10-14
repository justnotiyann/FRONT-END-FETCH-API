const namaPokemon = document.querySelector("#nama_pokemon");
const formSearch = document.querySelector("#form_search");
const pokeDetails = document.querySelector("#poke_details");
const remove = document.querySelector("#remove");

const displayData = (id, nama, berat, ability, gambar) => {
  const resultData = `
    <tr>
        <td>${id}</td>
        <td>${nama}</td>
        <td>${berat}</td>
        <td>${ability}</td>
        <td>
        <img src="${gambar}" alt="gambar pokemon" widht="100%">
    </td>
    </tr>
    `;
  pokeDetails.insertAdjacentHTML("afterbegin", resultData);
};

const displayAlert = (data) => {
  const result = `
  <tr id="remove">
  <td colspan="5">
      <div class="alert alert-danger" role="alert">
        Pokemon ${data} Tidak ditemukann !!
      </div>
  </td>
</tr>`;
  pokeDetails.insertAdjacentHTML("afterbegin", result);
};

const fetchAPI = async (data) => {
  try {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${data}`);
    const result = await api.json();
    displayData(result.id, result.name, result.weight, result.abilities[0].ability.name, result.sprites.front_default);
  } catch (e) {
    displayAlert(data);
  }
};

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = namaPokemon.value.toLowerCase();
  fetchAPI(data);
});
