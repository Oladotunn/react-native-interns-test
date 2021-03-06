import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useThemeContext } from '../../src/theme';
import { IconProps } from './types';

export default function LoveIcon(props: IconProps) {
  const { fillColor = false } = props;
  const { colors } = useThemeContext();

  return (
    <Svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 21.054C-8 10 6-2 12 5.588 18-2 32 10 12 21.054z"
        fill={fillColor ? colors.LIKE_POST_COLOR : colors.INACTIVE_ICON_COLOR}
      />
    </Svg>
  );
}
