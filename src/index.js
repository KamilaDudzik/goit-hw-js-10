import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchBox = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;