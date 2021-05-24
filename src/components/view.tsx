import React from 'react';
import * as RN from 'react-native';
import { themes, useTheme } from '../themes';

const View: React.FC<TProps> = ({ hidden, children, style, ...viewProps }) => {
  const [theme] = useTheme(themes);

  return hidden ? null : (
    <RN.View {...viewProps} style={[theme.view, style]}>
      {children}
    </RN.View>
  );
}

type TProps = {
  [parm: string]: any;
}

export default (View);
