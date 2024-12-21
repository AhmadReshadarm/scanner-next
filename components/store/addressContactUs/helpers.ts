import { useState } from 'react';
const useCopyToClipboard = () => {
  const [copiedText, setCopiedText]: [any, any] = useState(false);

  const copy = async () => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText('г. Москва, Каширское шоссе');
      setCopiedText(true);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(false);
      return false;
    }
  };

  return [copiedText, setCopiedText, copy];
};

export { useCopyToClipboard };
