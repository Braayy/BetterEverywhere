import { replaceEmotes, type EmoteCollection } from "../common"
import type { Injector } from "./Injector"

export class TwitterInjector implements Injector {
    injectEmotes(emotes: EmoteCollection): void {
        for (const tweetDiv of document.getElementsByClassName('r-bnwqim')) {
            if (tweetDiv.alreadyInjected)
                continue;

            tweetDiv.alreadyInjected = true

            for (const tweetText of tweetDiv.children) {
                if (tweetText.tagName === 'SPAN') {
                    replaceEmotes(tweetText, emotes)
                }
            }
        }
    }
}
