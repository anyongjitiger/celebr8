import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  AppleStyleSwipeableRow,
  StatusBar,
  Icon,
  Text,
  Svg,
  RefreshControl,
} from '@components';
import { Experience } from '@services';
import { themes, useTheme } from '@themes';
import { useTranslation, useGlobal } from '@hooks';
import ActivityCard from './card';
import HomeHeader from './home-header';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { ActivityType } from '@constants';
import RBSheet from 'react-native-raw-bottom-sheet';

const users = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    creater: 'Tay Strathairn',
    title: "Tay Strathairn's Travel",
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
    type: ActivityType.Party,
    remainTime: 3600 * 34,
    duration: 3600 * 48,
    img:
      'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];
const Homepage: React.FC<any> = ({ navigation, ...restProps }) => {
  const [theme] = useTheme(themes);
  const [token, setToken] = useGlobal('token');
  const [activityList, setActivityList] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const refRBSheet = useRef();
  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const activities = await Experience.getList(1, 20);
    setActivityList(activities[1].list.reverse());
    setRefreshing(false);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const onPress = item => {
    navigation.navigate({
      name: 'Activity',
      params: { activity: item },
      merge: true,
    });
  };
  const onPressIcon = item => {
    navigation.navigate({
      name: 'CreateActivity',
      params: { activityType: item },
      merge: true,
    });
  };
  const renderItem = ({ item }) => (
    <AppleStyleSwipeableRow>
      <RectButton onPress={_ => onPress(item)}>
        <View style={{ backgroundColor: '#E4E9EC' }}>
          <ActivityCard user={item} />
        </View>
      </RectButton>
    </AppleStyleSwipeableRow>
  );
  const IconView = (icon, type, text, actType) => (
    <Pressable
      onPress={() => {
        refRBSheet.current.close();
        onPressIcon(actType);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {type === 'svg' ? (
          <View style={styles.iconContainer}>{icon}</View>
        ) : (
          icon
        )}
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
  const modal = () => (
    <View style={styles.container}>
      <View
        style={[
          styles.rowCenter,
          { paddingTop: 20, justifyContent: 'space-around' },
        ]}>
        {IconView(
          <Icon
            name="birthday-cake"
            type="font-awesome"
            color="#F1C40F"
            size={44}
            containerStyle={styles.iconContainer}
          />,
          'icon',
          'Birthday',
          ActivityType.Birthday,
        )}
        {IconView(
          <Icon
            name="users"
            type="font-awesome-5"
            color="#208FDA"
            size={44}
            containerStyle={styles.iconContainer}
          />,
          'icon',
          'Meeting',
          ActivityType.Meeting,
        )}
        {IconView(
          <Icon
            name="glass-cheers"
            type="font-awesome-5"
            color="#E77E23"
            size={44}
            containerStyle={styles.iconContainer}
          />,
          'icon',
          'Party',
          ActivityType.Party,
        )}
      </View>
      <View
        style={[
          styles.rowCenter,
          { paddingTop: 20, justifyContent: 'space-around' },
        ]}>
        {IconView(
          <Icon
            name="island"
            type="fontisto"
            color="#2CCB6F"
            size={44}
            containerStyle={styles.iconContainer}
          />,
          'icon',
          'Trip',
          ActivityType.Trip,
        )}
        {IconView(
          <Svg icon="wedding-rings" size="44" color="#E84C3D" />,
          'svg',
          'Wedding',
          ActivityType.Wedding,
        )}
        {IconView(
          <Icon
            name="border-all"
            type="font-awesome-5"
            color="#9955B3"
            size={44}
            containerStyle={styles.iconContainer}
          />,
          'icon',
          'Other',
          ActivityType.Others,
        )}
      </View>
    </View>
  );
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <HomeHeader />
      <FlatList
        data={activityList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={fetchData}
          />
        }
      />
      <Button
        containerStyle={{
          position: 'absolute',
          top: 770,
          left: 0,
          right: 0,
          marginHorizontal: '20%',
        }}
        buttonStyle={{ paddingHorizontal: 50 }}
        title="+ Start Sharing"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        {modal()}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    height: 350,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: -50,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#EAECEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Homepage;
