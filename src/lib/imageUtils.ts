/**
 * Image utilities for mobile-optimized compression and validation
 */

export interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
}

const DEFAULT_OPTIONS: ImageCompressionOptions = {
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 0.8,
  maxSizeKB: 500, // Target max ~500KB for faster upload
};

/**
 * Compress an image to reduce size for faster upload on mobile
 */
export async function compressImage(
  imageDataUrl: string,
  options: ImageCompressionOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        const maxWidth = opts.maxWidth!;
        const maxHeight = opts.maxHeight!;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG with specified quality
        let quality = opts.quality!;
        let result = canvas.toDataURL('image/jpeg', quality);

        // If still too large, reduce quality iteratively
        const maxSizeBytes = (opts.maxSizeKB! * 1024 * 4) / 3; // Base64 is ~33% larger
        while (result.length > maxSizeBytes && quality > 0.3) {
          quality -= 0.1;
          result = canvas.toDataURL('image/jpeg', quality);
        }

        console.log(`Image compressed: ${Math.round(result.length / 1024)}KB at quality ${quality.toFixed(1)}`);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageDataUrl;
  });
}

/**
 * Validate image before processing
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please use JPEG, PNG, or WebP images only' };
  }

  // Max 10MB raw file (will be compressed)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'Image is too large. Please use an image under 10MB' };
  }

  return { valid: true };
}

/**
 * Get estimated upload time based on image size
 */
export function getEstimatedTime(imageSizeKB: number): string {
  // Rough estimate: ~50KB/s on slow mobile connection
  const seconds = Math.ceil(imageSizeKB / 50);
  if (seconds < 5) return '~5 seconds';
  if (seconds < 15) return '~10-15 seconds';
  if (seconds < 30) return '~20-30 seconds';
  return '~30+ seconds';
}
