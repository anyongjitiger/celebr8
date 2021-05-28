import React from 'react';
import {
  View,
  Button,
  KeyboardAwareScrollView,
  InputCode,
  InputPhone,
  Image,
  Alert,
  Text,
} from '@components';
import {themes, useTheme} from '@themes';
import {useGlobal, useTranslation} from '@hooks';
import {apiClient} from '@services';
import {API} from '@constants';
import {useEffect, useState} from 'reactn';
import images from '@images';
import {Keyboard} from '@helpers';

const getVerifyCode = (phone: string) =>
  apiClient.post(API.SNED_VERIFY_CODE, {phone}).then((res: any) => {
    const [err, data] = res;
    if (err) {
      return [err, null];
    }
    const {
      list: {code},
    } = data;
    return [null, code];
  });

const LoginScreen: React.FC<any> = ({navigation}) => {
  const [, setGlobalToken] = useGlobal('token');
  const [, setGlobalUser] = useGlobal('user');
  const [theme] = useTheme(themes);
  const [phone, setPhone] = useState('');
  const [_token, _setToken] = useState('');
  const [code, setCode] = useState('');
  const [temp_code, setTempCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [_codeDisable, setCodeDisable] = useState<boolean>(true);
  const [_loginDisable, setLoginDisable] = useState<boolean>(true);
  const {t} = useTranslation();

  function sendCode() {
    setSendLoading(true);
    getVerifyCode(phone).then((res: any) => {
      setSendLoading(false);
      const [err, code] = res;
      if (err) {
        return;
      }
      console.log('code => ', code);
      setTempCode(code);
    });
  }

  const onLogin = () => {
    setLoading(true);
    apiClient
      .post(API.USER_LOGIN, {
        phone,
      })
      .then(async (res: any) => {
        setLoading(false);
        const [error, data] = res;
        if (error) {
          Alert.alert(error);
          return;
        }
        const {
          list: {
            token,
            data: [user],
          },
        } = data;
        console.log('token \n', token);
        console.log('user \n', user);
        await setGlobalUser(user);
        setTimeout(() => {
          setGlobalToken(token);
        }, 1);
      });
  };

  useEffect(() => {
    if (temp_code.length) {
      const res = code != temp_code;
      setLoginDisable(res);
      if (!res) {
        Keyboard.dismiss();
      }
    }
  }, [code]);

  useEffect(() => {
    setCodeDisable(!phone);
  }, [phone]);

  return (
    <KeyboardAwareScrollView style={[theme.container]}>
      <View style={[theme.center]}>
        <Image
          source={images.APP_LOGO_TITLE}
          style={{
            marginVertical: 16,
            width: 250,
            resizeMode: 'contain',
          }}></Image>
        <View style={{flex: 1, width: '100%', marginBottom: 36}}>
          <InputPhone
            placeholder={'phone number'}
            onChangeText={setPhone}></InputPhone>
          <InputCode
            loading={sendLoading}
            disabled={_codeDisable}
            keyboardType={'phone-pad'}
            onChangeText={setCode}
            onPress={sendCode}></InputCode>
        </View>
        <Button
          containerStyle={{width: '100%', margin: 0}}
          onPress={onLogin}
          loading={loading}
          disabled={_loginDisable}
          title={t('Sign In/Log In')}
        />
        <Button
          type="clear"
          containerStyle={{width: '100%', margin: 0}}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          title={t("Don't have an account yet?")}
        />
        {/* {debug} */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
