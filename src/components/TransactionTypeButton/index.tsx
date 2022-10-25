import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './Styles';

interface Props extends TouchableOpacityProps{
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

const Icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({type, title, isActive, ...rest}: Props) {
    return (
      <Container isActive={isActive} type={type} {...rest}>
        <Icon 
          name={Icons[type]}
          type={type}
        />
        <Title>{title}</Title>
      </Container>
    )
  }