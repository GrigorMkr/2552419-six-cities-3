export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath || typeof imagePath !== 'string') {
    return '';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const baseUrl = import.meta.env.BASE_URL || '';

  if (baseUrl && imagePath.startsWith(baseUrl)) {
    return imagePath;
  }

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return normalizedBaseUrl ? `${normalizedBaseUrl}${normalizedPath}` : normalizedPath;
};

