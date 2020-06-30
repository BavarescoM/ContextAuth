import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth';

// import { Container } from './styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const SignIn: React.FC = () => {
  const {signed, signIn, user} = useAuth();
  console.log(signed);
  console.log(user);

  function handleSignIn() {
    signIn();
  }
  return (
    <View style={styles.container}>
      <Button title="SignIn" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
