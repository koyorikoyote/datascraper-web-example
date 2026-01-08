/**
 * Opens a centered popup window.
 *
 * @param url   The URL to load in the popup.
 * @param title Window name (re-used if already open).
 * @param w     Width in pixels (default 600).
 * @param h     Height in pixels (default 750).
 */
export function openCenteredPopup(
  url: string,
  title = 'popup',
  w = 600,
  h = 650,
): Window | null {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const left = dualScreenLeft + (window.innerWidth - w) / 2;
  const top = dualScreenTop + (window.innerHeight - h) / 2;

  const features = [
    `width=${w}`,
    `height=${h}`,
    `left=${left}`,
    `top=${top}`,
    'scrollbars=yes',
    'resizable=yes',
  ].join(',');

  return window.open(url, title, features);
}
