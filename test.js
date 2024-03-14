        // Check for element upfront
        const targetElement = document.querySelector(selector);
        if (!targetElement) return; // Element not found, exit

        // Fetch attempt
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load content from: ${path}`);
        }

        const text = await response.text();
        const renderedHtml = simpleMarkdownParse(text); // Assuming you have this function
        targetElement.innerHTML = renderedHtml;
