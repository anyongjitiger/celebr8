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
  NameAvatar,
  StatusBar,
  Divider,
  TextInput,
  Select,
  DatePicker,
} from '@components';
import { themes } from '@themes';
import { useTheme } from '@hooks';

const CreateActivity: React.FC<any> = ({ route, navigation }) => {
  const contacts = route?.params?.contacts;
  const activity = route?.params?.activity;
  const [theme] = useTheme(themes);
  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const [text, onChangeText] = useState('');
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState('caret-down');
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
                onChangeText={onChangeText}
                value={text}
              />
              <Icon
                name="island"
                type="fontisto"
                color="#FF5959"
                size={20}
                style={{ position: 'relative', right: 0, top: 0 }}
              />
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
                onChangeText={onChangeText}
                multiline
                numberOfLines={4}
                value={text}
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
                    onChangeText={onChangeText}
                    value={text}
                  />
                </View>
              </View>
              <View style={[styles.rowContainer]}>
                <View style={{ width: '48%' }}>
                  <Select
                    showIcon
                    items={[
                      { label: '48:00:00', value: '48' },
                      { label: '24:00:00', value: '24' },
                    ]}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: '80%',
                      },
                      inputIOS: [theme.inputIOS, { paddingLeft: 45 }],
                      inputAndroid: [theme.inputAndroid, { paddingLeft: 45 }],
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '48%',
                    marginLeft: '4%',
                    justifyContent: 'center',
                    marginTop: 30,
                  }}>
                  <DatePicker
                    dateConfig={{}}
                    onChangeText={t => console.log(t)}
                    date={new Date()}
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
