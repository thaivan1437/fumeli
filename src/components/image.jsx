import { useRef, useState } from "react";
import Image from "next/image";

const AutoSizeImage = ({ src, alt, isResize = true, width, height, className = '' }) => {
  const [imageRatio, setImageRatio] = useState(null);
  const imageRef = useRef();
  const [newSrc, setSrc] = useState(src);

  if (!isResize) {
    return (
      <Image
        src={newSrc}
        alt={alt ? alt : 'image'}
        height={height}
        width={width}
        layout='responsive'
        objectFit="unset"
        className={className}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
        onError={() => setSrc('/images/mission-default.png')}
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
        src={newSrc}
        alt={alt ? alt : 'image'}
        layout="fill"
        objectFit="contain"
        onLoad={handleLoad}
        ref={imageRef}
        className={className}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
        onError={() => setSrc('/images/mission-default.png')}
      />
    </div>
  );
};

export default AutoSizeImage;
