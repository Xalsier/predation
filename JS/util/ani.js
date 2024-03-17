const setRandomAnimal = async () => {
    fetch('../../JSON/animalList.json')
        .then(response => response.json())
        .then(data => {
            const languageArray = data[window.currentLanguageIndex];
            const randomIndex = Math.floor(Math.random() * languageArray.length);
            const randomAnimal = languageArray[randomIndex];
            document.getElementById('animal').value = randomAnimal;
        })
        .catch(error => console.error(error));
};
window.setRandomAnimal = setRandomAnimal;