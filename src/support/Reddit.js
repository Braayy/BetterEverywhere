import Support from '../Support'

function isInPost() {
    return window.location.href.indexOf('comments') > 0
}

export default class Reddit extends Support {
    findEmotes() {
        for (const title of document.getElementsByClassName('_eYtD2XCVieq6emjKBH3m')) {
            if ((title.tagName === 'H3' || (title.tagName === 'H1' && isInPost())) && !title.alreadyReplaced) {
                title.alreadyReplaced = true

                this.replaceEmotes(title)
            }
        }

        for (const comment of document.getElementsByClassName('_1qeIAgB0cPwnLhDF9XSiJM')) {
            if (comment.tagName === 'P' && !comment.alreadyReplaced) {
                comment.alreadyReplaced = true

                this.replaceEmotes(comment)
            }
        }
    }
}