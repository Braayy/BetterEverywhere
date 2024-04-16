export type EmoteCollection = Map<string, string>;

export function replaceEmotes(textElement: Element, emotes: EmoteCollection) {
    for (const word of textElement.innerHTML.split(" ")) {
        const emoteUrl = emotes.get(word.toLowerCase());

        if (emoteUrl) {
            // TODO: Add option to toggle emotes on the page
            const emoteElement = `<img src="${emoteUrl}" width="20" height="20" title="${word}" class="bettereverywhere_injected_emote" />`;

            textElement.innerHTML = textElement.innerHTML.replace(word, emoteElement);
        }
    }
}

declare global {
    interface Element {
        alreadyInjected: boolean;
    }
}
