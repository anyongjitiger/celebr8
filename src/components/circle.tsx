import * as React from 'react';
import {useTheme, themes} from '@themes';
import {View, Icon, Touchable} from '@components';
import {ReactNode} from '@types';

const Circle: React.FC<TProps> = ({hidden, children, onPress}) => {
  const [styles] = useTheme(themes);
  const Circle = (props: TCircleProps) =>
    onPress ? <Touchable {...props} onPress={onPress} /> : <View {...props} />;
  return (
    <>
      {children}
      <View hidden={hidden} style={styles.container} pointerEvents="box-none">
        <Circle style={styles.circle}>
          <Icon name="play" type="fontisto" size={20} />
        </Circle>
      </View>
    </>
  );
};

type TProps = {
  hidden?: boolean;
  children: ReactNode;
  onPress?: () => void;
};

type TCircleProps = {
  children: ReactNode;
  style: object;
};

export default Circle;
