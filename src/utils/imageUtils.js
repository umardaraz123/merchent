// utils/imageUtils.js
import React from 'react';

/**
 * Component that displays an image with fallback to default if original fails to load
 * @param {string} src - The primary image source URL
 * @param {string} fallbackSrc - The fallback image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {object} props - Additional props to pass to the img element
 * @returns {JSX.Element} Image component with fallback handling
 */
export const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img 
      src={imgSrc} 
      onError={handleError} 
      alt={alt} 
      {...props}
    />
  );
};