function getEmoteElement(emoteUrl) {
    return `<img src="${emoteUrl}" width="20" height="20" />`
}

export default class Support {
    constructor() {
        this.emotes = {}
    }

    findEmotes() {}
    
    replaceEmotes(textElement) {
        for (const word of textElement.innerHTML.split(' ')) {
            const emoteUrl = this.emotes[word.toLowerCase()]

            if (emoteUrl) {
                const emoteElement = getEmoteElement(emoteUrl)

                textElement.innerHTML = textElement.innerHTML.replace(word, emoteElement)
            }
        }
    }
}