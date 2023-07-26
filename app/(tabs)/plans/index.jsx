import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Progress, Workout } from "../../../src/models";
import { useAuthContext } from "../../../contexts/AuthContext";
import MyWorkouts from "../../../components/home/MyWorkouts";

export default function MyPlans() {
  const { width } = useWindowDimensions();

  const { dbUser } = useAuthContext()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    upperCardCont: {
      flexDirection: "row",
      gap: 10,
    },
    cards: {
      borderRadius: 15,
      padding: 10,
      flex: 1,
      backgroundColor: '#1c1c1c'
    },
    card_title: {
      backgroundColor: "transparent",
      justifyContent: "center",
      gap: 2,
    },
    numberCont: {
      width: '100%',
      alignContent: 'center',
      position: 'relative'
    },
    plans: { color: '#0C0C0C', fontSize: 20, fontFamily: 'capriola', marginBottom: 15 },
    label: { color: 'white', fontFamily: 'capriola', textAlign: 'center', fontSize: 20, top: -65, position: 'absolute', width: '100%' }
  });

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(85,105,255, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  const [userProgress, setuserProgress] = useState([])
  const [myWorkout, setmyWorkout] = useState([])
  const [dailyProg, setdailyProg] = useState('')
  const [overallProg, setOverallprog] = useState('')

  const filterByToday = (array) => {
    if (array.length === 0) { return }
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];
    return array.filter(item => item.createdAt.startsWith(todayISOString));
  }


  function calculateSumOfRatios(data) {
    if (data.length === 0) { return }
    const sumCompletedIds = data.reduce((sum, item) => sum + item?.completed_exercise_ids.length, 0);
    const sumTotalExercise = data.reduce((sum, item) => sum + item.total_exercise, 0);
    return `${sumCompletedIds}/${sumTotalExercise}`;
  }

  const fetchProgress = async () => {
    const prog = await DataStore.query(Progress, prog => (prog.userID.eq(dbUser.id)))

    if(prog.length > 0){
      const workout_ids = prog.map((p)=>p.workout_id)
      const workouts = await DataStore.query(Workout, work => work.or(e => workout_ids.map(id => e.id.eq(id)) )); 
      setmyWorkout(workouts)
    }
    

    setuserProgress(prog)

    const todayProg = filterByToday(prog)

    setdailyProg(calculateSumOfRatios(todayProg))
    setOverallprog(calculateSumOfRatios(prog))
  }
  useEffect(() => {
    fetchProgress()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 15 }}>
        <Text style={styles.plans}>Performance</Text>
        <View style={styles.upperCardCont}>
          <View style={styles.cards}>
            <View style={styles.card_title}>
              <ProgressChart
                data={{ data: dailyProg ? [parseInt(dailyProg.split("/")[0]) / parseInt(dailyProg.split("/")[1])] : [0.0] }}
                width={width / 2 - 40}
                height={100}
                strokeWidth={8}
                radius={40}
                chartConfig={chartConfig}
                hideLegend={true}
              />
              <View style={styles.numberCont}>
                <Text style={styles.label} >{dailyProg ? dailyProg : 0}</Text>
                <Text style={{ color: 'white', fontFamily: 'capriola', textAlign: 'center', fontSize: 16, }} >Today streak</Text>
              </View>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={styles.card_title}>
              <ProgressChart
                data={{ data: overallProg ? [overallProg.split("/")[0] / overallProg.split("/")[1]] : [0.0] }}
                width={width / 2 - 40}
                height={100}
                strokeWidth={8}
                radius={40}
                chartConfig={chartConfig}
                hideLegend={true}
              />
              <View style={styles.numberCont}>
                <Text style={styles.label} >{overallProg ? overallProg : 0}</Text>
                <Text style={{ color: 'white', fontFamily: 'capriola', textAlign: 'center', fontSize: 16, }} >Overall streak</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={[styles.plans, {marginTop : 20}]}>My workout progress</Text>
        <MyWorkouts 
          workouts={myWorkout}  
          progress={userProgress}
        />
      </View>
    </SafeAreaView>
  );
}
