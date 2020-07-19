import Populator from '../Populator'

const GET_GLOBAL_EMOTE_IDS = 'https://api.betterttv.net/3/cached/emotes/global'
const GET_EMOTE_IMAGE = 'https://cdn.betterttv.net/emote/{emoteId}/1x'

function getBetterTTVEmoteURL(emoteId) {
    return GET_EMOTE_IMAGE.replace('{emoteId}', emoteId)
}

export default class BetterTTVGlobal extends Populator {
    async fetch(userId) {
        const globalEmotesResponse = await fetch(GET_GLOBAL_EMOTE_IDS)
        const globalEmotes = await globalEmotesResponse.json()

        const emotes = {}

        for (const emote of globalEmotes) {
            emotes[emote.code.toLowerCase()] = getBetterTTVEmoteURL(emote.id)
        }

        return emotes
    }
}