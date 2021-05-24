import React from 'react';
import {useTranslation, useState} from '@hooks';
import {themes, useTheme} from '../themes';
import {Input} from '@components';
import parsePhoneNumber from 'libphonenumber-js/mobile';
import {Keyboard} from '@helpers';
const PhoneInput: React.FC<any> = ({onChangeText = () => {}, ...props}) => {
  const [phone, setPhone] = useState('');

  const onChangePhone = (txt = '') => {
    const phoneNumber = parsePhoneNumber(txt);

    console.log('isValid', phoneNumber?.isValid());

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
  onChange?: Function;
};

export default PhoneInput;
