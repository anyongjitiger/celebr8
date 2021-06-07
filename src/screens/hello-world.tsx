import React from 'react';
import branch, { BranchEvent } from 'react-native-branch';
import {
  Button,
  Text,
  StyleSheet,
  Header,
  TouchableOpacity,
  Divider,
  ScrollView,
  Input,
  Lable,
  ListItem,
  DatePicker,
  TextArea,
  FastImage,
} from '@components';
import { useTranslation, useGlobal, useState } from '@hooks';
import { useTheme, themes } from '@themes';
import { UnderlayParams } from 'react-native-swipeable-item';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageOrVideo } from '@types';
import { Table } from '@constants';
import Video from 'react-native-video';
import { API } from '@constants';

import {
  fileFetch,
  dbFetch,
  getGlobal,
  getUTCTime,
  getAllContacts,
} from '@services';

import config from '@config';
import { useNavigation } from '@react-navigation/core';
import { RNFetchBlob } from '@helpers';

import { Message } from '@services';

const dirs = RNFetchBlob.fs.dirs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
  },
  red: {
    color: 'white',
    backgroundColor: 'red',
    width: 50,
    height: '100%',
  },
  blue: {
    color: 'white',
    backgroundColor: 'blue',
    width: 50,
    height: '100%',
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

type Item = {
  key: string;
  text: string;
  backgroundColor: string;
  height: number;
};

const renderUnderlayLeft = ({ item, percentOpen }: UnderlayParams<Item>) => (
  <>
    <TouchableOpacity>
      <Text style={styles.red}>{`[x]`}</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.blue}>{`[Y]`}</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.red}>{`[Z]`}</Text>
    </TouchableOpacity>
  </>
);

const HelloWorld: React.FC<any> = () => {
  const { token } = getGlobal();
  const [, setToken] = useGlobal('token');
  const [theme] = useTheme(themes);
  // Later on in your styles..
  const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
    },
    divider: {
      backgroundColor: 'blue',
      marginVertical: 5,
    },
  });

  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const nav = useNavigation();

  const { user } = getGlobal();
  console.log(' current user', user);

  function onGetAllContacts() {
    nav.navigate('AddContact', { screen: 'Hello' });
  }

  const onPick = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(imgs => {
      console.log('select imgs==>', imgs);
      setImages(imgs);
    });
  };

  const onUpload = () => {
    console.log('images', images);
    fileFetch
      .uploadExepImgs(
        { file: images, expe_id: 1 },
        {
          progress: (pre: number) => {},
        },
      )
      .then(res => {
        // const [err, data] = res;
        // console.log('upload res', err, data);
      });
  };

  const [videosrc, setVideoSrc] = useState(
    '/data/user/0/com.celebr8mvpts/files/RNFetchBlobTmp_hpvuxekyyc9dcdknuhkc4.mp4',
  );

  const url_download = `${config.API_URL}${API.FILE_DOWNLOAD}`;
  console.log(url_download + '/1.mp4', 'token : ', token);

  async function onDownload() {
    const res = await fileFetch
      .download('1.mp4', {
        config: {
          fileCache: true,
          // by adding this option, the temp files will have a file extension
          appendExt: 'mp4',
          // path: dirs.DCIMDir + '/1.mp4',
        },
        progress(p) {
          // console.log('progress ===> ', p);
        },
      })
      .then(res => {
        return res;
        console.log('download', res);
      });
    console.log('download', res);
  }

  function getFileList() {
    fileFetch.download('video').then(res => {
      console.log('getFileList', res);
    });
  }

  const onDeleteFile = () => {
    // fileFetch.remove('aaa');
  };

  async function testGetUTCTime() {
    const [err, time] = await getUTCTime();
    if (!err) console.log('get utc time=>>', time, new Date(time).toString());
  }

  function testDbFetchQuery() {
    /* get all */
    dbFetch.query(Table.Experience).then((res: any) => {
      const [error, data] = res;
      console.log('query all :', error, data);
    });

    /* get one */
    dbFetch
      .query(Table.Experience, { columns: 'id,owner,title' })
      .then((res: any) => {
        const [error, data] = res;
        console.log(error, data);
      });

    /* specified  fileds */
    dbFetch
      .query(Table.Experience, {
        page: 1,
        length: 2,
        columns: 'owner,title,descr',
      })
      .then((res: any) => {
        const [error, data] = res;
        console.log(error, data);
      });

    /* where query */
    dbFetch
      .query(Table.Experience, {
        id: 4,
      })
      .then((res: any) => {
        const [error, data] = res;
        console.log(error, data);
      });
  }

  async function testDbFetchInsert() {
    const [err, time] = await getUTCTime();
    dbFetch
      .insert(Table.Experience, {
        owner: user?.id,
        title: 'test experience',
        descr: 'hello experience',
        create_date: time,
        edit_date: time,
        location: '',
        indate: time,
      })
      .then((res: any) => {
        const [er, d] = res;
        console.log(' insert experience error :', er, 'res:', d);
      });
  }

  async function testDbFetchUpdate() {
    const [err, time] = await getUTCTime();
    dbFetch
      .update(
        Table.Experience,
        { id: 1 },
        {
          edit_date: time,
        },
      )
      .then((res: any) => {
        const [er, d] = res;
        console.log(' insert experience error :', er, 'res:', d);
      });
  }

  async function testDbFetchDelete() {
    dbFetch.remove(Table.Experience, { id: 4 }).then((res: any) => {
      const [er, d] = res;
      console.log(' testDbFetchDelete error:', er, 'res:', d);
    });
  }

  const [
    branchUniversalObject,
    setBranchUniversalObject,
  ] = useState<BranchUniversalObject>({});

  `/**for refreed deep link */`;

  async function createDeeplink() {
    // only canonicalIdentifier is required
    let branchUniversalObject = await branch.createBranchUniversalObject(
      'canonicalIdentifier',
      {
        locallyIndex: true,
        title: 'Cool Content!',
        contentDescription: 'Cool Content Description',
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            method: 'invite',
            content: 'exep_id',
          },
        },
      },
    );

    setBranchUniversalObject(branchUniversalObject);

    console.log('branchUniversalObject==>>', branchUniversalObject);

    let linkProperties = {
      feature: 'invite',
      content: 'exep_id',
    };

    let controlParams = {
      $android_url: 'celebr8://feature',
      $ios_url: 'celebr8://feature',
    };

    const { url } = await branchUniversalObject.generateShortUrl(
      linkProperties,
      controlParams,
    );

    console.log('deep link url', url);
  }

  async function shareDeeplink() {
    let shareOptions = {
      messageHeader: 'Check this out',
      messageBody: 'No really, check this out!',
    };
    let linkProperties = { feature: 'share', channel: 'RNApp' };
    let controlParams = {
      $desktop_url: 'http://example.com/home',
      $ios_url: 'http://example.com/ios',
    };
    let {
      channel,
      completed,
      error,
    } = await branchUniversalObject.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );

    console.log(`channel, completed, error,`, channel, completed, error);
  }

  return (
    <ScrollView style={theme.container}>
      <Button
        title="show Message"
        onPress={() => {
          Message.show({
            description: 'hello title description',
            message: 'hello world',           
          });
        }}></Button>
      <Divider style={styles.divider} />
      <FastImage
        style={{
          flex: 1,
          width: '100%',
          height: 200,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: 'black',
        }}
        resizeMode={FastImage.resizeMode.contain}
        onError={() => {
          // console.error('onlaod  fast image error');
        }}
        onProgress={event => {
          // console.log('on progress ====>', event);
        }}
        source={{
          uri: `${config.API_URL}${API.FILE_DOWNLOAD}/32/19/91f696c2c5324714943b71a0cbdc0c9a.jpg`,
          // uri: `https://tse2-mm.cn.bing.net/th/id/OIP.qkpZkUDyLIB3c5Uks8D1oAHaE8?w=237&h=180&c=7&o=5&pid=1.7`,
        }}></FastImage>
      <Divider style={styles.divider} />
      <Button title="Create DeepLink" onPress={createDeeplink}></Button>
      <Divider style={styles.divider} />
      <Button title="shareDeeplink" onPress={shareDeeplink}></Button>
      <Divider style={styles.divider} />
      <Input label={<Lable label="hello" />}></Input>
      <Button title="Get All Contacts" onPress={onGetAllContacts}></Button>
      <Divider style={styles.divider} />
      <Button title="Select image" onPress={onPick}></Button>
      <Divider style={styles.divider} />
      <Button title="upload" onPress={onUpload}></Button>
      <Divider style={styles.divider} />
      <Button title="download" onPress={onDownload}></Button>
      <Divider style={styles.divider} />
      <Button title="getFileList" onPress={getFileList}></Button>
      <Divider style={styles.divider} />
      <Button title="Delete File" onPress={onUpload}></Button>
      <Divider style={styles.divider} />
      <Button
        title="Test dbFetch API Query"
        onPress={testDbFetchQuery}></Button>
      <Divider style={styles.divider} />
      <Button
        title="Test dbFetch API insert"
        onPress={testDbFetchInsert}></Button>
      <Divider style={styles.divider} />
      <Button
        title="Test dbFetch API Update"
        onPress={testDbFetchUpdate}></Button>
      <Divider style={styles.divider} />
      <Button
        title="Test dbFetch API Delete"
        onPress={testDbFetchDelete}></Button>
      <Divider style={styles.divider} />
      <Button title="Get UTC Time" onPress={testGetUTCTime}></Button>
      <Divider style={styles.divider} />
      <Button
        title="Logout"
        onPress={() => {
          setToken('');
        }}></Button>
      <TextArea></TextArea>
      <Divider style={styles.divider} />
      <DatePicker onChangeText={date => {}} date={new Date()}></DatePicker>
      <Divider style={styles.divider} />
      <Input
        editable
        multiline
        numberOfLines={4}
        label={<Lable label="hello *" />}></Input>
    </ScrollView>
  );
};
export default HelloWorld;
