const creditsData = {
    "Site Artwork": [
        { title: "Background", imageUrl: "path/to/profile-image.jpg", link: "", name: "Dimi" },
        { title: "Logo", imageUrl: "path/to/logo-image.jpg", link: "", name: "Yuuika Hirasaki" }
    ],
    "Chapter Art": [
        { title: "Chapter 1", imageUrl: "path/to/maxorcito-image.jpg", link: "", name: "Maxorcito" },
        { title: "Chapter 2", imageUrl: "path/to/xalsier-image.jpg", link: "", name: "Xalsier" }
    ],
    "Character Concept Art": [
        { title: "Killian", imageUrl: "path/to/maxorcito-image.jpg", link: "", name: "ShadowxxFox" },
        { title: "Killian", imageUrl: "path/to/Fossil.jpg", link: "", name: "Fossil" },
        { title: "Naori", imageUrl: "path/to/ChosenComics.jpg", link: "", name: "ChosenComics" },
        { title: "Sera", imageUrl: "path/to/NicoStarlight.jpg", link: "https://twitter.com/Xalsier", name: "NicoStarlight" }
    ],
    "Special Thanks": [
        { title: "To", imageUrl: "path/to/cosmic-image.jpg", link: "https://open.spotify.com/artist/7rnbJU1HeUoxnYVdBXM4Wb?si=c6Ee2MjcSSGBTrBpyRTCZw", name: "Cosmic" }
    ]
};

function generateCredits(creditsData) {
    const container = document.getElementById('site_credits');
    for (const section in creditsData) {
        const column = document.createElement('div');
        column.classList.add('credits_column');

        const heading = document.createElement('strong');
        heading.textContent = section;
        column.appendChild(heading);

        creditsData[section].forEach(item => {
            const profile = document.createElement('div');
            profile.classList.add('profile');

            const title = document.createElement('p');
            title.textContent = item.title;
            profile.appendChild(title);

            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = `${item.title} Profile`;
            profile.appendChild(img);

            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.name; // Use the 'name' field for the link text
            profile.appendChild(link);

            column.appendChild(profile);
        });

        container.appendChild(column);
    }
}

generateCredits(creditsData);
