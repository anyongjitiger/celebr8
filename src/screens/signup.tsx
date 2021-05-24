import React from 'react';
import {API} from '@constants';
import {apiClient} from '@services';
import {themes, useTheme} from '@themes';
import images from '@images';
import {
  useState,
  useRoute,
  useNavigation,
  useTranslation,
  useEffect,
  useGlobal,
} from '@hooks';
import {
  View,
  Text,
  Alert,
  Input,
  Button,
  InputPhone,
  Image,
  KeyboardAwareScrollView,
} from '@components';

const registerUser = ({username = '', phone = ''}) => {
  const user = {username, phone};
  return apiClient.post(API.USER_REGIST, user);
};

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

const SignUp: React.FC<any> = () => {
  const [theme] = useTheme(themes);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [_disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onNext = () => {
    setLoading(true);
    getVerifyCode(phone).then((res: any) => {
      setLoading(false);
      const [err, code] = res;
      if (err) {
        Alert.alert(err);
        return;
      }
      navigation.navigate('SignUpNext', {username, phone, code});
    });
  };

  useEffect(() => {
    setDisabled(!(username.trim().length && phone));
  }, [username, phone]);

  return (
    <KeyboardAwareScrollView style={[theme.container]}>
      <View
        style={{
          flex: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={images.APP_LOGO}
            style={{
              width: 200,
              resizeMode: 'contain',
              marginVertical: 16,
            }}></Image>
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 32, fontWeight: '600'}}>
            Welcome to celebr8!
          </Text>
          <Text style={{fontSize: 16}}>
            Before you can start sharing, we need to verify some things...
          </Text>
        </View>
      </View>

      <View>
        <Input label="Your name" value={username} onChangeText={setUsername} />
        <InputPhone
          label="Your phone number"
          onChangeText={setPhone}
          errorMessage="We need your phone number to verify your identity."
          containerStyle={{marginBottom: 16}}></InputPhone>
        <Button
          title="Next"
          disabled={_disabled}
          loading={loading}
          onPress={onNext}></Button>
        <Button
          title="Already have an account?"
          type="clear"
          onPress={() => {
            navigation.navigate('SignIn');
          }}></Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const SignUpNext: React.FC<void> = () => {
  const [theme] = useTheme(themes);
  const [t] = useTranslation();
  const route = useRoute();
  console.log('route', route);
  const {username = '', phone = '', code = ''} = route?.params;
  const [vcode, setVCode] = useState('');
  const [, setGlobalUser] = useGlobal('user');
  const [, setGlobalToken] = useGlobal('token');
  const [_disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (vcode == code) {
      onRegister();
    }
    setDisabled(vcode == code);
  }, [vcode]);

  console.log('SignUpNext', code, username, phone);
  const debug = __DEV__ ? <Text>{code+''}</Text> : null;
  function onRegister() {
    setLoading(true);
    registerUser({username, phone}).then((res: any) => {
      const [err, data] = res;
      console.log('data', err, data);
      if (err) {
        Alert.alert(err);
        setLoading(false);
        setDisabled(false);
        return;
      }
      apiClient.post(API.USER_LOGIN, {phone}).then((res: any) => {
        setLoading(false);
        setDisabled(false);
        const [error, data] = res;
        if (error) {
          Alert.alert(err);
          return;
        }
        const {
          list: {
            token,
            data: [user],
          },
        } = data;
        console.log('token', token);
        console.log('user', user);
        setGlobalToken(token);
        setGlobalUser(user);
      });
    });
  }

  return (
    <KeyboardAwareScrollView style={theme.container}>
      <View style={{marginVertical: 48}}>
        <Text style={{fontSize: 48, fontWeight: '700'}}>
          Verify your phone number
        </Text>
      </View>
      <View style={{flex: 5}}>
        <Input
          placeholder="Your Code"
          onChangeText={setVCode}
          disabled={_disabled}
          keyboardType={'phone-pad'}
          containerStyle={{marginBottom: 16}}
          errorMessage="Enter the code we just texted you."></Input>
        <Button
          type="clear"
          loadingProps={{size: 'large'}}
          loading={loading}></Button>
      </View>
      {/* {debug} */}
    </KeyboardAwareScrollView>
  );
};

export {SignUp, SignUpNext};
