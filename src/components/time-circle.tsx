import React from 'react';
import {Animated} from '@components';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const TimeCircle: React.FC<any> = ({...Props}) => {
  const {remainTime, duration, size, completed} = Props;
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        size={size}
        duration={duration}
        strokeWidth={3}
        colors={
          completed
            ? '#7F7F7F'
            : [
                ['#12C660', 1],
                ['#E2770F', 0.75],
              ]
        }
        initialRemainingTime={remainTime}>
        {({remainingTime, animatedColor}) => (
          <Animated.Text style={{color: animatedColor}}>
            {`${Math.floor(remainingTime / 3600)}:${Math.floor(
              (remainingTime % 3600) / 60,
            )}:${
              remainingTime % 60 > 9
                ? remainingTime % 60
                : '0' + (remainingTime % 60)
            }`}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </>
  );
};
export default TimeCircle;
