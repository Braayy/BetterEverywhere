import type { EmoteCollection } from "../common";
import type { Provider } from "./provider";

const GET_EMOTE_IDS = "https://api.frankerfacez.com/v1/room/id/";

export class FrankerFaceZUser implements Provider {
    async fetchEmotes(userId?: string): Promise<EmoteCollection> {
        const frankerFaceZEmotesResponse = await fetch(GET_EMOTE_IDS + userId);
        const frankerFaceZEmotes = await frankerFaceZEmotesResponse.json();

        const emotes = new Map<string, string>();

        const setId = frankerFaceZEmotes.room.set;
        const emoticons = frankerFaceZEmotes.sets[setId].emoticons;

        for (const emote of emoticons) {
            emotes.set(emote.name.toLowerCase(), `https:${emote.urls["1"]}`);
        }

        return emotes;
    }
}
