'use client';

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fill = false,
  width = 400,
  height = 300,
}: SafeImageProps) {
  // If no src, render nothing (no fallback)
  if (!src) return null;

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}