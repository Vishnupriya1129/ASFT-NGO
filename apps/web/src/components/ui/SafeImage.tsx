'use client';

import NextImage from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps {
    src: string | null | undefined;
    alt: string;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    sizes?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

export default function SafeImage({ src, alt, ...props }: SafeImageProps) {
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !src || error) {
        return (
            <div
                className="w-full h-full bg-gray-100 flex items-center justify-center"
                style={{ minHeight: '100px' }}
            >
                <span className="text-gray-400 text-sm">No Image</span>
            </div>
        );
    }

    return (
        <NextImage
            src={src}
            alt={alt}
            {...props}
            onError={() => setError(true)}
            suppressHydrationWarning
        />
    );
}

export { SafeImage };
