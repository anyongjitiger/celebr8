import React from 'react';
import {Text, StyleSheet, Icon, Avatar, withBadge, Header} from '@components';
import {useNavigation} from '@hooks';

const BadgedIcon = withBadge(5, {top: -4, right: -4})(Icon);
const HomeHeader: React.FC<any> = ({...restProps}) => {
  const {user} = restProps;
  const navigation = useNavigation();
  const left = (
    <Avatar
      rounded
      source={{
        uri:
          'https://s33.limill.cn/wp-content/uploads/2021/03/p2628052135-1.jpg',
      }}
      onPress={() => navigation.navigate('Profile')}
    />
  );
  const center = (
    <Text style={{color: '#007C75', fontSize: 18, fontWeight: '700'}}>
      celebr8
    </Text>
  );
  const right = (
    <BadgedIcon
      type="font-awesome"
      name="bell"
      color="#828FA3"
      onPress={() => navigation.navigate('Notifications')}
    />
  );
  return (
    <Header
      containerStyle={[
        {flexDirection: 'row-reverse', backgroundColor: 'white'},
        styles.rowCenter,
      ]}
      leftComponent={left}
      centerComponent={center}
      centerContainerStyle={{alignSelf: 'center'}}
      rightComponent={right}
      rightContainerStyle={{
        alignSelf: 'center',
        marginRight: 10,
        marginTop: 5,
      }}
      statusBarProps={{backgroundColor: 'white'}}
    />
  );
};
const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeHeader;
