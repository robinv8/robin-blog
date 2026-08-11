"use client";

import { NotionRenderer } from 'react-notion-x';
import { useTheme } from 'next-themes';
// Note: We haven't set up next-themes yet, but we have a manual dark class toggle.
// For NotionRenderer to handle dark mode, it usually needs a prop or system preference.
// We can check the document class or strict dark mode.

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // or other theme
// import 'katex/dist/katex.min.css'; // if using equation

import dynamic from 'next/dynamic';
import React from 'react';

// Advanced blocks
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

export function NotionPageRenderer({ recordMap }: { recordMap: any }) {
    // Simple dark mode detection or force specific mode. 
    // Ideally connect to a context. For now default to light or use system.
    // Since our toggle adds 'dark' class to html, we can try to detect it or pass it.
    // But this is a partial solution.

    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false} // Todo: connect to global theme state
            components={{
                Code,
                Collection,
                Equation,
                Pdf,
                Modal
            }}
            className="!bg-transparent !text-slate-800 dark:!text-slate-200"
            bodyClassName="!bg-transparent"
        />
    );
}
