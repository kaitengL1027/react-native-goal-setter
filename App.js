import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from "react-native";

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  console.log("Whut wht");


  const addGoalHandler = goalTitle => {
    setCourseGoals(prevGoals => [...prevGoals, { key: Math.random().toString(), value: goalTitle}]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalID => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalID);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title={"Add New Goal"} onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList 
        keyExtractor={(item, index) => item.key}
        data={courseGoals} 
        renderItem={itemData => (
          <GoalItem title={itemData.item.value} id={itemData.item.key} onDelete={removeGoalHandler}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }
});

