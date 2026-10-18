import React from 'react';
import { Icon as ElementsIcon, registerCustomIconType } from 'react-native-elements';
import {
  createIconSet, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5,
  Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons,
  Octicons, SimpleLineIcons, Zocial,
} from '@expo/vector-icons';
import antDesignGlyphs from 'react-native-vector-icons/glyphmaps/AntDesign.json';

// Preserve existing names such as "arrowleft" and "idcard". A private font
// family prevents collisions with Expo's newer AntDesign font and glyph map.
const AntDesign = createIconSet(
  antDesignGlyphs,
  'chuo-antdesign',
  require('react-native-vector-icons/Fonts/AntDesign.ttf'),
);

const iconSets = {
  antdesign: AntDesign,
  'ant-design': AntDesign,
  entypo: Entypo,
  evilicon: EvilIcons,
  feather: Feather,
  'font-awesome': FontAwesome,
  'font-awesome-5': FontAwesome5,
  fontisto: Fontisto,
  foundation: Foundation,
  ionicon: Ionicons,
  material: MaterialIcons,
  'material-community': MaterialCommunityIcons,
  octicon: Octicons,
  'simple-line-icon': SimpleLineIcons,
  zocial: Zocial,
};

Object.entries(iconSets).forEach(([type, component]) => {
  registerCustomIconType(`chuo-${type}`, component);
});

export const iconFonts = Object.values(iconSets).reduce(
  (fonts, component) => ({ ...fonts, ...component.font }),
  {},
);

export default function Icon({ type = 'material', iconProps, solid, brand, ...props }) {
  return (
    <ElementsIcon
      {...props}
      type={iconSets[type] ? `chuo-${type}` : type}
      iconProps={type === 'font-awesome-5' ? { solid, brand, ...iconProps } : iconProps}
    />
  );
}
