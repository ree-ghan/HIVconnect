import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProgressChart, LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const HealthTrackerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { weight, height, calories } = route.params || {};

  const [bmi, setBMI] = useState(0);

  useEffect(() => {
    if (weight && height) {
      const heightMeters = height / 100; // Convert height to meters
      const bmiValue = weight / (heightMeters * heightMeters); // Calculate BMI
      setBMI(bmiValue.toFixed(1)); // Set BMI rounded to 1 decimal place
    }
  }, [weight, height]);

  const progressChartData = {
    labels: ['Steps'], // optional
    data: [0.75],
  };

  const lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [50, 10, 40, 95, 85, 35, 53, 24, 50],
      },
    ],
  };

  const barChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [8000, 6500, 7000, 8500, 9000, 10000, 9500],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Protein',
      population: 45,
      color: '#f00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Carbs',
      population: 35,
      color: '#0f0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Fats',
      population: 20,
      color: '#00f',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Overview</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditScreen')}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeaderText}>Your Daily Health Statistics</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Steps</Text>
          <ProgressChart
            data={progressChartData}
            width={screenWidth / 2 - 40}
            height={120}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
          <Text style={styles.metricValue}>7500/10000</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Calories</Text>
          <Text style={styles.metricValue}>{calories} kcal</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Weight</Text>
          <Text style={styles.metricValue}>{weight} kg</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Height</Text>
          <Text style={styles.metricValue}>{height} cm</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Water</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth / 2 - 40}
            height={120}
            chartConfig={chartConfig}
            bezier
          />
          <Text style={styles.metricValue}>0.55 liters</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Heart</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth / 2 - 40}
            height={120}
            chartConfig={chartConfig}
            bezier
          />
          <Text style={styles.metricValue}>105 bpm</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Sleep</Text>
          <Text style={styles.metricValue}>08:32 hours</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>BMI</Text>
          <Text style={styles.metricValue}>{bmi}</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Steps</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Calorie Intake</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
      <View style={styles.footer}>
        <Image style={[styles.navIcon, { tintColor: 'black' }]} source={{ uri: 'home_icon_url' }} />
        <Image style={[styles.navIcon, { tintColor: 'black' }]} source={{ uri: 'stats_icon_url' }} />
        <Image style={[styles.navIcon, { tintColor: 'black' }]} source={{ uri: 'add_icon_url' }} />
        <Image style={[styles.navIcon, { tintColor: 'black' }]} source={{ uri: 'profile_icon_url' }} />
        <Image style={[styles.navIcon, { tintColor: 'black' }]} source={{ uri: 'settings_icon_url' }} />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 16,
    color: 'blue',
  },
  subHeaderText: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  metricBox: {
    width: '45%',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default HealthTrackerScreen;
