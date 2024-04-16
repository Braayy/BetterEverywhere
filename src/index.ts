import type { EmoteCollection } from "./common";
import type { Injector } from "./injector/Injector";
import { RedditInjector } from "./injector/RedditInjector";
import { TwitterInjector } from "./injector/TwitterInjector";
import { BetterTTVGlobal } from "./provider/BetterTTVGlobal";
import { BetterTTVUser } from "./provider/BetterTTVUser";
import { FrankerFaceZGlobal } from "./provider/FrankerFaceZGlobal";
import { FrankerFaceZUser } from "./provider/FrankerFaceZUser";
import type { Provider } from "./provider/provider";

function createInjector(): Injector | undefined {
    if (window.location.href.indexOf("twitter") > 0) {
        return new TwitterInjector();
    }

    if (window.location.href.indexOf("reddit") > 0) {
        return new RedditInjector();
    }
}

async function fetchEmotes(userId: string): Promise<EmoteCollection> {
    const providers: Provider[] = [new BetterTTVGlobal(), new BetterTTVUser(), new FrankerFaceZGlobal(), new FrankerFaceZUser()];

    const emotes = new Map<string, string>();

    for (const provider of providers) {
        try {
            const providerEmotes = await provider.fetchEmotes(userId);

            for (const [emoteId, emoteUrl] of providerEmotes) {
                emotes.set(emoteId, emoteUrl);
            }
        } catch (error) {
            console.error("Could not fetch some emotes");
        }
    }

    return emotes;
}

window.addEventListener(
    "load",
    () => {
        (async () => {
            const injector = createInjector();
            if (!injector) return;

            const emotes = await fetchEmotes("28579002");

            console.log(`Loaded ${emotes.size} emotes!`);

            injector.injectEmotes(emotes);

            setInterval(() => {
                injector.injectEmotes(emotes);
            }, 1000);
        })().then(() => {});
    },
    false,
);
