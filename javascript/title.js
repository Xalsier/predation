$(document).ready(() => {
    initializeLanguageSettings();
    $('#language-select').change(() => {
        try {
            updateLanguage($('#language-select').val());
        } catch (error) {
            console.error('Error changing language:', error);
        }
    });
});

const initializeLanguageSettings = () => {
    const userLang = (navigator.language || navigator.userLanguage).substring(0, 2).toLowerCase();
    updateLanguage(userLang === 'en' ? 'en' : 'ja');
    $('#language-select').val(userLang === 'en' ? 'en' : 'ja');
};

const updateLanguage = (lang) => {
    $('.aperture button').text(lang === 'en' ? 'Hunt' : '狩り');
    $('#return-button').text(lang === 'en' ? 'Return' : '戻る');
    updateTitle(lang);
    updateFooter(lang);
    updateCommentSection(lang); // Update comment section UI
};

const updateCommentSection = (lang) => {
    $('#comment').attr('placeholder', lang === 'en' ? 'Comment' : 'コメント');
    $('#animal').attr('placeholder', lang === 'en' ? 'Animal' : '動物');
    $('#prey').attr('placeholder', lang === 'en' ? 'Prey ID' : '獲物ID');
    $('#post-comment').text(lang === 'en' ? 'Post' : '投稿');
    $('#toggle-comments').text(lang === 'en' ? 'Hide Comments' : 'コメントを隠す');
};


const updateTitle = (lang) => {
    document.title = lang === 'en' ? 'Primal Samsara' : 'プライマルサムサラ';
};

const updateFooter = (lang) => {
    const footer = document.querySelector('.homefooter');
    const githubLink = footer.querySelector('a[href="https://github.com/Xalsier/predation"]');
    const discordLink = footer.querySelector('a[href="https://discord.gg/e7RESW5E75"]');
    const copy1 = document.querySelector('.copy1');
    const copy2 = document.querySelector('.copy2');
    const copy3 = document.querySelector('.copy3');
    const notehelper = document.querySelector('.notehelper');
    if (lang === 'en') {
        githubLink.textContent = 'GitHub';
        discordLink.textContent = 'Discord';
        copy1.textContent = 'Primal Samsara ©';
        copy2.textContent = 'Xalsier 🍉';
        copy3.textContent = 'All Rights Reserved';
        notehelper.textContent = 'You can find the latest episode of the webcomic by clicking the Primal Samsara logo!';
    } else {
        githubLink.textContent = 'ギットハブ';
        discordLink.textContent = 'ディスコード';
        copy1.textContent = 'プライマルサムサラ ©';
        copy2.textContent = 'ザルシア 🍉';
        copy3.textContent = '全著作権所有';
        notehelper.textContent = 'プライマル・サムサラのロゴをクリックするとウェブコミックの最新エピソードが見られます！';
    }
};
