import Populator from '../Populator'

const GET_EMOTE_IDS = 'https://api.frankerfacez.com/v1/emoticons'

export default class FrankerFaceZGlobal extends Populator {
    async fetch(userId) {
        const frankerFaceZEmotesResponse = await fetch(GET_EMOTE_IDS)
        const frankerFaceZEmotes = await frankerFaceZEmotesResponse.json()

        const emotes = {}

        for (const emote of frankerFaceZEmotes.emoticons) {
            emotes[emote.name.toLowerCase()] = 'https:' + emote.urls['1']
        }

        return emotes
    }
}