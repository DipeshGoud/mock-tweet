/**
 * Downloads a tweet as an image
 * @param {HTMLElement} element - The tweet element to capture
 * @param {string} handle - The tweet handle for filename
 * @param {string} theme - The theme of the tweet (system, light, dark)
 * @returns {Promise<void>}
 */
export const downloadTweetImage = async (element, handle) => {
  if (!element) {
    alert('Tweet not ready for download. Please try again.');
    return;
  }

  try {
    const { toBlob } = await import('html-to-image');
    // Use a higher pixel ratio for sharpness while keeping DOM layout intact
    const pixelRatio = Math.min(3, Math.max(2, window.devicePixelRatio || 1));

    const blob = await toBlob(element, {
      pixelRatio,
      // Preserve the exact background coming from the UI (no forced color)
      backgroundColor: undefined,
      cacheBust: true,
      // Filter out transient UI controls if any (none currently)
      filter: (node) => {
        // You may exclude buttons or inputs outside the tweet card if needed
        return true;
      },
      quality: 0.95,
      style: {
        // Ensure fonts/icons render consistently
        transform: 'none',
      },
    });

    const filename = `tweet-${handle}-${Date.now()}.jpg`;
    if (!blob) {
      alert('Failed to generate image. Please try again.');
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('An error occurred while downloading the image. Please try again.');
  }
};

/**
 * Handles file upload and converts to data URL
 * @param {File} file - The file to process
 * @param {Function} callback - Callback function to handle the result
 */
export const handleFileUpload = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

/**
 * Handles media file upload and determines media type
 * @param {File} file - The media file to process
 * @param {Function} callback - Callback function to handle the result
 */
export const handleMediaUpload = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      callback({
        media: e.target.result,
        mediaType: mediaType
      });
    };
    reader.readAsDataURL(file);
  }
};