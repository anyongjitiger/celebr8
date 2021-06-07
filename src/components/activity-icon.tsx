import * as React from 'react';
import { ActivityType } from '@constants';
import { Svg, Icon } from '@components';

const ActivityIcon: React.FC<any> = ({ type, size = 20 }) => {
  return (
    <>
      {(() => {
        switch (type) {
          case ActivityType.Birthday:
            return (
              <Icon
                name="birthday-cake"
                type="font-awesome"
                color="#F1C40F"
                size={size}
              />
            );
          case ActivityType.Wedding:
            return <Svg icon="wedding-rings" size={size} color="#E84C3D" />;
          case ActivityType.Party:
            return (
              <Icon
                name="glass-cheers"
                type="font-awesome-5"
                color="#E77E23"
                size={size}
              />
            );
          case ActivityType.Trip:
            return (
              <Icon name="island" type="fontisto" color="#2CCB6F" size={size} />
            );
          case ActivityType.Meeting:
            return (
              <Icon
                name="users"
                type="font-awesome"
                color="#208FDA"
                size={size}
              />
            );
          case ActivityType.Others:
            return (
              <Icon
                name="border-all"
                type="font-awesome-5"
                color="#9955B3"
                size={size}
              />
            );
          default:
            return (
              <Icon
                name="beer"
                type="font-awesome"
                color="#9955B3"
                size={size}
              />
            );
        }
      })()}
    </>
  );
};

export default ActivityIcon;
