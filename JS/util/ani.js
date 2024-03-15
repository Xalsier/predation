const setRandomAnimal = async () => {
    const { animalList } = await import('../dat/animalList.js');
    const languageArray = animalList[window.currentLanguageIndex];
    const randomIndex = Math.floor(Math.random() * languageArray.length);
    const randomAnimal = languageArray[randomIndex];
    document.getElementById('animal').value = randomAnimal;
};
window.setRandomAnimal = setRandomAnimal;