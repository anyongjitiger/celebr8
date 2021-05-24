import * as React from 'react';
import {useTheme, useRef} from '@hooks';
import {themes, styleSheetFactory} from '@themes';
import {ViewStyle} from '@types';
import {Video, Circle, FastImage} from '@components';

const themedStyles = styleSheetFactory(theme => ({
  containerStyle: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
}));

const VideoPreview: React.FC<TProps> = ({
  hidden,
  uri = null,
  containerStyle,
  withPlayButton = false,
  setUploadedImagesStatus,
  thumbnail,
}) => {
  const [styles] = useTheme(themes);
  const videoRef = useRef<Video>(null);
  const videoStyle = [themedStyles, containerStyle];

  const onLoad = () => {
    uri && setUploadedImagesStatus && setUploadedImagesStatus(uri, true);
    videoRef.current?.seek(2);
  };

  const onLoadImage = () => {
    uri && setUploadedImagesStatus && setUploadedImagesStatus(uri, true);
  };

  return hidden ? null : (
    <Circle hidden={!withPlayButton}>
      {thumbnail ? (
        <FastImage
          source={{uri: thumbnail || ''}}
          style={videoStyle}
          onLoad={onLoadImage}
        />
      ) : (
        <Video
          ref={videoRef}
          source={{uri: uri || ''}}
          style={videoStyle}
          paused={true}
          resizeMode={'stretch'}
          onLoad={onLoad}
        />
      )}
    </Circle>
  );
};

type TProps = {
  hidden?: boolean;
  uri?: string | null;
  containerStyle?: ViewStyle;
  withPlayButton?: boolean;
  setUploadedImagesStatus?: (url: string, status: boolean) => void;
  thumbnail?: string;
};

export default VideoPreview;
