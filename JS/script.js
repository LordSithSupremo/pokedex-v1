const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_img')

const Form = document.querySelector('.form')
const Input = document.querySelector('.input_search')

const buttonBefore = document.querySelector('.btn-before')
const buttonAfter = document.querySelector('.btn-after')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse === 200) {
        
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando busca...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        Input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        Input.value = '';
    }

}

Form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(Input.value.toLowerCase());

});

buttonBefore.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonAfter.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);