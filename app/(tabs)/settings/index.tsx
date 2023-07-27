import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View} from "react-native";

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.head}>About Befit</Text>
        <Text style={styles.body}>
        Befit is an app that aims to revolutionize how we approach fitness and well-being. Befit is a personal fitness coach and tracker mobile application empowering users to prioritize their wellness amidst being-at-home responsibilities.
        </Text>
        <Text style={styles.body}>Built with React Native and AWS Amplify</Text>
        <Text style={styles.head}>Developer</Text>
        <Text style={styles.body}>Developed with love by Abdulrasaq Jamiu Adewuyi</Text>
        <Text style={styles.head}>References</Text>
        <Text style={[styles.head, {margin : 0}]}>Images and assets</Text>
        <Text style={styles.body}>Photo by <Link href="https://unsplash.com/@echaparro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"><Text>Edgar Chaparro</Text> </Link> <Text>on</Text>  <Link href="https://unsplash.com/photos/sHfo3WOgGTU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"><Text>Unsplash</Text> </Link></Text>
        <Text style={styles.body}>Gif image  <Text>on</Text>  <Link href="https://gifer.com/en/s/vector-sit-ups"><Text>gifer.com</Text> </Link></Text>
        <Text style={styles.body}>Some design idea from Home workout app </Text>
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
    fontSize : 18,
    fontWeight : 'bold',
    marginVertical : 5
  },
  body : {
    fontSize: 16,
    marginBottom : 10,
    lineHeight:24
  }
});
