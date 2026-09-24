"use client";

import { useSyncExternalStore } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { useTheme } from 'next-themes';
import { defaultMapImageUrl } from 'notion-utils';
import type { Block } from 'notion-types';
import dynamic from 'next/dynamic';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then((m) => m.Collection)
);
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(() =>
    import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf)
);
const Modal = dynamic(() =>
    import('react-notion-x/build/third-party/modal').then((m) => m.Modal)
);

const noopSubscribe = () => () => {};

// Notion's image proxy redirects to login for bookmark previews, so load those from the source.
const mapImageUrl = (url: string | undefined, block: Block) =>
    block.type === 'bookmark' && url?.startsWith('http') ? url : defaultMapImageUrl(url, block);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NotionPageRenderer({ recordMap }: { recordMap: any }) {
    const { resolvedTheme } = useTheme();
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={mounted && resolvedTheme === 'dark'}
            mapImageUrl={mapImageUrl}
            components={{
                Code,
                Collection,
                Equation,
                Pdf,
                Modal
            }}
            className="!bg-transparent"
            bodyClassName="!bg-transparent"
        />
    );
}
