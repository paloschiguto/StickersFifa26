const API_URL = "https://script.google.com/macros/s/AKfycbw-dCvGsJEdewRz7DjfycDEXjqVtx4jFbpf30tRhiZCOoNHb-mE78AMG0tYsgcqZHXy/exec";

export async function getStickers() {

    try {
        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        return data;

    } catch (error) {
        console.error(
            "Erro ao buscar figurinhas:",
            error
        );

        return [];
    }
}

export async function updateSticker(code,have) {
    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                code,
                have
            })
        });

    } catch (error) {
        console.error(
            "Erro ao atualizar figurinha:",
            error
        );
    }
}