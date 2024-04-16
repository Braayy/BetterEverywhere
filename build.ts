import type { BunPlugin } from "bun";
import { resolve } from "node:path";

function copyTo(file: string, folder: string): BunPlugin {
    return {
        name: "copy",
        async setup(build) {
            const sourceFile = Bun.file(file);
            const targetFile = Bun.file(resolve(folder, file));
            await Bun.write(targetFile, sourceFile);
        },
    };
}

Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "dist",
    minify: true,
    plugins: [copyTo("manifest.json", "dist")],
});
