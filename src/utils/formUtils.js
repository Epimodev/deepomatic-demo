// @flow
import isURL from 'validator/lib/isURL';
import type { UploadType } from 'src/services/deepomatic/types';
import messages from 'src/messages';

function urlStartWithProtocol(url: string): boolean {
  return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}

export function imageIsFilled(uploadType: UploadType | '', imageUrlError: string, fileValue: string): boolean {
  switch (uploadType) {
    case 'url':
      return !imageUrlError;
    case 'file':
      return !!fileValue;
    default:
      return false;
  }
}

export function getUrlError(imageUrl: string): string {
  if (!imageUrl) return messages.EMPTY_URL;
  if (!urlStartWithProtocol(imageUrl) || !isURL(imageUrl)) return messages.INVALID_URL;
  return '';
}
