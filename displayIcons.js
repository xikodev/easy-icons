let allIcons = [];

fetch('icons.json')
    .then(response => response.json())
    .then(files => {
        allIcons = files.filter(filename =>
            filename.endsWith('.svg')
        );
        renderIcons(allIcons);
    })
    .catch(error => {
        console.error('Failed to load icon list:', error);
    });

function renderIcons(iconList) {
    const iconSection = document.querySelector("section");
    iconSection.innerHTML = '';

    iconList.forEach(filename => {
        const img = document.createElement('img');

        const fullURL = `https://easyicons.xyz/icons/${filename}`;
        const altText = getAltText(filename);
        const htmlSnippet = `<a href="https://easyicons.xyz/" target="_blank"><img src="${fullURL}" alt="${altText}" width="48px"></a>`;

        img.src = fullURL;
        img.alt = altText;
        img.title = "Click to copy HTML tag";
        img.style.cursor = "pointer";

        img.onclick = () => {
            navigator.clipboard.writeText(htmlSnippet)
                .then(() => showAlert(altText))
                .catch(err => console.error("Copy failed:", err));
        };

        iconSection.appendChild(img);
    });
}

function showAlert(icon) {
    const alertDiv = document.querySelector("#alert");
    let opacity = 1.0;

    alertDiv.innerHTML = `<p>${icon} icon HTML copied to clipboard!</p>`;
    alertDiv.style.opacity = opacity.toString();

    setTimeout(() => {
        const fadeOut = setInterval(() => {
            opacity -= 0.1;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fadeOut);
            }
            alertDiv.style.opacity = opacity.toString();
        }, 50);
    }, 1000);
}

function getAltText(filename) {
    return filename
        .replace('.svg', '')
        .replace(/[-_]/g, ' ')
        .replace(/\b(Light|Dark)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase());
}

document.getElementById('iconSearch').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredIcons = allIcons.filter(filename =>
        filename.toLowerCase().includes(query)
    );
    renderIcons(filteredIcons);
});
