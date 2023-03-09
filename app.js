const countrySelect = document.getElementById("countrySelect");
const submitButton = document.getElementById("submitButton");
const table = document.getElementById('countryTable');
let header = document.querySelector('h1');
let flagImg = document.querySelector('#flagImg');
const logo = '<img src="./assets/globe.png?" alt="logo" id="logo">';

const getCountryByName = async (countryName) => {
  try {
    displayFetchingCountryData();
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
    alert("Error fetching country.");
  }
};

const getAllCountries = async () => {
  try {
    displayLoadingCountries();
    const response = await fetch(`https://restcountries.com/v3.1/all`); // returns a Promise that resolves to a Response object when the request is complete.
    // Response object represents the response to the request
    const data = await response.json(); // extract the JSON data from the response body
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
      resetHeader();
    })
  } catch(error) {
    console.log(error);
    alert("Error populating country list.");
  }
}

const populateInformation = async (countryName) => {
  try {
    const country = await getCountryByName(countryName);
    table.innerHTML = '';
    resetFlag();
    const rows = [
      ['Official Name', country.name.official],
      ['Capital', country.capital],
      ['Region', country.region],
      ['Main Currency', Object.values(country.currencies)[0].name + " (" + Object.values(country.currencies)[0].symbol + ") "],
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
    displayFlag(country);
    displaySuccess();
    setTimeout(() => {resetHeader()}, 3000);
  } catch (error) {
    console.log(error);
    alert("Error fetching country information.");
  }
}

const getCountryChoice = () => {
  return countrySelect.value;
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const countryName = getCountryChoice();
  populateInformation(countryName);
})

const displayFlag = (country) => {
  flagImg.setAttribute('src', country.flags.svg);
  flagImg.setAttribute('alt', "Selected country flag");
}

const resetFlag = () => {
  flagImg.setAttribute('src', "");
  flagImg.setAttribute('alt', "");
}

const resetHeader = () => {
  header.innerHTML = `${logo} CountrApp`;
}

const displayFetchingCountryData = () => {
  header.innerHTML = `${logo} Fetching country data...`;
}

const displaySuccess = () => {
  header.innerHTML = `${logo} Success!`;
}

const displayLoadingCountries = () => {
  header.innerHTML = `${logo} Loading countries...`;
}

populateCountrySelect();
