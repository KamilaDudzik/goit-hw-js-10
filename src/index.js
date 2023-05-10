import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchBox = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

const inputHandler = (event) => {
    const textInput = event.target.value.trim();

    if (!textInput) {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(textInput)
        .then(countries => {
            console.log(countries);
            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            renderMarkup(countries);
        })
        .catch(error => {
            countryList.innerHTML = "";
            countryInfo.innerHTML = "";
            Notiflix.Notify.failure("Oops, there is no country with that name");
    })
};


const renderMarkup = (countries) => {
    if (countries.length === 1) {
        countryList.innerHTML = "";
        const markupInfo = renderInfoMarkup(countries);
        countryInfo.innerHTML = markupInfo;
    } else {
        countryInfo.innerHTML = "";
        const markupList = renderListMarkup(countries);
        countryList.innerHTML = markupList;
    }
};

const renderListMarkup = (countries) => {
    return countries
        .map(({ name, flags }) => {
            return `<li>
            <h2 class="country-name"><img src="${flags.svg}" />${name.official}</h2>
            </li>`
        })
        .join("");
};

const renderInfoMarkup = (countries) => {
    return countries
        .map(({ name, capital, population, flags, languages }) => {
            return `<li>
            <h2 class="country-name"><img src="${flags.svg}" />${name.official}</h2>
            <p class="country-data-field"><b>Capital:</b> ${capital}</p>
            <p class="country-data-field"><b>Population:</b> ${population}</p>
            <p class="country-data-field"><b>Languages:</b> ${Object.values(languages)}</p>
            </li>`
        })
        .join("");
};

searchBox.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY));