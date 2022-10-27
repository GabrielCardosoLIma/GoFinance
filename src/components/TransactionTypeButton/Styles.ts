import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

interface IconProps {
  isActive: boolean;
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px 36px;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ type, isActive }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.green_light};
    `}
  ${({ type, isActive }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.red_light};
    `}
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'up' ? theme.colors.green : theme.colors.red};
  margin-right: 12px;
  ${({ type, isActive }) =>
    !isActive &&
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.green_light};
    `}
  ${({ type, isActive }) =>
    !isActive &&
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.red_light};
    `}
`;
