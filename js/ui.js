import { updateSticker } from "./api.js";

export function renderStickers(stickers) {

    const container =
        document.getElementById(
            "stickersContainer"
        );

    container.innerHTML = "";

    const countries =
        groupByCountry(stickers);

    Object.entries(countries)
        .forEach(([country, items]) => {

            const checked =
                items.filter(
                    sticker => sticker.have
                ).length;

            const total =
                items.length;

            const group =
                items[0].group;

            const stickersHTML =
                items.map(sticker => {

                    return `
                        <label class="flex items-center justify-between bg-zinc-800 px-3 py-2 rounded-xl">

                            <div class="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    class="w-4 h-4"
                                    ${sticker.have ? "checked" : ""}
                                    data-code="${sticker.code}"
                                />

                                <span>
                                    ${sticker.code}
                                </span>

                            </div>

                        </label>
                    `;

                }).join("");

            container.innerHTML += `
                <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

                    <div class="flex items-center justify-between mb-4">

                        <div>

                            <h2 class="text-xl font-semibold">
                                ${country}
                            </h2>

                            <p class="text-zinc-400 text-sm">
                                Grupo ${group}
                            </p>

                        </div>

                        <span class="bg-zinc-800 text-sm px-3 py-1 rounded-full">
                            ${checked}/${total}
                        </span>

                    </div>

                    <div class="space-y-2">
                        ${stickersHTML}
                    </div>

                </div>
            `;
        });

    bindCheckboxEvents(stickers);

    updateProgress(stickers);
}

function groupByCountry(stickers) {

    return stickers.reduce((acc, sticker) => {

        if (!acc[sticker.country]) {
            acc[sticker.country] = [];
        }

        acc[sticker.country].push(sticker);

        return acc;

    }, {});
}

function bindCheckboxEvents(stickers) {

    const checkboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );

    checkboxes.forEach(checkbox => {

        checkbox.addEventListener(
            "change",
            async event => {

                const code =
                    event.target.dataset.code;

                const have =
                    event.target.checked;

                showLoading();

                try {

                    await updateSticker(
                        code,
                        have
                    );

                    const sticker =
                        stickers.find(
                            item =>
                                item.code === code
                        );

                    if (sticker) {
                        sticker.have = have;
                    }

                } finally {

                    hideLoading();
                }
            }
        );
    });
}

function updateProgress(stickers) {

    const total =
        stickers.length;

    const checked =
        stickers.filter(
            sticker => sticker.have
        ).length;

    const percentage =
        (checked / total) * 100;

    const progressText =
        document.getElementById(
            "progressText"
        );

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    progressText.innerText =
        `${checked}/${total}`;

    progressBar.style.width =
        `${percentage}%`;
}

export function showLoading() {

    const overlay =
        document.getElementById(
            "loadingOverlay"
        );

    overlay.classList.remove(
        "hidden"
    );

    overlay.classList.add(
        "flex"
    );
}

export function hideLoading() {

    const overlay =
        document.getElementById(
            "loadingOverlay"
        );

    overlay.classList.remove(
        "flex"
    );

    overlay.classList.add(
        "hidden"
    );
}