import React from 'react';
import { useTheme, themes } from '@themes';
import { TextInput } from '@components';

const TextArea: React.FC<TProps> = ({ value, ...Props }) => {
  const [theme] = useTheme(themes);
  return (
    <>
      <TextInput
        style={[theme.border, theme.borderRadius, theme.textarea]}
        onChangeText={Props.onChangeText}
        defaultValue={value}
        multiline={true}
        placeholder={'好玩有趣的，大家同乐，伤感忧闷的，大家同哭。。。'}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
      />
    </>
  );
};

type TProps = {
  value?: string;
  onChangeText?: () => {};
};

export default TextArea;
