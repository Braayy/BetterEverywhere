import Populator from '../Populator'

const GET_EMOTE_IDS = 'https://api.frankerfacez.com/v1/room/id/'

export default class FrankerFaceZUser extends Populator {
    async fetch(userId) {
        const frankerFaceZEmotesResponse = await fetch(GET_EMOTE_IDS + userId)
        const frankerFaceZEmotes = await frankerFaceZEmotesResponse.json()

        const emotes = {}

        const setId = frankerFaceZEmotes.room.set
        const emoticons = frankerFaceZEmotes.sets[setId].emoticons

        for (const emote of emoticons) {
            emotes[emote.name.toLowerCase()] = 'https:' + emote.urls['1']
        }

        return emotes
    }
}