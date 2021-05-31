import React, { useState } from 'react';
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
  NameAvatar,
  StatusBar,
  Divider,
  TextInput,
  Select,
  DatePicker,
  Svg,
} from '@components';
import { themes } from '@themes';
import { useTheme } from '@hooks';
import { ActivityType } from '@constants';

const CreateActivity: React.FC<any> = ({ route, navigation }) => {
  const contacts = route?.params?.contacts;
  const activity = route?.params?.activity;
  const activityType = route?.params?.activityType;
  const [theme] = useTheme(themes);
  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [location, onChangeLocation] = useState('');
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState('caret-down');

  const icon = type => {
    switch (type) {
      case ActivityType.Birthday:
        return (
          <Icon
            name="birthday-cake"
            type="font-awesome"
            color="#F1C40F"
            size={20}
          />
        );
      case ActivityType.Wedding:
        return <Svg icon="wedding-rings" size="20" color="#E84C3D" />;
      case ActivityType.Party:
        return (
          <Icon
            name="glass-cheers"
            type="font-awesome-5"
            color="#E77E23"
            size={20}
          />
        );
      case ActivityType.Trip:
        return <Icon name="island" type="fontisto" color="#2CCB6F" size={20} />;
      case ActivityType.Meeting:
        return (
          <Icon name="users" type="font-awesome" color="#E84C3D" size={20} />
        );
      case ActivityType.Others:
        return (
          <Icon
            name="border-all"
            type="font-awesome-5"
            color="#9955B3"
            size={20}
          />
        );
      default:
        return (
          <Icon name="beer" type="font-awesome" color="#9955B3" size={20} />
        );
    }
  };

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
          uri:
            activity !== undefined
              ? activity.img
              : 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
        }}
        style={styles.image}>
        <ScrollView style={styles.container}>
          <View style={[styles.rowContainer, { marginTop: 10 }]}>
            <View style={styles.fieldSet}>
              <Text style={styles.legend}>Title *</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
              />
              {icon(activityType)}
            </View>
          </View>
          <View
            style={[
              styles.rowContainer,
              { justifyContent: 'space-between', marginTop: 10 },
            ]}>
            <View style={[styles.fieldSet, { height: 100 }]}>
              <Text style={styles.legend}>Description *</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                onChangeText={onChangeDescription}
                multiline
                numberOfLines={4}
                value={description}
              />
            </View>
          </View>
          <Divider
            style={{ backgroundColor: '#EEEEEE', marginTop: 10, height: 2 }}
          />
          <Icon
            name={arrow}
            type="fontisto"
            size={15}
            color={'#357F7E'}
            containerStyle={{ width: 20, alignSelf: 'center' }}
            onPress={() => {
              setShow(s => !s);
              setArrow(a => (a === 'caret-down' ? 'caret-up' : 'caret-down'));
            }}
          />
          {show && (
            <View>
              <View style={[styles.rowContainer]}>
                <View style={styles.fieldSet}>
                  <Text style={styles.legend}>Location name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeLocation}
                    value={location}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { marginTop: 10, marginBottom: 5 },
                ]}>
                <View style={{ width: '48%' }}>
                  <DatePicker
                    dateConfig={{}}
                    onChangeText={t => console.log(t)}
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
                      { label: '48:00:00', value: '48' },
                      { label: '24:00:00', value: '24' },
                    ]}
                    style={{
                      iconContainer: {
                        top: 8,
                        right: '80%',
                      },
                      inputIOS: [
                        theme.inputIOS,
                        { paddingLeft: 45, height: 40 },
                      ],
                      inputAndroid: [
                        theme.inputAndroid,
                        { paddingLeft: 45, height: 40 },
                      ],
                    }}
                  />
                </View>
              </View>
            </View>
          )}
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
                marginHorizontal: 10,
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
            bottom: 15,
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
          onPress={() => navigation.goBack()}
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
