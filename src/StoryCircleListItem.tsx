import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import { usePrevious } from './helpers/StateHelpers';
import { IUserStory, StoryCircleListItemProps } from './interfaces';

import DEFAULT_AVATAR from './assets/images/no_avatar.png';
import LinearGradient from 'react-native-linear-gradient';

const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = 60,
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {
  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  const avatarWrapperSize = avatarSize + 4;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2089C5', '#65E43A']} // Your gradient colors
        style={{
          height: avatarWrapperSize,
          width: avatarWrapperSize,
          borderRadius: avatarWrapperSize / 2,
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => _handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            {
              height: '95%',
              width: '95%',
              borderRadius: 100,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            },
            avatarWrapperStyle,
          ]}
        >
          <Image
            style={[
              {
                height: avatarSize,
                width: avatarSize,
                borderRadius: 100,
              },
              avatarImageStyle,
            ]}
            source={{ uri: item.user_image }}
            defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
          />
        </TouchableOpacity>
      </LinearGradient>
      {showText && (
        <Text
          // numberOfLines={1}
          // ellipsizeMode="tail"
          style={[
            {
              width: avatarWrapperSize,
              ...styles.text,
              ...avatarTextStyle,
            },
            isPressed
              ? { color: pressedAvatarTextColor || undefined }
              : { color: unPressedAvatarTextColor || undefined },
          ]}
        >
          {item.user_name}
        </Text>
      )}
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    width: 90,
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
  },
});
