import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  Header,
  Icon,
} from '@components';
import NotificationItem from './notification-item';
const imgBase =
  'https://www.yinfans.me/wp-content/uploads/2021/01/p2628328069.jpg';
const Item = ({item, onPress}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => ({
      opacity: pressed ? 0.7 : 1,
    })}>
    <NotificationItem message={item} />
  </Pressable>
);
const Notifications: React.FC<any> = ({navigation}) => {
  const messages = [
    {
      id: 1,
      sender: {
        name: 'Derrick Janis',
        img: imgBase,
      },
      link: 'https://m.baidu.com',
      title: 'Party',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 2,
      sender: {
        name: 'Tay Strathairn',
        img: imgBase,
      },
      link: 'https://m.baidu.com',
      title: 'Party',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 3,
      sender: {
        name: 'David Strathairn',
        img: imgBase,
      },
      link: 'https://m.baidu.com',
      title: 'Party',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 4,
      sender: {
        name: 'Frances McDormand',
        img: imgBase,
      },
      link: 'https://m.baidu.com',
      title: 'Party',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];
  const left = (
    <Icon
      size={25}
      name="arrowleft"
      type="antdesign"
      color="white"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#39817E" />
      <Header
        containerStyle={[{flexDirection: 'row-reverse'}, styles.rowContainer]}
        leftComponent={left}
        centerComponent={{text: 'Notifications', style: {color: '#fff'}}}
        centerContainerStyle={{alignSelf: 'center'}}
      />
      <ScrollView removeClippedSubviews={false}>
        <View>
          <Text style={styles.title}>New</Text>
          {messages.map((item, index) => (
            <Item
              item={item}
              key={index}
              onPress={() => navigation.navigate('Homepage')}
            />
          ))}
        </View>
        <View>
          <Text style={styles.title}>Today</Text>
          <NotificationItem message={messages[1]} />
        </View>
        <View>
          <Text style={styles.title}>Earlier this week</Text>
          <NotificationItem message={messages[2]} />
        </View>
        <View>
          <Text style={styles.title}>Earlier this month</Text>
          <NotificationItem message={messages[3]} />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    padding: 10,
  },
});

export default Notifications;
