const countrySelect = document.getElementById("countrySelect");
const submitButton = document.getElementById("submitButton");

const getCountryByName = async (countryName) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

const getAllCountries = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    const countryNames = data.map(country => country.name.common).sort();
    return countryNames;
  } catch (error) {
    console.log(error);
  }
}

const populateCountrySelect = async () => {
  try {
    const countryNames = await getAllCountries(); // had to use await here to resolve the Promise and get an array
    countryNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      countrySelect.appendChild(option);
    })
  } catch(error) {
    console.log(error);
  }
}


const populateTable = async (countryName) => {
  try {
    const country = await getCountryByName(countryName);
    const table = document.getElementById('countryTable');
    table.innerHTML = '';
    const rows = [
      ['Official Name', country.name.official],
      ['Capital', country.capital],
      ['Region', country.region],
      ['Currency', Object.values(country.currencies)[0].name + " (" + Object.values(country.currencies)[0].symbol + ") "],
      ['Population', country.population.toLocaleString()],
      ['Area (sq km)', country.area.toLocaleString()],
      ['Languages', Object.values(country.languages).join(', ')]

    ]
    rows.forEach(row => {
      const newRow = table.insertRow();
      const cell1 = newRow.insertCell();
      const cell2 = newRow.insertCell();
      cell1.textContent = row[0];
      cell2.textContent = row[1];
    })
  } catch (error) {
    console.log(error);
  }
}

const getCountryChoice = () => {
  return countrySelect.value;
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const countryName = getCountryChoice();
  console.log(countryName);
  populateTable(countryName);
})

populateCountrySelect();