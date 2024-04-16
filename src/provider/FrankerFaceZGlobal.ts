import type { EmoteCollection } from "../common";
import type { Provider } from "./provider";

const GET_EMOTE_IDS = "https://api.frankerfacez.com/v1/emoticons";

export class FrankerFaceZGlobal implements Provider {
    async fetchEmotes(userId?: string): Promise<EmoteCollection> {
        const frankerFaceZEmotesResponse = await fetch(GET_EMOTE_IDS);
        const frankerFaceZEmotes = await frankerFaceZEmotesResponse.json();

        const emotes = new Map<string, string>();

        for (const emote of frankerFaceZEmotes.emoticons) {
            emotes.set(emote.name.toLowerCase(), `https:${emote.urls["1"]}`);
        }

        return emotes;
    }
}
