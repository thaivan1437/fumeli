import { useRef, useState } from "react";
import Image from "next/image";

const AutoSizeImage = ({ src, alt, isResize = true, width, height }) => {
  const [imageRatio, setImageRatio] = useState(null);
  const imageRef = useRef();

  if (!isResize) {
    return (
      <Image
        src={src}
        alt={alt ? alt : 'image'}
        height={height}
        width={width}
        layout='responsive'
        objectFit="unset"
      />
    )
  }

  const handleLoad = () => {
    const image = imageRef.current;
    const { naturalWidth, naturalHeight } = image;

    setImageRatio(naturalWidth / naturalHeight);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ paddingBottom: `${100 / imageRatio}%` }} />
      <Image
        src={src}
        alt={alt ? alt : 'image'}
        layout="fill"
        objectFit="contain"
        onLoad={handleLoad}
        ref={imageRef}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
      />
    </div>
  );
};

export default AutoSizeImage;
