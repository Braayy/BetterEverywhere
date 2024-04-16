import type { EmoteCollection } from "../common";

export interface Injector {
    injectEmotes(emotes: EmoteCollection): void;
}