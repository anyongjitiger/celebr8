import React from 'react';
import * as RN from 'react-native';
import { themes, useTheme } from '../themes';

const ScrollView: React.FC<TProps> = ({
  hidden,
  children,
  style,
  ...viewProps
}) => {
  const [theme] = useTheme(themes);

  return hidden ? null : (
    <RN.ScrollView {...viewProps} style={[theme.view, style]}>
      {children}
    </RN.ScrollView>
  );
};

type TProps = {
  [parm: string]: any;
};

export default ScrollView;
