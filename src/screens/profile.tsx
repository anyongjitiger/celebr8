import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Avatar,
  Icon,
  Header,
  withBadge,
  Pressable,
  StatusBar,
} from '@components';
import {useGlobal} from '@hooks';
const BadgedIcon = withBadge(5, {top: -4, right: -4})(Icon);
const Profile: React.FC<any> = ({navigation}) => {
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
  const right = (
    <BadgedIcon
      type="font-awesome"
      name="bell"
      color="white"
      onPress={() => navigation.navigate('Notifications')}
    />
  );
  const [, setToken] = useGlobal('token');
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Header
        containerStyle={[{flexDirection: 'row-reverse'}, styles.rowContainer]}
        leftComponent={left}
        centerComponent={{text: 'My Profile', style: {color: '#fff'}}}
        centerContainerStyle={{alignSelf: 'center'}}
        rightComponent={right}
        rightContainerStyle={{alignSelf: 'center', marginRight: 10}}
      />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          marginTop: -2,
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            height: 180,
            width: '100%',
            // backfaceVisibility: 'visiable',
            backgroundColor: '#357F7E',
          }}>
          <Avatar
            rounded
            size={50}
            source={{
              uri:
                'https://images.pexels.com/photos/7473286/pexels-photo-7473286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
          <View style={[styles.rowContainer, styles.rowLine, {marginTop: 5}]}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
                // textAlign: 'right',
                lineHeight: 24,
              }}>
              Tom Candy Halfman
            </Text>
            <Icon
              size={20}
              name="pencil"
              type="octicon"
              color="white"
              containerStyle={{position: 'relative', left: 15}}
            />
          </View>
          <View style={[styles.rowContainer, styles.rowLine, {marginTop: 2}]}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 20,
              }}>
              18848888888
            </Text>
            <Icon
              size={20}
              name="pencil"
              type="octicon"
              color="white"
              containerStyle={{position: 'relative', left: 15}}
            />
          </View>
        </View>
        <View
          style={[
            styles.rowContainer,
            {
              position: 'relative',
              top: -40,
              borderRadius: 5,
              backgroundColor: 'white',
              width: '90%',
              justifyContent: 'space-around',
              paddingVertical: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 3,
            },
          ]}>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#F7F8F9',
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#3B4857'}}>
              42
            </Text>
            <Text
              style={{
                color: '#8492A5',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 20,
              }}>
              Hosted
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#3B4857'}}>
              58
            </Text>
            <Text
              style={{
                color: '#8492A5',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 20,
              }}>
              Attended
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'relative',
            width: '100%',
            paddingHorizontal: 20,
          }}>
          <View
            style={[
              styles.rowContainer,
              {justifyContent: 'space-between', paddingVertical: 5},
            ]}>
            <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
              Report/Feedback
            </Text>
            <Icon
              size={20}
              name="arrowright"
              type="antdesign"
              color="#181818"
            />
          </View>
          <View
            style={[
              styles.rowContainer,
              {justifyContent: 'space-between', paddingVertical: 5},
            ]}>
            <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
              Privacy
            </Text>
            <Icon
              size={20}
              name="arrowright"
              type="antdesign"
              color="#181818"
            />
          </View>
          <View style={{paddingVertical: 5}}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Text
                style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}
                onPress={() => {
                  setToken('');
                }}>
                Log out
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    // marginTop: 8,
    borderRadius: 4,
  },
  highlight: {
    fontWeight: '700',
    color: '#39817E',
    fontSize: 14,
    padding: 5,
  },
  lightFont: {
    fontWeight: '300',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLine: {
    justifyContent: 'center',
    backgroundColor: '#357F7E',
    alignItems: 'center',
  },
});

export default Profile;
