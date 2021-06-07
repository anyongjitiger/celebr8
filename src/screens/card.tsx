import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Card,
  Avatar,
  TimeCircle,
  ActivityIcon,
} from '@components';
import FacePile from 'react-native-face-pile';
import FastImage from 'react-native-fast-image';
import config from '@config';
import { getGlobal } from '@services';

const imgBase =
  'https://www.yinfans.me/wp-content/uploads/2021/01/p2628328069.jpg';
const FACES = [
  {
    id: 1,
    imageUrl:
      'https://images.pexels.com/photos/5738030/pexels-photo-5738030.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 2,
    imageUrl:
      'https://images.pexels.com/photos/7772801/pexels-photo-7772801.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 3,
    imageUrl:
      'https://images.pexels.com/photos/1885223/pexels-photo-1885223.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 4,
    imageUrl:
      'https://images.pexels.com/photos/2034547/pexels-photo-2034547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];
const user = {
  name: 'brynn x',
  image: imgBase,
  avatar: imgBase,
};
const ActivityCard: React.FC<any> = ({ ...restProps }) => {
  const {
    file_path,
    owner,
    expe_type,
    title,
    descr,
    username,
    remainTime = 3600 * 28,
    duration = 3600 * 48,
  } = restProps.user;
  return (
    <>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'flex-start' }}>
              {owner === getGlobal().user.id ? (
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      padding: 5,
                    },
                    styles.rowCenter,
                  ]}>
                  <Text style={{ fontSize: 12, fontWeight: '700' }}>
                    My Experience
                  </Text>
                </View>
              ) : (
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: 3,
                    },
                  ]}>
                  <View style={styles.rowCenter}>
                    <View
                      style={[
                        styles.rowCenter,
                        { flex: 1, justifyContent: 'space-between' },
                      ]}>
                      <View style={styles.rowCenter}>
                        <Avatar
                          rounded
                          size={20}
                          source={{ uri: user.image }}
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 12,
                            fontWeight: '700',
                            maxWidth: 80,
                          }}>
                          {username}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={{ marginLeft: 25, fontSize: 12 }}>
                    invited you to
                  </Text>
                </View>
              )}
            </View>
            {
              <View style={[{ marginTop: 0, alignItems: 'center' }]}>
                <TimeCircle
                  remainTime={remainTime}
                  duration={duration}
                  size={70}
                />
                <View
                  style={{
                    marginTop: 5,
                    alignSelf: 'center',
                    paddingRight: 12,
                  }}>
                  <FacePile
                    numFaces={4}
                    faces={FACES}
                    hideOverflow={true}
                    circleSize={14}
                  />
                </View>
                <Text style={{ textAlign: 'center', color: '#94A2B0' }}>
                  9 friends
                </Text>
              </View>
            }
          </View>
          <View style={{ flex: 2, marginLeft: 10 }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={{ width: '100%', height: 160 }}
              source={{
                uri: `${config.IMG_URL}${file_path}`,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={[styles.rowCenter, { justifyContent: 'space-between' }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 24,
                color: '#212934',
                marginRight: 15,
              }}>
              {title}
            </Text>
            <ActivityIcon type={expe_type} size={14} />
          </View>
          <Text
            style={[{ fontSize: 12, color: '#3B4857' }, styles.lightFont]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {descr}
          </Text>
        </View>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '95%',
    marginTop: 8,
    borderRadius: 8,
    marginLeft: 8,
    padding: 5,
  },
  cardWrapper: {
    padding: 0,
  },
  user: {
    paddingHorizontal: 1,
  },
  image: {
    // width: '100%',
    // height: 200,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  userText: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  lightFont: {
    fontWeight: '300',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ActivityCard;
