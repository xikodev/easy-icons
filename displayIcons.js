fetch('icons.json')
    .then(response => response.json())
    .then(files => {
        const iconSection = document.querySelector("section");

        files.forEach(filename => {
            if (filename.endsWith('.svg') && !filename.includes('Light')) {
                const img = document.createElement('img');
                const fullURL = `https://easyicons.xyz/icons/${filename}`;
                const altText = getAltText(filename);
                const htmlSnippet = `<img src="${fullURL}" alt="${altText}">`;

                img.src = fullURL;
                img.alt = altText;
                img.title = "Click to copy HTML tag";
                img.style.cursor = "pointer";

                img.onclick = () => {
                    navigator.clipboard.writeText(htmlSnippet)
                        .then(() => alert(`Copied:\n${htmlSnippet}`))
                        .catch(err => console.error("Copy failed:", err));
                };

                iconSection.appendChild(img);
            }
        });
    })
    .catch(error => {
        console.error('Failed to load icon list:', error);
    });

function getAltText(filename) {
    return filename
        .replace('.svg', '')
        .replace(/[-_]/g, ' ')
        .replace(/\b(Light|Dark)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase());
}
