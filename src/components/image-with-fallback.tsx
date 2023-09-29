import {
  PlaceholderValue,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import fallback from "public/fallback.png";
import { HTMLAttributes, forwardRef, useEffect, useState } from "react";

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
  const [error, setError] = useState<{} | null>(null);
  let fallbackImage = props.fallbackImage;
  if (props.fallbackImage === undefined) {
    fallbackImage = fallback;
  }
  fallbackImage = fallbackImage!;

  useEffect(() => {
    setError(null);
  }, [props.src]);

  const { src, ..._props } = props;

  return (
    <Image
      onError={setError}
      src={error === null ? props.src : fallbackImage}
      {..._props}
    />
  );
});

// export function ImageWithFallback({
//   width,
//   height,
//   src,
//   fallbackImage,
//   alt = "No alt text",
//   ...props
// }: {
//   width: number;
//   height: number;
//   src: string;
//   fallbackImage: string;
//   alt: string;
// }) {
//   const [error, setError] = useState<{} | null>(null);

//   useEffect(() => {
//     setError(null);
//   }, [src]);

//   return (
//     <Image
//       alt={alt}
//       onError={setError}
//       src={error ? fallbackImage : src}
//       width={width}
//       height={height}
//       {...props}
//     />
//   );
// }
