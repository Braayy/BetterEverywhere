import type { EmoteCollection } from "../common";

export interface Provider {
    fetchEmotes(userId?: string): Promise<EmoteCollection>;
}
