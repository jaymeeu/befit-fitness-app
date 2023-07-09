import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  useColorScheme,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { TextStroke } from "../TextStroke";

const EachBoard = (props) => {
  const { imageSrc, title, subtitle, imageDimension } = props;

  const window_width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const colorScheme = useColorScheme();

  const style = StyleSheet.create({
    container: {
      width: window_width,
      padding: 30,
    },
    images: {
      marginVertical: height / 53,
    },
    heading: {
      marginVertical: 12,
      color: Colors[colorScheme ?? "light"].alwayWhite,
      fontSize: 24,
      fontWeight: 600,
      fontFamily: "capriola",
    },
    subheading: {
      width: window_width * 0.8,
      color: Colors[colorScheme ?? "light"].text,
      fontFamily: "work-san",
      fontSize: 16,
    },
  });

  return (
    <View style={style.container}>
        <View style={{marginBottom : 20, marginTop : 30}}>
        <TextStroke stroke={1} color={"#000000"}>
        <Text
          style={{
            fontSize: 30,
            color: "#FFFFFF",
            fontFamily: "capriola",
          }}
        >
          {title}
        </Text>
      </TextStroke>
        </View>
     
      <TextStroke stroke={1} color={"#000000"}>
        <Text
          style={{
            fontSize: 18,
            color: "#FFFFFF",
            fontFamily: "work-san",
          }}
        >
          {subtitle}
        </Text>
      </TextStroke>
    </View>
  );
};

export default EachBoard;
