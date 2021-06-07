import React, { useState } from 'react';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  ImageBackground,
  Icon,
  Avatar,
  Button,
  NameAvatar,
  StatusBar,
  Divider,
  TextInput,
  Select,
  DatePicker,
  ActivityIcon,
} from '@components';
import { themes } from '@themes';
import { useTheme } from '@hooks';
import FastImage from 'react-native-fast-image';
import { Experience, getGlobal } from '@services';
import { getFileName } from '@helpers';
import { showMessage } from 'react-native-flash-message';
// import { UploadParams } from '../file_fetch';

const CreateActivity: React.FC<any> = ({ route, navigation }) => {
  const contacts = route?.params?.contacts;
  const activity = route?.params?.activity;
  const activityType = route?.params?.activityType;
  const [theme] = useTheme(themes);
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState('');
  const [animating, setAnimating] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [cover, setCover] = useState('');
  // const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().getTime());
  const [duration, setDuration] = useState(172800);
  // const [arrow, setArrow] = useState('caret-down');
  const saveDraft = () => {
    setAnimating(true);
    const { user } = getGlobal();
    Experience.create({
      owner: user?.id,
      expe_type: activityType,
      title: title,
      descr: description,
      create_date: date,
      location: location,
      is_publish: false,
    }).then(async (res: any) => {
      const [error, data] = res;
      if (error) {
        setAnimating(false);
        showMessage({
          message: 'Save failed!',
          type: 'danger',
        });
        return;
      }
      const expe_id = data?.list?.id;
      const pro = await Experience.upsetImages({
        expe_id,
        file: images,
        del_files: '',
        bgi_file: getFileName(cover),
      });
      if (!JSON.parse(pro.data).success) {
        showMessage({
          message: 'Upload photos failed!',
          type: 'danger',
        });
        setAnimating(false);
        return;
      }
      setAnimating(false);
      showMessage({
        message: 'Saved successfully！',
        type: 'success',
      });
      navigation.navigate({
        name: 'Homepage',
      });
    });
  };
  const share = () => {
    setAnimating(true);
    const { user } = getGlobal();
    Experience.create({
      owner: user?.id,
      expe_type: activityType,
      title: title,
      descr: description,
      create_date: date,
      location: location,
      validity: duration,
      is_publish: true,
    }).then(async (res: any) => {
      const [error, data] = res;
      if (error) {
        setAnimating(false);
        showMessage({
          message: 'Save failed!',
          type: 'danger',
        });
        return;
      }
      const expe_id = data?.list?.id;
      const pro = await Experience.upsetImages({
        expe_id,
        file: images,
        del_files: '',
        bgi_file: getFileName(cover),
      });
      if (!JSON.parse(pro.data).success) {
        showMessage({
          message: 'Upload photos failed!',
          type: 'danger',
        });
        setAnimating(false);
        return;
      }
      setAnimating(false);
      showMessage({
        message: 'Shared successfully！',
        type: 'success',
      });
      navigation.navigate({
        name: 'Homepage',
      });
    });
  };
  const deletePhoto = item => {
    if (item === cover) {
      setCover('');
    }
    const arr = images.filter(img => img.path !== item);
    setImages(arr);
  };
  const listItems = images.map((img, index) => (
    <View key={index} style={{ width: '23%', marginHorizontal: '1%' }}>
      <Pressable
        onLongPress={() => {
          setCover(img.path);
        }}
        onPress={() => {
          navigation.navigate({
            name: 'ViewImage',
            params: { images: images, curImage: index },
          });
        }}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 8,
            marginVertical: 10,
          }}
          source={{
            uri: img.path,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
        />
      </Pressable>
      <Icon
        name="window-close"
        type="font-awesome"
        size={10}
        color={'#CBB7AC'}
        containerStyle={{
          position: 'absolute',
          borderTopRightRadius: 8,
          zIndex: 1,
          right: 0,
          top: 10,
        }}
        onPress={() => deletePhoto(img.path)}
      />
      {cover === img.path && (
        <Icon
          name="check"
          type="fontisto"
          size={18}
          color={'#2FCC72'}
          containerStyle={{
            position: 'absolute',
            borderTopRightRadius: 8,
            zIndex: 0,
            left: 5,
            top: 10,
          }}
        />
      )}
    </View>
  ));
  return (
    <View style={{ flex: 1, backgroundColor: '#333' }}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={{
          uri:
            cover !== ''
              ? cover
              : 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
        }}
        style={styles.image}>
        <Icon
          size={30}
          name="arrowleft"
          type="antdesign"
          color="white"
          containerStyle={{
            alignItems: 'flex-start',
            paddingLeft: 20,
            paddingTop: 20,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {animating && (
          <ActivityIndicator
            size="large"
            animating={animating}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
        <ScrollView style={styles.container}>
          <View style={[styles.rowContainer, { marginTop: 10 }]}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Title *</Text>
              <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
              />
              <ActivityIcon type={activityType} size={20} />
            </View>
          </View>
          <View
            style={[
              styles.rowContainer,
              { justifyContent: 'space-between', marginTop: 10 },
            ]}>
            <View style={[styles.fieldSet, { height: 100 }]}>
              <Text style={styles.legend}>Message to Invitees *</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                value={description}
              />
            </View>
          </View>
          <Divider
            style={{ backgroundColor: '#EEEEEE', marginTop: 10, height: 2 }}
          />
          {/* <Icon
            name={arrow}
            type="fontisto"
            size={15}
            color={'#357F7E'}
            containerStyle={{ width: 20, alignSelf: 'center' }}
            onPress={() => {
              setShow(s => !s);
              setArrow(a => (a === 'caret-down' ? 'caret-up' : 'caret-down'));
            }}
          /> */}
          <View>
            <View style={[styles.rowContainer]}>
              <View style={styles.fieldSet}>
                <Text style={styles.legend}>Location name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setLocation}
                  value={location}
                />
              </View>
            </View>
            <View
              style={[styles.rowContainer, { marginTop: 10, marginBottom: 5 }]}>
              <View style={{ width: '48%' }}>
                <DatePicker
                  dateConfig={{}}
                  onChangeText={t => setDate(t.getTime())}
                  date={new Date()}
                />
              </View>
              <View
                style={{
                  width: '48%',
                  alignSelf: 'flex-start',
                  marginLeft: '4%',
                }}>
                <Select
                  showIcon
                  items={[
                    { label: '48:00:00', value: '172800' },
                    { label: '24:00:00', value: '86400' },
                  ]}
                  style={{
                    iconContainer: {
                      top: 8,
                      right: '80%',
                    },
                    inputIOS: [theme.inputIOS, { paddingLeft: 45, height: 40 }],
                    inputAndroid: [
                      theme.inputAndroid,
                      { paddingLeft: 45, height: 40 },
                    ],
                  }}
                  onValueChange={v => setDuration(v)}
                />
              </View>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#EEEEEE', height: 2 }} />
          <Text style={{ color: '#8492A5', marginTop: 10, fontWeight: '400' }}>
            Upload *
          </Text>
          <View
            // style={{ marginTop: 10, marginHorizontal: 10, width: '100%' }}
            style={[
              styles.rowContainer,
              {
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginHorizontal: 0,
                width: '100%',
              },
            ]}>
            {listItems}
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
                    maxFiles: 50,
                  })
                    .then(img => {
                      setImages(imgs => {
                        if (Platform.OS === 'android') {
                          const paths = imgs.map(p => p.path);
                          return imgs.concat(
                            img.filter(i => !paths.includes(i.path)),
                          );
                        } else if (Platform.OS === 'ios') {
                          const sources = imgs.map(p => p.sourceURL);
                          return imgs.concat(
                            img.filter(i => !sources.includes(i.sourceURL)),
                          );
                        }
                        return [];
                      });
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }}
              />
            </View>
          </View>
          <Divider
            style={{ backgroundColor: '#EEEEEE', height: 2, marginTop: 5 }}
          />
          <View style={[styles.rowContainer, { marginTop: 5 }]}>
            <Text
              style={{ color: '#8492A5', marginTop: 10, fontWeight: '400' }}>
              People *
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
              marginBottom: 80,
            }}>
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
                    params: { screen: 'CreateActivity' },
                    merge: true,
                  });
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
        </ScrollView>
      </ImageBackground>

      <View
        style={[
          styles.rowContainer,
          {
            width: '90%',
            position: 'absolute',
            bottom: 35,
            backgroundColor: 'transparent',
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
          title="Save as draft"
          onPress={saveDraft}
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
          title="Share"
          onPress={share}
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
  fieldSet: {
    marginTop: 10,
    paddingRight: '5%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#D3DCE6',
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: '400',
    backgroundColor: '#FFFFFF',
    color: '#8492A5',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    margin: 0,
    borderWidth: 0,
    width: '98%',
    padding: 10,
  },
});
export default CreateActivity;
