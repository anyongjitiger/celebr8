import React, { useState, useEffect } from 'react';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
  Icon,
  Avatar,
  Button,
  TimeCircle,
  NameAvatar,
  StatusBar,
  Divider,
} from '@components';

const Activity: React.FC<any> = ({ route, navigation }) => {
  const contacts = route?.params?.contacts;
  const activity = route?.params?.activity;
  const [images, setImages] = useState<ImageOrVideo[]>([]);
  let completed = false;
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    if (activity.creater === 'me') {
      setShowEdit(true);
    }
  }, [activity.creater]);
  const deletePhoto = item => {
    const arr = images.filter(img => img.path !== item);
    setImages(arr);
  };
  const listItems = images.map((img, index) => (
    <View key={index} style={{ width: '23%', marginHorizontal: '1%' }}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate({
            name: 'ViewImage',
            params: { images: images, curImage: index },
          });
        }}>
        <Image
          style={{
            width: '100%',
            height: 60,
            borderRadius: 8,
            marginVertical: 10,
          }}
          source={{
            uri: img.path,
            headers: { Authorization: 'someAuthToken' },
          }}
          resizeMode="cover"
        />
      </TouchableNativeFeedback>
      <Icon
        name="window-close"
        type="font-awesome"
        size={10}
        color={'#CBB7AC'}
        containerStyle={{
          position: 'absolute',
          borderTopRightRadius: 8,
          right: 0,
          top: 10,
        }}
        onPress={() => deletePhoto(img.path)}
      />
    </View>
  ));
  return (
    <View style={{ flex: 1, backgroundColor: '#333' }}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={{
          uri: activity.img,
        }}
        style={styles.image}>
        <View style={styles.container}>
          <View
            style={[
              styles.rowContainer,
              { marginTop: 15, justifyContent: 'space-between' },
            ]}>
            <Icon
              size={20}
              name="alert"
              type="octicon"
              color="#181818"
              onPress={() => {
                console.log('feedback');
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: -1,
              }}>
              <View
                style={{
                  backgroundColor: '#D3DCE7',
                  width: 50,
                  height: 5,
                  borderRadius: 2.5,
                }}
              />
            </View>
            <View style={styles.rowContainer}>
              {showEdit && (
                <Icon
                  size={20}
                  name="pencil"
                  type="octicon"
                  color="#181818"
                  style={{ marginRight: 25 }}
                />
              )}
              <Icon
                size={20}
                name="trash-alt"
                type="font-awesome-5"
                color="#494949"
              />
            </View>
          </View>
          <View style={[styles.rowContainer, { marginTop: 10 }]}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  maxWidth: 200,
                  color: '#1D252F',
                }}>
                {activity.title}
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Icon name="island" type="fontisto" color="#FF5959" />
            </View>
          </View>
          <View
            style={[
              styles.rowContainer,
              { justifyContent: 'space-between', marginTop: 10 },
            ]}>
            <View style={styles.rowContainer}>
              <Avatar
                rounded
                source={{
                  uri:
                    'https://images.pexels.com/photos/7473286/pexels-photo-7473286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
              />
              <View style={[styles.rowContainer, { marginLeft: 10 }]}>
                <Text>hosted by</Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: '700',
                    color: '#39817F',
                  }}>
                  {activity.creater}
                </Text>
              </View>
            </View>
            {!completed && (
              <View
                style={[
                  styles.rowContainer,
                  { position: 'absolute', right: 5, top: -40 },
                ]}>
                <TimeCircle
                  remainTime={144000}
                  duration={3600 * 48}
                  size={82}
                />
              </View>
            )}
          </View>
          <View
            style={[styles.rowContainer, { marginTop: 8, paddingLeft: 10 }]}>
            <Icon
              name="map-marker-alt"
              type="font-awesome-5"
              size={18}
              color="#CDCDCD"
            />
            <Text
              style={{
                marginHorizontal: 10,
                color: '#C0C0C0',
                marginLeft: 20,
              }}>
              Central Park
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ lineHeight: 20, fontSize: 14, color: '#171E2A' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              molestias repellendus tempore assumenda sunt consequatur, quasi
              odit id, alias quae minima, consectetur eligendi non sed corrupti
              culpa eaque molestiae aspernatur.
            </Text>
          </View>
          <Divider
            style={{ backgroundColor: '#EEEEEE', marginTop: 5, height: 2 }}
          />
          <ScrollView
            style={{ marginTop: 10, marginHorizontal: 10, maxHeight: 160 }}
            contentContainerStyle={[
              styles.rowContainer,
              { flexWrap: 'wrap', justifyContent: 'flex-start' },
            ]}>
            {listItems}
            {!completed && (
              <View
                style={{
                  width: '23%',
                  height: 60,
                  marginHorizontal: '1%',
                  backgroundColor: '#F4F4F4',
                  borderRadius: 8,
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#DCDCDC',
                }}>
                <Icon
                  name="camera"
                  type="font-awesome"
                  size={30}
                  color={'#357f7e'}
                  onPress={() => {
                    ImagePicker.openPicker({
                      multiple: true,
                    })
                      .then(img => {
                        setImages(imgs => {
                          const paths = imgs.map(p => p.path);
                          return imgs.concat(
                            img.filter(i => !paths.includes(i.path)),
                          );
                        });
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  }}
                />
              </View>
            )}
          </ScrollView>
          <Divider style={{ backgroundColor: '#EEEEEE', height: 2 }} />
          <View style={[styles.rowContainer, { marginTop: 5 }]}>
            <Text style={{ color: '#A2AAB9' }}>Participants</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            {showEdit && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#357f7e',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="plus-a"
                  type="fontisto"
                  size={20}
                  color={'white'}
                  onPress={() => {
                    navigation.navigate({
                      name: 'AddContact',
                      params: { screen: 'Activity' },
                      merge: true,
                    });
                  }}
                />
              </View>
            )}
            <View style={{ marginLeft: 10 }}>
              <Avatar
                size={40}
                rounded
                source={{
                  uri:
                    'https://images.pexels.com/photos/7473286/pexels-photo-7473286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
              />
            </View>
            {contacts?.map((contact, index) =>
              contact.picture === '' ? (
                <NameAvatar
                  key={index}
                  name={contact.name}
                  color={'#D3DCE6'}
                  style={{ marginLeft: 10 }}
                />
              ) : (
                <View style={{ marginLeft: 10 }} key={index}>
                  <Avatar size={40} rounded source={{ uri: contact.picture }} />
                </View>
              ),
            )}
          </View>
        </View>
      </ImageBackground>

      <View
        style={[
          styles.rowContainer,
          {
            width: '90%',
            position: 'absolute',
            bottom: 15,
            justifyContent: 'space-between',
          },
        ]}>
        <Button
          containerStyle={{
            width: '45%',
            marginLeft: '9%',
          }}
          buttonStyle={{
            width: '100%',
            borderRadius: 5,
            borderWidth: 0,
            backgroundColor: '#39817E',
          }}
          titleStyle={{ color: '#F3F8F7' }}
          title="Share"
        />
        <Button
          containerStyle={{
            width: '45%',
            marginLeft: '3%',
          }}
          buttonStyle={{
            width: '100%',
            borderRadius: 5,
            backgroundColor: '#39817E',
          }}
          titleStyle={{ color: '#F3F8F7' }}
          title="Not this time"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: '25%',
    height: '90%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
export default Activity;
