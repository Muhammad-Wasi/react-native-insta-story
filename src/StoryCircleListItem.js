import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { usePrevious } from "./helpers/StateHelpers";

import DEFAULT_AVATAR from "./assets/images/no_avatar.png";

const StoryCircleListItem = (props) => {
  const {
    item,
    unPressedBorderColor,
    pressedBorderColor,
    avatarSize,
    avatarStyle,
    avatarImageStyle,
    showText,
    textStyle,
  } = props;

  const [isPressed, setIsPressed] = useState(props?.item?.seen);

  const prevSeen = usePrevious(props?.item?.seen);

  useEffect(() => {
    if (prevSeen != props?.item?.seen) {
      setIsPressed(props?.item?.seen);
    }
  }, [props?.item?.seen]);

  const _handleItemPress = (item) => {
    const { handleStoryItemPress } = props;

    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  const size = avatarSize?.width
    ? avatarSize
    : {
        width: 60,
        height: 60,
        borderRadius: 10,
      };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => _handleItemPress(item)}
        style={[
          styles.avatarWrapper,
          {
            height: size.height + 4,
            width: size.width + 4,
            borderRadius: size.borderRadius + 4,
          },
          avatarStyle ? avatarStyle : {},
          !isPressed
            ? {
                borderColor: unPressedBorderColor
                  ? unPressedBorderColor
                  : "red",
              }
            : {
                borderColor: pressedBorderColor ? pressedBorderColor : "grey",
              },
        ]}
      >
        <Image
          style={[size, avatarImageStyle ? avatarImageStyle : {}]}
          source={{ uri: item?.vibes[0]?.media?.url || item.profilePic }}
          defaultSource={Platform.OS === "ios" ? DEFAULT_AVATAR : null}
        />
      </TouchableOpacity>
      {showText && (
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            width: size.width + 4,
            ...styles.text,
            ...textStyle,
          }}
        >
          {item.username}
        </Text>
      )}
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginRight: 10,
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "red",
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: "center",
    alignItems: "center",
    fontSize: 11,
  },
});
