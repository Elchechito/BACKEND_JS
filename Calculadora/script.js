
const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".button");

botones.forEach(button => {
    button.addEventListener("click", () => {
        const buttonOn = button.textContent;

        if (button.id === "limpiar") {
            pantalla.textContent = "0";
            return;
        }

        if (button.id === "borrar") {
            if (pantalla.textContent === "0" || pantalla.textContent === "!SYNTAX ERROR!") {
                return;
            }
            if (pantalla.textContent.length === 1) {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (button.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch (error) {
                pantalla.textContent = "!SYNTAX ERROR!";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "!SYNTAX ERROR!") {
            pantalla.textContent = buttonOn;
        } else {
            pantalla.textContent += buttonOn;
        }
    });
});

