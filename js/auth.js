const ACCESS_CODE =
    "81705429";

export function setupAuth(onSuccess) {

    const modal =
        document.getElementById(
            "authModal"
        );

    const input =
        document.getElementById(
            "accessCodeInput"
        );

    const button =
        document.getElementById(
            "accessButton"
        );

    const error =
        document.getElementById(
            "authError"
        );

    button.addEventListener(
        "click",
        () => {

            const code =
                input.value.trim();

            if (code === ACCESS_CODE) {

                modal.remove();

                onSuccess();

            } else {

                error.classList.remove(
                    "hidden"
                );
            }
        }
    );
}