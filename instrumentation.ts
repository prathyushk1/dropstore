// This file runs during Next.js initialization, before any pages are rendered
// Fix for "Array.toJSON" error caused by canvas-confetti or other libraries

export function register() {
    if (typeof (Array.prototype as any).toJSON !== 'undefined') {
        delete (Array.prototype as any).toJSON;
    }
}
