import { replaceEmotes, type EmoteCollection } from "../common"
import type { Injector } from "./Injector"

function isInPost() {
    return window.location.href.indexOf('comments') > 0
}

export class RedditInjector implements Injector {
    injectEmotes(emotes: EmoteCollection): void {
        for (const title of document.getElementsByClassName('_eYtD2XCVieq6emjKBH3m')) {
            if (title.alreadyInjected)
                continue;

            if ((title.tagName === 'H3' || (title.tagName === 'H1' && isInPost()))) {
                title.alreadyInjected = true;

                replaceEmotes(title, emotes);
            }
        }

        for (const comment of document.getElementsByClassName('_1qeIAgB0cPwnLhDF9XSiJM')) {
            if (comment.alreadyInjected)
                continue;

            if (comment.tagName === 'P') {
                comment.alreadyInjected = true;

                replaceEmotes(comment, emotes);
            }
        }
    }
}