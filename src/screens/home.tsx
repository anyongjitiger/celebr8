import React from 'react';
import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  Header,
} from '@components';
import { getAllContacts } from '@services';
import { themes, useTheme } from '@themes';
import { useTranslation, useGlobal } from '@hooks';
import ActivityCard from './card';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    creater: 'Derrick Janis',
    status: '2',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    creater: 'Tay Strathairn',
    status: '1',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    creater: 'David Strathairn',
    status: '3',
  },
  {
    id: '58694443-3da1-471f-bd96-145571e29d72',
    creater: 'Frances McDormand',
    status: '4',
  },
];
const HomeScreen: React.FC<any> = ({ navigation, ...restProps }) => {
  const [theme] = useTheme(themes);
  const [token, setToken] = useGlobal('token');
  const { t } = useTranslation();

  const onGoLogin = () => {
    navigation.navigate('Login');
  };

  const onLogin = () => {
    setToken('your_token');
  };

  const onLogout = () => {
    setToken(undefined);
  };

  const ongetAllcontacts = async () => {
    const res: any = await getAllContacts();
    console.log(' all contacts ', res);
  };

  const renderItem = ({ item }) => (
    <ActivityCard creater={item.creater} status={item.status} />
  );
  return (
    <SafeAreaView>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={[{ padding: 16 }, theme.container]}>
        <Button title={t('Sign In/Log In')} onPress={onGoLogin}>
          {' '}
        </Button>
        <Text>===</Text>
        <Button
          title="goto Org"
          onPress={() => {
            navigation.navigate('Org');
          }}>
          {' '}
        </Button>
        <Text>===</Text>
        <Button title={t('Sign In/Log In')} onPress={onLogin}>
          {' '}
        </Button>
        <Text>===</Text>
        <Button title={t('Cancel')} onPress={onLogout}>
          {' '}
        </Button>
        <Text>===</Text>
        <Button title="获取联系人" onPress={ongetAllcontacts}>
          {'ss'}
        </Button>
        <ActivityCard creater="Derrick Janis" />
      </View>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
