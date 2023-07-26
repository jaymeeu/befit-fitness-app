import { ScrollView, StyleSheet, Text, View} from "react-native";

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.head}>Hello</Text>
        <Text style={styles.body}>Hello</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15
  },
  head : {
    fontSize : 16,
    fontWeight : 'bold',
    marginVertical : 10
  },
  body : {
    fontSize: 14
  }
});
