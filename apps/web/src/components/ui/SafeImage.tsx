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
  style?: React.CSSProperties; // 👈 Added this
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fill = false,
  width = 400,
  height = 300,
  style,
}: SafeImageProps) {
  if (!src) return null;

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={style} // 👈 Pass the shape here
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
      style={style}
    />
  );
}