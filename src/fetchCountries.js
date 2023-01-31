import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

export default class CountriesApiService {
    constructor(){
        this.searchCountry = "";
    }
    
    fetchCountries(){
        const url = `https://restcountries.com/v3.1/name/${this.searchCountry}?fields=name,capital,population,flags,languages`;

       return fetch(url)
        .then(response =>{
                if (!response.ok){
                    throw new Error(response.status);
                    return;
                }
                return response.json();
            })
            .then(data=>{
                console.log(data);
                return data
            })
            .catch((error)=>Notiflix.Notify.failure("Oops, there is no country with that name"));
        }

    get searchCountry(){
        return this.countryName;
    }

    set searchCountry(newCountryName){
        this.countryName = newCountryName;
    }
    }
