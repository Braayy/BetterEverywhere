import Populator from '../Populator'

const GET_EMOTE_IDS = 'https://api.betterttv.net/3/cached/users/twitch/'
const GET_EMOTE_IMAGE = 'https://cdn.betterttv.net/emote/{emoteId}/1x'

function getBetterTTVEmoteURL(emoteId) {
    return GET_EMOTE_IMAGE.replace('{emoteId}', emoteId)
}

export default class BetterTTVUser extends Populator {
    async fetch(userId) {
        const roomEmotesResponse = await fetch(GET_EMOTE_IDS + userId)
        const roomEmotes = await roomEmotesResponse.json()

        const emotes = {}

        const channelEmotes = roomEmotes.channelEmotes
        if (channelEmotes) {
            for (const emote of channelEmotes) {
                emotes[emote.code.toLowerCase()] = getBetterTTVEmoteURL(emote.id)
            }
        }

        const sharedEmotes = roomEmotes.sharedEmotes
        if (sharedEmotes) {
            for (const emote of sharedEmotes) {
                emotes[emote.code.toLowerCase()] = getBetterTTVEmoteURL(emote.id)
            }
        }

        return emotes
    }
}