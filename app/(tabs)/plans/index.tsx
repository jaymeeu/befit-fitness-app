import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export default function MyPlans() {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    upperCardCont: {
      padding: 15,
      flexDirection: "row",
      gap: 10,
    },
    cards: {
      borderRadius: 15,
      padding: 10,
      flex: 1,
    },
    card_title: {
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    data: [0.5],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperCardCont}>
        <View style={styles.cards}>
          <View style={styles.card_title}>
            <ProgressChart
              data={data}
              width={width/2 - 40}
              height={90}
              strokeWidth={8}
              radius={30}
              chartConfig={chartConfig}
              hideLegend={true}
            />
          </View>
        </View>
        <View style={styles.cards}>
          <View style={styles.card_title}>
            <ProgressChart
              data={data}
              width={width/2 - 40}
              height={90}
              strokeWidth={8}
              radius={30}
              chartConfig={chartConfig}
              hideLegend={true}
            />
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
