import type {
  PlaceholderValue,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image, { type ImageProps } from "next/image";
import fallback from "public/fallback.png";
import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";

interface ImageWithFallbackProps
  extends HTMLAttributes<HTMLImageElement & ImageProps> {
  alt: string;
  width: number;
  height: number;
  src: string | StaticImport;
  fallbackImage?: string | StaticImport;
  placeholder?: PlaceholderValue;
}

export const ImageWithFallback = forwardRef<
  HTMLImageElement,
  ImageWithFallbackProps
>((props, _ref) => {
  const [error, setError] = useState<object | null>(null);
  let fallbackImage = props.fallbackImage;
  if (props.fallbackImage === undefined) {
    fallbackImage = fallback;
  }
  fallbackImage = fallbackImage!;

  useEffect(() => {
    setError(null);
  }, [props.src]);

  const { src, alt, ..._props } = props;

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error === null ? src : fallbackImage}
      {..._props}
    />
  );
});

ImageWithFallback.displayName = "ImageWithFallback";
