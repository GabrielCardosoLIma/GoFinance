import React from "react";
import LottieView from "lottie-react-native";
import { Container } from './Styles';

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={require("../../assets/spinning-pie-chart.json")}
        loop
        autoPlay
        resizeMode="contain"
        style={{ height: 300 }}
      />
    </Container>
  );
}
