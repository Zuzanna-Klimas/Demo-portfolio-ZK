
const assets = {
    skin: [
        "images/skin/skin1.png" 
    ],
    eyes: [
        "images/eyes1.png" 
    ],
    hair: [
        "images/hair1.png" 
    ],
    shirt: [
        "images/shirt1.png" 
    ]
};



// Obiekt, który przechowuje aktualnie wybrany indeks dla każdej kategorii
let currentIndices = {
    skin: 0,
    eyes: 0,
    hair: 0,
    shirt: 0,
};

// Funkcja do zmiany części postaci
function changePart(category, direction) {
    // Pobieramy listę dostępnych opcji dla danej kategorii
    const options = assets[category];
    // Pobieramy aktualnie wybrany indeks
    let currentIndex = currentIndices[category];

    // Zmieniamy indeks (w przód lub w tył)
    currentIndex += direction;

    // Sztuczka, która zapętla przewijanie:
    // Jeśli wyjdziemy poza zakres z prawej, wracamy na początek.
    if (currentIndex >= options.length) {
        currentIndex = 0;
    }
    // Jeśli wyjdziemy poza zakres z lewej, wracamy na koniec.
    if (currentIndex < 0) {
        currentIndex = options.length - 1;
    }

    // Zapisujemy nowy indeks
    currentIndices[category] = currentIndex;

    // Aktualizujemy obrazek na stronie
    updateCharacter();
}

// Funkcja, która aktualizuje wszystkie obrazki i opisy na stronie
function updateCharacter() {
    // 'Object.keys(assets)' da nam listę kategorii: ['skin', 'eyes', 'hair', 'shirt']
    for (const category of Object.keys(assets)) {
        // Znajdź element obrazka na stronie, np. <img id="skin-layer">
        const imageElement = document.getElementById(`${category}-layer`);
        // Znajdź element opisu, np. <span id="skin-name">
        const nameElement = document.getElementById(`${category}-name`);

        // Pobierz aktualny indeks dla tej kategorii
        const index = currentIndices[category];
        // Pobierz ścieżkę do nowego obrazka z naszej konfiguracji
        const newImageSrc = assets[category][index];

        // Ustaw nową ścieżkę dla obrazka
        imageElement.src = newImageSrc;
        
        // Zaktualizuj tekst opisu (np. "Skóra 1", "Skóra 2")
        // 'category.charAt(0).toUpperCase() + category.slice(1)' zmienia 'skin' na 'Skin'
        const displayName = category.charAt(0).toUpperCase() + category.slice(1);
        nameElement.textContent = `${displayName} ${index + 1}`;
    }
}

// Wywołaj funkcję raz na samym początku, aby załadować domyślny wygląd postaci
document.addEventListener('DOMContentLoaded', updateCharacter);
