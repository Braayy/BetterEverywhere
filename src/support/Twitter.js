import Support from '../Support'

export default class Twitter extends Support {
    findEmotes() {
        for (const tweetDiv of document.getElementsByClassName('r-bnwqim')) {
            if (!tweetDiv.alreadyReplaced) {
                tweetDiv.alreadyReplaced = true

                for (const tweetText of tweetDiv.children) {
                    if (tweetText.tagName === 'SPAN') {
                        this.replaceEmotes(tweetText)
                    }
                }
            }
        }
    }
}