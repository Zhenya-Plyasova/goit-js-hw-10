import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
// const URL = "https://restcountries.com/v3.1/name/";
// let countryName="";
const searchBox = document.querySelector("#search-box");

searchBox.addEventListener("input", debounce(getRequestedCountry, DEBOUNCE_DELAY));

function getRequestedCountry(e){

    countryName=e.target.value.trim();
    console.log(countryName.trim());
    fetchCountries(countryName);
}

function fetchCountries(name){
   if (name = ""){
    return
   }
   fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response =>{
        // if (!response.ok){
        //     throw new Error(response.status);
        // }
        return response.json();
    })
    .then(data=>{
        console.log(data);
    })
    .catch((error)=>console.log(error));
}

// function renderCountriesList(countries){
//     const markup = countries.map((country)=>{
//     
// }

// }
