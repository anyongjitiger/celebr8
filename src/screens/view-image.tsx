import React, {useEffect, useState} from 'react';
import {Modal, BackHandler, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImage: React.FC<any> = ({route, navigation}) => {
  const images = route?.params?.images;
  const curImage = route?.params?.curImage;
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
            return {url: img.path};
          })}
          index={curImage}
          enableSwipeDown
          onSwipeDown={closeModal}
          saveToLocalByLongPress={false}
        />
      </Modal>
    </View>
  );
};
export default ViewImage;
