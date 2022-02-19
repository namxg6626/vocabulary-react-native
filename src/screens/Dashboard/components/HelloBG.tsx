import React from 'react';
import {FC} from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

export interface IHelloBGProps extends Omit<XmlProps, 'xml'> {
  xml?: string;
}

const XML = `<svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="320" height="180" rx="25" fill="#FF565E"/>
<mask id="mask0_88_2230" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="180">
<rect width="320" height="180" rx="25" fill="white"/>
</mask>
<g mask="url(#mask0_88_2230)">
<rect x="-30" y="102" width="112" height="110" rx="25" fill="#FF464F"/>
<rect x="194" y="102" width="112" height="110" rx="25" fill="#FF464F"/>
<rect x="106" y="46" width="68" height="66" rx="33" fill="#FF464F"/>
<rect x="302" y="-8" width="112" height="110" rx="25" fill="#FF464F"/>
</g>
</svg>
`;

export const HelloBG: FC<IHelloBGProps> = ({xml = XML, ...props}) => {
  return <SvgXml {...props} xml={xml} />;
};
