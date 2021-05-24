import React from 'react';
import {themes, useTheme} from '../themes';
import {View, Text} from '@components';
import {StyleSheet} from 'react-native';

const LabelComponent: React.FC<TLabel> = ({label}) => {
  const [t] = useTheme(themes);

  const labelStyle = StyleSheet.flatten([
    t.label,
    {
      left: 10,
      zIndex: 2,
      bottom: -10,
      paddingHorizontal: 10,
      alignSelf: 'flex-start',
    },
  ]);

  return (
    <View style={labelStyle}>
      <Text>{label}</Text>
    </View>
  );
};
type TLabel = {
  label?: string;
};

export default LabelComponent;
