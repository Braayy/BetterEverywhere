import type { EmoteCollection } from "../common";
import type { Provider } from "./provider";

const GET_GLOBAL_EMOTE_IDS = "https://api.betterttv.net/3/cached/emotes/global";
const GET_EMOTE_IMAGE = "https://cdn.betterttv.net/emote/{emoteId}/1x";

function getBetterTTVEmoteURL(emoteId: string): string {
    return GET_EMOTE_IMAGE.replace("{emoteId}", emoteId);
}

export class BetterTTVGlobal implements Provider {
    async fetchEmotes(userId?: string): Promise<EmoteCollection> {
        const globalEmotesResponse = await fetch(GET_GLOBAL_EMOTE_IDS);
        const globalEmotes = await globalEmotesResponse.json();

        const emotes = new Map<string, string>();

        for (const emote of globalEmotes) {
            emotes.set(emote.code.toLowerCase(), getBetterTTVEmoteURL(emote.id));
        }

        return emotes;
    }
}
