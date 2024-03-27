# Repo Brief

Development Repository for the English version of the Primal Samsara webnovel site.

![Primal Samsara](https://en.predation.jp/assets/log.webp) 

## Localizations

English: https://en.predation.jp<br>
Japanese: https://predation.jp

### Semi-Localized, but without a site.

Korean, Spanish

### Not Localized, but Planned

* **French (Français)**
* **German (Deutsch)**
* **Italian (Italiano)**
* **Portuguese (Português)**
* **Russian (Русский)**
* **Chinese (中文)**
* **Arabic (العربية)** 
* **Hindi (हिन्दी)**
* **Dutch (Nederlands)**
* **Turkish (Türkçe)**

Community-driven translation efforts are welcome!

#### Documentation for Community Review for Localization:

- 'false' can be added to the second element of an array in ../JSON/user_interface, as a flag to let others know this item may potentially be poorly translated, or may not have the intending meaning. For example:

```
"es": ["¡Capítulo 3 ya está disponible! (¡Y es casi el doble del tamaño del Capítulo 1!)", false],
```

Some may be missing an object array, these can be added to suit this purpose. The code (Should) be able to handle the differences.

## New features currently on the English Repository

*Reference to know what features are missing in other localizations*

* Larch branch placeholder for images when they don't load from hunt.


## TODO

### Spotted Issues:
(#11) - Edit count returns ? due to using older system. In need of a new way to count edits.

### High Priority Tasks
- Issue 11

### Medium Priority Tasks
- Bringing back the Wiki & Gallery

#### Related (Ecosystem) Categories
- Flora
- Species
- Articles (Blueprint to be queried for Character Profiles)

### Low Priority Tasks
- Editor/Writer profile
- Character profiles
- Comment filtering
- Press Kit
- Primal Market / Support Coffee
- Privacy Policy

### Completed Tasks
- 03/24 FAQ
- 03/18 Credits
- 03/14 Reduce dependency on Jquery to reduce script loading for users using low performance browsers.
- 03/14 Implement a 4th variable to chapter art credits for social media links, to properly credit artists.

### Possible projects
- Place to put buddhist and auxillary philosophy in context with the webnovel. Temple?
