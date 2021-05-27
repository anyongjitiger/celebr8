import React from 'react';
import {themes, useTheme} from '../themes';
import {useTranslation} from '../hooks';
import {Input, View, Button} from '@components';
import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  b: {
    marginHorizontal: 0,
    marginVertical: 0,
    margin: 0,
    borderWidth: 0,
  },
});

const InputCode: React.FC<any> = ({
  disabled = false,
  loading = false,
  onChangeText = () => {},
  onPress = () => {},
  ...Props
}) => {
  const {t} = useTranslation();
  const [theme] = useTheme(themes);

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D3DCE6',
        height: 44,
        overflow: 'hidden',
        ...theme.borderRadius,
      }}>
      <View style={{flex: 7}}>
        <Input
          disabled={disabled}
          onChangeText={onChangeText}
          placeholder={t('enter code')}
          inputContainerStyle={[{borderWidth: 0, paddingLeft: 10, height: 44}]}
          {...Props}
        />
      </View>

      <View style={{flex: 4}}>
        <Button
          disabled={disabled}
          onPress={onPress}
          loading={loading}
          containerStyle={style.b}
          buttonStyle={{height: '100%'}}
          title={t('Send Code')}
        />
      </View>
    </View>
  );
};

export default InputCode;
