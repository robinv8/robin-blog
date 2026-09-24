"use client";

import Giscus, { type GiscusProps } from "@giscus/react";
import { useTheme } from "next-themes";
import { siteConfig } from "../../site.config";

export default function Comments() {
    const { resolvedTheme } = useTheme();
    const g = siteConfig.comment.giscusConfig;

    if (!g.repo) {
        return null;
    }

    return (
        <div className="border-t border-bl-line pt-10">
            <Giscus
                id="comments"
                repo={g.repo as GiscusProps["repo"]}
                repoId={g.repoId}
                category={g.category}
                categoryId={g.categoryId}
                mapping={g.mapping as GiscusProps["mapping"]}
                reactionsEnabled={g.reactionsEnabled as GiscusProps["reactionsEnabled"]}
                emitMetadata={g.emitMetadata as GiscusProps["emitMetadata"]}
                inputPosition={g.inputPosition as GiscusProps["inputPosition"]}
                theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
                lang={g.lang}
                loading={g.loading as GiscusProps["loading"]}
            />
        </div>
    );
}
