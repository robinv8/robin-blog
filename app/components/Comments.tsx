"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { siteConfig } from "../../site.config";

export default function Comments() {
    const { theme } = useTheme();

    // Cast siteConfig to any to bypass type checks if necessary, or assume siteConfig structure matches
    const config = siteConfig as any;
    const giscusConfig = config.comment?.giscusConfig;

    if (!giscusConfig || !giscusConfig.repo) {
        return null;
    }

    return (
        <div className="mt-10 py-8 border-t border-slate-200 dark:border-slate-800">
            <Giscus
                id="comments"
                repo={giscusConfig.repo}
                repoId={giscusConfig.repoId}
                category={giscusConfig.category}
                categoryId={giscusConfig.categoryId}
                mapping={giscusConfig.mapping}
                reactionsEnabled={giscusConfig.reactionsEnabled}
                emitMetadata={giscusConfig.emitMetadata}
                inputPosition={giscusConfig.inputPosition}
                theme={theme === "dark" ? "transparent_dark" : "light"}
                lang={giscusConfig.lang}
                loading={giscusConfig.loading}
            />
        </div>
    );
}
