import { getStickers } from "./api.js";
import {
    renderStickers,
    showLoading,
    hideLoading
} from "./ui.js";
import { state } from "./state.js";
import { applyFilters } from "./filters.js";

async function init() {
    showLoading();

    try {
        const stickers = await getStickers();

        state.stickers = stickers;

        populateCountries();
        bindFilters();
        updateUI();

    } finally {
        hideLoading();
    }
}

function updateUI() {

    const filtered =
        applyFilters(
            state.stickers,
            state.filters
        );

    renderStickers(filtered);
}

function bindFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const groupFilter =
        document.getElementById(
            "groupFilter"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const countryFilter =
        document.getElementById(
            "countryFilter"
        );

    searchInput
        .addEventListener(
            "input",
            event => {

                state.filters.search =
                    event.target.value;

                updateUI();
            }
        );

    groupFilter
        .addEventListener(
            "change",
            event => {

                state.filters.group =
                    event.target.value;

                updateUI();
            }
        );

    statusFilter
        .addEventListener(
            "change",
            event => {

                state.filters.status =
                    event.target.value;

                updateUI();
            }
        );

    countryFilter
        .addEventListener(
            "change",
            event => {

                state.filters.country =
                    event.target.value;

                updateUI();
            }
        );
}

function populateCountries() {

    const countryFilter =
        document.getElementById(
            "countryFilter"
        );

    const countries =
        [...new Set(
            state.stickers.map(
                sticker => sticker.country
            )
        )];

    countries.sort();

    countries.forEach(country => {

        countryFilter.innerHTML += `
            <option value="${country}">
                ${country}
            </option>
        `;
    });
}

init();