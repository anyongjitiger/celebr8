import React, {useState, useEffect} from 'react';
import {View, Text} from '@components';
import PropTypes from 'prop-types';
function random(min: number, max: number) {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRgb() {
  return `rgb(${random(0, 255)}, ${random(0, 255)} ,${random(0, 255)})`;
}
const NameAvatar: React.FC<any> = ({...Props}) => {
  const {size = 40, color, name, style} = Props;
  /* const _color = randomRgb();
  const [Colour, setColour] = useState(_color);
  useEffect(() => {
    if (color !== undefined) {
      setColour(color);
    }
  }, [color]); */
  const newName = name
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n.substr(0, 1).toUpperCase())
    .join('');
  return (
    <>
      <View
        style={[
          style,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            justifyContent: 'center',
          },
        ]}>
        <Text style={{fontSize: 14, color: '#8492A5', alignSelf: 'center'}}>
          {newName}
        </Text>
      </View>
    </>
  );
};

NameAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};
export default NameAvatar;
