import type { EmoteCollection } from "../common";
import type { Provider } from "./provider";

const GET_EMOTE_IDS = "https://api.betterttv.net/3/cached/users/twitch/";
const GET_EMOTE_IMAGE = "https://cdn.betterttv.net/emote/{emoteId}/1x";

function getBetterTTVEmoteURL(emoteId: string): string {
    return GET_EMOTE_IMAGE.replace("{emoteId}", emoteId);
}

export class BetterTTVUser implements Provider {
    async fetchEmotes(userId?: string): Promise<EmoteCollection> {
        const roomEmotesResponse = await fetch(GET_EMOTE_IDS + userId);
        const roomEmotes = await roomEmotesResponse.json();

        const emotes = new Map<string, string>();

        const channelEmotes = roomEmotes.channelEmotes;
        if (channelEmotes) {
            for (const emote of channelEmotes) {
                emotes.set(emote.code.toLowerCase(), getBetterTTVEmoteURL(emote.id));
            }
        }

        const sharedEmotes = roomEmotes.sharedEmotes;
        if (sharedEmotes) {
            for (const emote of sharedEmotes) {
                emotes.set(emote.code.toLowerCase(), getBetterTTVEmoteURL(emote.id));
            }
        }

        return emotes;
    }
}
