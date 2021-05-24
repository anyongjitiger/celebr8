// Svg.js
import React from 'react';
import {SvgUri} from '@helpers';
import svgs from '../assets/icons';

const Svg: React.FC<any> = ({...Props}) => {
  const {color, size, style, icon} = Props;

  let svgXmlData = svgs[icon];

  if (!svgXmlData) {
    let err_msg = `"error ${icon}"`;
    throw new Error(err_msg);
  }
  return (
    <SvgUri
      width={size}
      height={size}
      svgXmlData={svgXmlData}
      fill={color}
      style={style}
    />
  );
};

export default Svg;
