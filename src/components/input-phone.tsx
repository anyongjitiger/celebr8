import React from 'react';
import { useTranslation } from '@hooks';
import { themes, useTheme } from '../themes';
import { Input } from '@components';
import parsePhoneNumber from 'libphonenumber-js/mobile';
import { Keyboard } from '@helpers';
const PhoneInput: React.FC<TProps> = ({
  onChangeText = () => {},
  ...props
}) => {
  const onChangePhone = (txt = '') => {
    txt = txt.indexOf('+') === 0 ? txt : '+1' + txt;
    const phoneNumber = parsePhoneNumber(txt);

    if (phoneNumber?.isValid()) {
      Keyboard.dismiss();
      console.log('formatInternational :', phoneNumber.formatInternational());
      onChangeText(txt);
      return;
    }
    onChangeText(false);
  };

  return (
    <Input
      onChangeText={onChangePhone}
      autoCapitalize={'none'}
      keyboardType={'phone-pad'}
      textContentType={'oneTimeCode'}
      autoCorrect={false}
      {...props}></Input>
  );
};

type TProps = {
  label?: string;
  phone?: string;
  onChangeText?: (phone: string | boolean) => {};
};

export default PhoneInput;
