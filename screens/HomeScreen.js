import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import GameObject from "../components/GameObject";
import Counter from "../components/Counter";

export default function HomeScreen({ navigation, route }) {
  const defaultTasks = [
    { id: "1", description: "Зробити 10 кліків", completed: false },
    { id: "2", description: "Зробити 5 подвійних кліків", completed: false },
    { id: "3", description: "Утримувати об'єкт 3 секунди", completed: false },
    { id: "4", description: "Перетягнути об'єкт", completed: false },
    { id: "5", description: "Зробити свайп вправо", completed: false },
    { id: "6", description: "Зробити свайп вліво", completed: false },
    { id: "7", description: "Змінити розмір об'єкта", completed: false },
    { id: "8", description: "Отримати 100 очок", completed: false },
  ];

  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState(route.params?.tasks || defaultTasks);
  const [singleTapCount, setSingleTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);
  const [longPressCount, setLongPressCount] = useState(0);

  const navigateToTasks = () => {
    navigation.navigate("Tasks", { tasks, points });
  };

  useEffect(() => {
    if (route.params?.updatedTasks) {
      setTasks(route.params.updatedTasks);
    }
  }, [route.params?.updatedTasks]);

  useEffect(() => {
    if (route.params?.points !== undefined) {
      setPoints(route.params.points);
    }
  }, [route.params?.points]);

  useEffect(() => {
    if (points >= 100) {
      const taskIndex = tasks.findIndex(
        (task) => task.id === "8" && !task.completed
      );
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completed = true;
        setTasks(updatedTasks);
      }
    }
  }, [points]);

  const panRef = useRef();
  const pinchRef = useRef();
  const doubleTapRef = useRef();
  const longPressRef = useRef();

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const onSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPoints((prev) => prev + 1);
      setSingleTapCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          const taskIndex = tasks.findIndex(
            (task) => task.id === "1" && !task.completed
          );
          if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex].completed = true;
            setTasks(updatedTasks);
          }
        }
        return newCount;
      });
    }
  };

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPoints((prev) => prev + 2);
      setDoubleTapCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          const taskIndex = tasks.findIndex(
            (task) => task.id === "2" && !task.completed
          );
          if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex].completed = true;
            setTasks(updatedTasks);
          }
        }
        return newCount;
      });
    }
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const onPanHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {

      pan.extractOffset();

      const taskIndex = tasks.findIndex(
        (task) => task.id === "4" && !task.completed
      );
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completed = true;
        setTasks(updatedTasks);
      }
    }
  };

  const onLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPoints((prev) => prev + 5);
      setLongPressCount((prev) => {
        const newCount = prev + 1;
        
        if (newCount >= 1) {
          const taskIndex = tasks.findIndex(
            (task) => task.id === "3" && !task.completed
          );
          if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex].completed = true;
            setTasks(updatedTasks);
          }
        }
        
        return newCount;
      });
    }
  };

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: false }
  );
  const onPinchHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      if (Math.abs(nativeEvent.scale - 1) > 0.3) {
        setPoints((prev) => prev + 3);
        const taskIndex = tasks.findIndex(
          (task) => task.id === "7" && !task.completed
        );
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex].completed = true;
          setTasks(updatedTasks);
        }
      }
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };

  const onRightFling = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      setPoints((prev) => prev + randomPoints);
      const taskIndex = tasks.findIndex(
        (task) => task.id === "5" && !task.completed
      );
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completed = true;
        setTasks(updatedTasks);
      }
      Alert.alert("Right Fling!", `You earned ${randomPoints} points!`);
    }
  };

  const onLeftFling = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      setPoints((prev) => prev + randomPoints);
      const taskIndex = tasks.findIndex(
        (task) => task.id === "6" && !task.completed
      );
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completed = true;
        setTasks(updatedTasks);
      }
      Alert.alert("Left Fling!", `You earned ${randomPoints} points!`);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={onRightFling}
      >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={onLeftFling}
        >
          <View style={styles.screenContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={navigateToTasks}
              >
                <Text style={styles.buttonText}>Перейти до завдань</Text>
              </TouchableOpacity>
            </View>
            <Counter points={points} />
            <LongPressGestureHandler
              ref={longPressRef}
              onHandlerStateChange={onLongPress}
              minDurationMs={1000}
              simultaneousHandlers={[panRef]}
            >
              <PanGestureHandler
                ref={panRef}
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
                simultaneousHandlers={[pinchRef, longPressRef]}
              >
                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}
                  simultaneousHandlers={pinchRef}
                >
                  <TapGestureHandler
                    onHandlerStateChange={onSingleTap}
                    numberOfTaps={1}
                    waitFor={doubleTapRef}
                  >
                    <TapGestureHandler
                      ref={doubleTapRef}
                      onHandlerStateChange={onDoubleTap}
                      numberOfTaps={2}
                    >
                      <Animated.View
                        style={[
                          styles.object,
                          {
                            transform: [
                              ...pan.getTranslateTransform(),
                              { scale },
                            ],
                          },
                        ]}
                      >
                        <GameObject />
                      </Animated.View>
                    </TapGestureHandler>
                  </TapGestureHandler>
                </PinchGestureHandler>
              </PanGestureHandler>
            </LongPressGestureHandler>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  object: {
    width: 100,
    height: 100,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: "#4287f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
