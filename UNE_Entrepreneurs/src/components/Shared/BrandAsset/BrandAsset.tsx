import React from 'react';

export type BrandAssetType = 
  | 'flower' 
  | 'flower-squared' 
  | 'people' 
  | 'people-squared' 
  | 'suria-caps' 
  | 'suria-script';

interface BrandAssetProps {
  type: BrandAssetType;
  color?: string;
  size?: number | string;
  className?: string;
}

const BrandAsset: React.FC<BrandAssetProps> = ({ 
  type, 
  color = 'currentColor', 
  size = 24, 
  className 
}) => {
  const style = { width: size, height: size };

  switch (type) {
    case 'flower':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
          <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          <circle cx="12" cy="12" r="3" fill="none" />
        </svg>
      );
    case 'flower-squared':
      return (
        <div style={{ ...style, backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
           <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '70%', height: '70%' }}>
            <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
            <circle cx="12" cy="12" r="2" fill="#fff" />
          </svg>
        </div>
      );
    case 'people':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'people-squared':
       return (
        <div style={{ ...style, backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
           <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '60%', height: '60%' }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      );
    case 'suria-caps':
      return (
        <span style={{ 
          fontFamily: 'Montserrat, sans-serif', 
          fontWeight: 800, 
          letterSpacing: '1px', 
          color, 
          fontSize: size, 
          display: 'inline-block' 
        }} className={className}>
          SÜRIA
        </span>
      );
    case 'suria-script':
      return (
        <span style={{ 
          fontFamily: "'EB Garamond', serif", 
          fontStyle: 'italic', 
          fontWeight: 500, 
          color, 
          fontSize: size, 
          display: 'inline-block' 
        }} className={className}>
          süria
        </span>
      );
    default:
      return null;
  }
};

export default BrandAsset;
