const countryList = document.getElementById("countryList");

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
    const countryNames = data.map(country => country.name.common);
    return countryNames;
  } catch (error) {
    console.log(error);
  }
}

const populateCountryList = async () => {
  try {
    const countryNames = await getAllCountries(); // had to use await here to resolve the Promise and get an array
    const countryList = document.getElementById('countrySelect');
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
    const rows = [
      ['Official Name', country.name.common],
      ['Capital', country.capital]
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

populateCountryList();
populateTable("peru");