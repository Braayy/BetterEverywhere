import Support from '../Support'

export default class TweetDeck extends Support {
    findEmotes() {
        for (const tweetText of document.getElementsByClassName('tweet-text')) {
            if (!tweetText.alreadyReplaced) {
                tweetText.alreadyReplaced = true

                this.replaceEmotes(tweetText)
            }
        }
    }
}