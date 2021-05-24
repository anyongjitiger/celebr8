import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  AppleStyleSwipeableRow,
  StatusBar,
} from '@components';
import { themes, useTheme } from '@themes';
import { useTranslation, useGlobal } from '@hooks';
import ActivityCard from './card';
import HomeHeader from './home-header';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { ActivityType } from '@constants';

const users = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    creater: 'Tay Strathairn',
    title: "Tay Strathairn's Travel",
    status: '1',
    type: ActivityType.Trip,
    remainTime: 3600 * 14,
    duration: 3600 * 48,
    img:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    // creater: 'David Strathairn',
    creater: 'me',
    title: "Kate's Wedding",
    status: '3',
    type: ActivityType.Wedding,
    remainTime: 3600 * 10,
    duration: 3600 * 72,
    img:
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    creater: 'Derrick Janis',
    title: "Derrick Janis's Travel",
    status: '2',
    type: ActivityType.Trip,
    remainTime: 3600 * 19,
    duration: 3600 * 72,
    img:
      'https://images.pexels.com/photos/3253492/pexels-photo-3253492.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '58694443-3da1-471f-bd96-145571e29d72',
    creater: 'Frances McDormand',
    title: "Frances McDormand's Birthday",
    status: '4',
    type: ActivityType.Birthday,
    remainTime: 3600 * 18,
    duration: 3600 * 48,
    img:
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '58694443-3da1-471f-bd96-145571e29d73',
    creater: 'Viggo Mortensen',
    title: "Frances McDormand's holiday",
    status: '4',
    type: ActivityType.Others,
    remainTime: 3600 * 34,
    duration: 3600 * 72,
    img:
      'https://images.pexels.com/photos/7473286/pexels-photo-7473286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '58694443-3da1-471f-bd96-145571e29d74',
    creater: 'Liv Tyler',
    title: "Liv Tyler's movie",
    status: '4',
    type: ActivityType.Party,
    remainTime: 3600 * 34,
    duration: 3600 * 48,
    img: 'https://s33.limill.cn/wp-content/uploads/2021/03/p2628052135-1.jpg',
  },
];
const Homepage: React.FC<any> = ({ navigation, ...restProps }) => {
  const [theme] = useTheme(themes);
  const [token, setToken] = useGlobal('token');
  const { t } = useTranslation();
  const onPress = item => {
    navigation.navigate({
      name: 'Activity',
      params: { activity: item },
      merge: true,
    });
  };
  const renderItem = ({ item }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
      })}>
      <View style={{ backgroundColor: '#E4E9EC' }}>
        <ActivityCard user={item} />
      </View>
    </Pressable>
  );
  const renderItem2 = ({ item }) => (
    <AppleStyleSwipeableRow>
      <RectButton onPress={_ => onPress(item)}>
        <View style={{ backgroundColor: '#E4E9EC' }}>
          <ActivityCard user={item} />
        </View>
      </RectButton>
    </AppleStyleSwipeableRow>
  );
  return (
    <View style={{ paddingBottom: 90 }}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader />
      <FlatList
        data={users}
        renderItem={renderItem2}
        keyExtractor={item => item.id}
      />
      <Button
        containerStyle={{
          position: 'absolute',
          bottom: 130,
          left: 0,
          right: 0,
          marginHorizontal: '20%',
        }}
        buttonStyle={{ paddingHorizontal: 50 }}
        title="+ Start Sharing"
        onPress={() => navigation.navigate('CreateStart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Homepage;
