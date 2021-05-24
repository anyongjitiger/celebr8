import React from 'react';

import {
  View,
  Button,
  Text,
  StyleSheet,
  Header,
  TouchableOpacity,
  Divider,
} from '@components';
import {useTranslation, useGlobal, useState} from '@hooks';
import {useTheme, themes} from '@themes';
import {UnderlayParams} from 'react-native-swipeable-item';
import ImagePicker from 'react-native-image-crop-picker';
import {ImageOrVideo} from '@types';
import {Table} from '@constants';
import Video from 'react-native-video';
import {API} from '@constants';
import {
  fileFetch,
  dbFetch,
  getGlobal,
  getUTCTime,
  getAllContacts,
} from '@services';
import config from '@config';
import {useNavigation} from '@react-navigation/core';
import {RNFetchBlob} from '@helpers';

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

const renderUnderlayLeft = ({item, percentOpen}: UnderlayParams<Item>) => (
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

// const Swipt: React.FC<any> = () => {
//   return (
//     <SwipeableItem
//       overSwipe={100}
//       renderUnderlayLeft={renderUnderlayLeft}
//       snapPointsLeft={[50, 100, 150]}>
//       <View>
//         <Button title="hello"></Button>
//       </View>
//     </SwipeableItem>
//   );
// };

const HelloWorld: React.FC<any> = () => {
  const {token} = getGlobal();
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
  });

  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const nav = useNavigation();

  const {user} = getGlobal();
  console.log(' current user', user);

  function onGetAllContacts() {
    nav.navigate('AddContact', {screen: 'Hello'});
  }

  const onPick = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(imgs => {
      console.log('imgs', imgs);
      setImages(imgs);
    });
  };

  const onUpload = () => {
    console.log('images', images);
    fileFetch
      .upload(images, {
        progress: (pre: number) => {},
      })
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

  function testDbFetchQuery() {
    /* get all */
    dbFetch.query(Table.Experience).then((res: any) => {
      const [error, data] = res;
      console.log(error, data);
    });

    /* get one */
    dbFetch.query(Table.Experience, {vals: 4}).then((res: any) => {
      const [error, data] = res;
      console.log(error, data);
    });
    /* specified  fileds */
    dbFetch
      .query(Table.Experience, {
        names: ['owner', 'title', 'descr'],
        types: ['int', 'string', 'string'],
      })
      .then((res: any) => {
        const [error, data] = res;
        console.log(error, data);
      });

    /* where query */
    dbFetch
      .query(Table.Experience, {
        vals: [4, 'xsh.lee'],
        names: ['id', 'location'],
        types: ['int', 'string'],
      })
      .then((res: any) => {
        const [error, data] = res;
        console.log(error, data);
      });
  }

  async function testGetUTCTime() {
    const [err, time] = await getUTCTime();
    if (!err) console.log('get utc time=>>', time, new Date(time).toString());
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
      .update(Table.Experience, 1, {
        edit_date: time,
      })
      .then((res: any) => {
        const [er, d] = res;
        console.log(' insert experience error :', er, 'res:', d);
      });
  }

  async function testDbFetchDelete() {}

  return (
    <View style={theme.container}>
      <Video
        source={{
          uri: url_download + '/1.mp4',
          headers: {
            Token: token + '',
          },
        }} // Can be a URL or a local file.
        repeat={true}
        ref={ref => {
          // this.player = ref;
        }} // Store reference
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={err => {
          console.error(' Video err', err);
        }} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
      {/* <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="Get All Contacts" onPress={onGetAllContacts}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="Select image" onPress={onPick}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="upload" onPress={onUpload}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="download" onPress={onDownload}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="getFileList" onPress={getFileList}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="Delete File" onPress={onUpload}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button
        title="Test dbFetch API Query"
        onPress={testDbFetchQuery}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button
        title="Test dbFetch API insert"
        onPress={testDbFetchInsert}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button
        title="Test dbFetch API Update"
        onPress={testDbFetchUpdate}></Button>
      <Divider style={{backgroundColor: 'blue', marginVertical: 5}} />
      <Button title="Get UTC Time" onPress={testGetUTCTime}></Button> */}
    </View>
  );
};
export default HelloWorld;