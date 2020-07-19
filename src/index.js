import FrankerFaceZGlobal from './populator/FrankerFaceZGlobal'
import FrankerFaceZUser from './populator/FrankerFaceZUser'
import BetterTTVGlobal from './populator/BetterTTVGlobal'
import BetterTTVUser from './populator/BetterTTVUser'

import TweetDeck from './support/TweetDeck'
import Twitter from './support/Twitter'
import Reddit from './support/Reddit'

async function main() {
    async function getEmotes(userId) {
        const frankerFaceZGlobal = new FrankerFaceZGlobal()
        const frankerFaceZUser = new FrankerFaceZUser()
        const betterTTVGlobal = new BetterTTVGlobal()
        const betterTTVUser = new BetterTTVUser()

        let emotes = {}

        Object.assign(emotes, await frankerFaceZGlobal.fetch())
        Object.assign(emotes, await frankerFaceZUser.fetch(userId))
        Object.assign(emotes, await betterTTVGlobal.fetch())
        Object.assign(emotes, await betterTTVUser.fetch(userId))

        return emotes
    }

    let module = undefined
    
    if (window.location.href.indexOf('tweetdeck') > 0) {
        module = new TweetDeck()
    } else if (window.location.href.indexOf('twitter') > 0) {
        module = new Twitter()
    } else if (window.location.href.indexOf('reddit') > 0) {
        module = new Reddit()
    }

    if (!module) {
        console.log('Unsupported site :(')

        return
    }

    const emotes = await getEmotes('28579002')

    console.log(emotes)

    module.emotes = emotes

    module.findEmotes()
    
    setInterval(function() {
        module.findEmotes()
    }, 5000)
}

window.addEventListener('load', main, false)