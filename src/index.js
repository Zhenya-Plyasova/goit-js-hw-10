import './css/styles.css';
import CountriesApiService from './fetchCountries.js';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import debounce from 'lodash.debounce';

window.onload = () => document.querySelector('#search-box').focus();

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
let markup ="";

const countriesApiService = new CountriesApiService();
searchBox.addEventListener("input", debounce(getRequestedCountry, DEBOUNCE_DELAY));

function getRequestedCountry(e){
    countriesApiService.countryName=e.target.value.trim();
    console.log(countriesApiService.countryName);
    if(countriesApiService.countryName===""){
    clearCountries();
        return;
    }
    countriesApiService.fetchCountries().then(renderCountriesList);
}

function clearCountries(){
    countryList.innerHTML="";
    countryInfo.innerHTML="";
}
function renderCountriesList(countries){
    if (countries===undefined){
        clearCountries();
    return;
    }
    else if (countries.length>10){
        clearCountries();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }else if(countries.length===1){
        markup = countries.map((country)=>{
            return  `<li ><img src=${country.flags.svg} width="40" alt=${country.flags.alt}></img><h1>${country.name.official}</h1><h3>Capital: <span>${country.capital}</span></h3><h3>Population: <span>${country.population}</span></h3><h3>languages: <span>${Object.values(country.languages).join(", ")}</span></h3></li>`;
        }).join("");
        countryInfo.innerHTML=markup;
        countryList.innerHTML="";
    }else{
    markup = countries.map((country)=>{
    return `<li class="country-element"><img src=${country.flags.svg} width="40" alt=${country.flags.alt}></img><h2>${country.name.official}</h2></li>`;
}).join("");
countryList.innerHTML=markup;
countryInfo.innerHTML="";}
}
