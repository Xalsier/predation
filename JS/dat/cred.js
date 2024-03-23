const creditsData = {
    "Site Artwork": [
        { title: "Background Art:", imageUrl: "https://pbs.twimg.com/profile_images/1700691574412201984/OUT3LAlp_400x400.jpg", link: "https://twitter.com/dimidostoevsky", name: "Dimi" },
        { title: "Samsara Logo:", imageUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/5a62feb18531ff03a6fa8c502ad10f76-1686763029082/710fb114-4d28-4f88-9538-779dbe15ed7d.png", link: "https://www.fiverr.com/nekkonimestore", name: "Yuuika Hirasaki" }
    ],
    "Chapter Art": [
        { generalist: true, imageUrl: ["https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/fb93b3e0f174081a85806cef70f81a3b-1691187786611/6d8be301-6cd4-4905-b123-f40161b7563e.png", "../assets/fuwa.jpeg"], link: ["https://www.fiverr.com/maxtorcito", "https://twitter.com/Zarushia"], name: ["Maxorcito", "Xalsier"] }
    ],
    "Character Concept Art": [
        { generalist: true, imageUrl: ["https://storage.ko-fi.com/cdn/useruploads/ec3bca40-97c8-4f05-ba72-140bd7814fca.jpeg", "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/8e200b84fec56b4b6a9653c014039ac3-1636933825862/d5a7fdf9-36b7-44ad-ab5e-197ddc9851b3.jpg"], link: ["https://ko-fi.com/shadowxxfox", "https://www.fiverr.com/unagiroll"], name: ["ShadowxxFox", "NicoStarlight"] }
    ],
    "Github Collaborators - Front End": [
        { generalist: true, imageUrl: ["https://avatars.githubusercontent.com/u/59917313?v=4"], link: ["https://github.com/myCodingcanvas"], name: ["Khushi Agrawal"] }
    ]
};

function generateCredits(creditsData) {
    const container = document.getElementById('site_credits');
    for (const section in creditsData) {
        const column = document.createElement('div');
        column.classList.add('credits_column');

        const heading = document.createElement('h4');
        heading.textContent = section;
        column.appendChild(heading);

        const sectionData = creditsData[section];
        if (sectionData.length > 0 && sectionData[0].generalist) {
            const profile = document.createElement('div');
            profile.classList.add('profile');

            sectionData[0].imageUrl.forEach((url, index) => {
                if (url != null) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = `${sectionData[0].name[index]} Profile`;
                    profile.appendChild(img);

                    const link = document.createElement('a');
                    link.href = sectionData[0].link[index];
                    link.textContent = sectionData[0].name[index];
                    profile.appendChild(link);
                }
            });

            column.appendChild(profile);
        } else {
            sectionData.forEach(item => {
                const profile = document.createElement('div');
                profile.classList.add('profile');

                const title = document.createElement('strong');
                title.textContent = item.title;
                profile.appendChild(title);

                if (item.imageUrl != null) {
                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    img.alt = `${item.title} Profile`;
                    profile.appendChild(img);
                }

                if (item.link != null) {
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.textContent = item.name;
                    profile.appendChild(link);
                }

                column.appendChild(profile);
            });
        }

        container.appendChild(column);
    }
}

generateCredits(creditsData);
