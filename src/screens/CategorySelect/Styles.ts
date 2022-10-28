import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface CategoryProps{
  isActive: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.blue};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

export const Category = styled(TouchableOpacity)<CategoryProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(15)}px;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.orange_light : theme.colors.background};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;
