const countryList = document.getElementById("countryList");

const getCountryByName = async (countryName) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    console.log(data[0].name.nativeName);
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




const generateTable = async (countryName) => {
  
}


// getCountryByName("poland");
// populateCountryList();