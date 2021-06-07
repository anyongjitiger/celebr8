import React, { useEffect, useState } from 'react';
import { Modal, BackHandler, View } from 'react-native';
import { Icon } from '@components';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImage: React.FC<any> = ({ route, navigation }) => {
  const images = route?.params?.images;
  const [curImage, setCurImage] = useState(route?.params?.curImage);
  const [curImagePath, setCurImagePath] = useState('');
  useEffect(() => {
    setCurImagePath(images[curImage].path);
  }, [images, curImage]);
  const [isModalVisible, setModalVisible] = useState(true);
  const closeModal = () => {
    if (isModalVisible) {
      setModalVisible(false);
      navigation.goBack();
    }
    return null;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', closeModal);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', closeModal);
  }, []);
  return (
    <View>
      <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
        <ImageViewer
          imageUrls={images.map(img => {
            return { url: img.path };
          })}
          index={curImage}
          enableSwipeDown
          onSwipeDown={closeModal}
          saveToLocalByLongPress={false}
          onChange={v => setCurImage(v)}
        />
        <Icon
          name="arrow-alt-circle-down"
          type="font-awesome-5"
          size={40}
          color={'#CBB7AC'}
          containerStyle={{
            position: 'absolute',
            borderTopRightRadius: 8,
            zIndex: 1,
            right: 50,
            bottom: 150,
          }}
          onPress={() => console.log(curImagePath)}
        />
      </Modal>
    </View>
  );
};
export default ViewImage;
