fetch('icons.json')
    .then(response => response.json())
    .then(files => {
        const iconSection = document.querySelector("section");

        files.forEach(filename => {
            if (filename.endsWith('.svg') && !filename.includes('Light')) {
                const a = document.createElement('a');
                const img = document.createElement('img');
                a.href = `icons/${filename}`;
                img.src = `icons/${filename}`;
                img.alt = filename;
                a.appendChild(img);
                iconSection.appendChild(a);
            }
        });
    })
    .catch(error => {
        console.error('Failed to load icon list:', error);
    });
