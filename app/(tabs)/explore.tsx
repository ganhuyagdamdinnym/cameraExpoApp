// import React, { useState, useRef, createRef } from "react";
// import { View, Text, Image, Animated, Dimensions } from "react-native";
// import { test } from "@/assets/images/test";
// import {
//   PanGestureHandler,
//   PinchGestureHandler,
//   PinchGestureHandlerGestureEvent,
//   State,
// } from "react-native-gesture-handler";

// const Explore = () => {
//   const [panEnabled, setPanEnabled] = useState(false);
//   const scale = useRef(new Animated.Value(1)).current;
//   const translateX = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(0)).current;

//   const pinchRef = createRef();
//   const panRef = createRef();

//   const onPinchEvent = Animated.event(
//     [
//       {
//         nativeEvent: { scale },
//       },
//     ],
//     { useNativeDriver: true }
//   );

//   const onPanEvent = Animated.event(
//     [
//       {
//         nativeEvent: {
//           translationX: translateX,
//           translationY: translateY,
//         },
//       },
//     ],
//     { useNativeDriver: true }
//   );

//   const handlePinchStateChange = (event: PinchGestureHandlerGestureEvent) => {
//     const { nativeEvent } = event;

//     if (nativeEvent.state === State.ACTIVE) {
//       setPanEnabled(true);
//     }

//     const nScale = nativeEvent.scale;
//     if (nativeEvent.state === State.END) {
//       if (nScale < 1) {
//         Animated.spring(scale, {
//           toValue: 1,
//           useNativeDriver: true,
//         }).start();
//         Animated.spring(translateX, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();

//         setPanEnabled(false);
//       }
//     }
//   };

//   return (
//     <View>
//       <PanGestureHandler
//         onGestureEvent={onPanEvent}
//         ref={panRef}
//         simultaneousHandlers={[pinchRef]}
//         enabled={panEnabled}
//         failOffsetX={[-1000, 1000]}
//         shouldCancelWhenOutside
//       >
//         <Animated.View>
//           <PinchGestureHandler
//             ref={pinchRef}
//             onGestureEvent={onPinchEvent}
//             simultaneousHandlers={[panRef]}
//             onHandlerStateChange={handlePinchStateChange}
//           >
//             <Animated.Image
//               source={require("@/assets/images/random.png")}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 transform: [{ scale }, { translateX }, { translateY }],
//               }}
//               resizeMode="contain"
//             />
//           </PinchGestureHandler>
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// };

// export default Explore;
