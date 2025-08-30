import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {signUpWithEmail} from '../../firebase/auth';
import {saveUser} from '../../storage/user';
import {useSnackbar} from '../../components/SnackbarProvider';
import {colors} from '../../colors';
import styles from '../../styles';
import {useAuth} from '../../contexts/AuthContext';

const SignupScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {showSnackbar} = useSnackbar();
  const {setIsLoggedIn} = useAuth();

  const handleSignup = async () => {
    if (!email || !password) {
      showSnackbar(t('email_password_required'), 'error');
      return;
    }
    try {
      const user = await signUpWithEmail(email, password);
      await saveUser({email: user.email, uid: user.uid});
      showSnackbar(t('signup_success'), 'success');
      setIsLoggedIn(true);
    } catch (error: any) {
      showSnackbar(error.message, 'error');
    }
  };

  return (
    <View style={styles.authContainer}>
      <Image
        source={require('../../../assets/logo1.png')}
        style={styles.authLogo}
      />
      <TextInput
        placeholder={t('email')}
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
        style={styles.authInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder={t('password')}
        placeholderTextColor={colors.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.authInput}
      />
      <TouchableOpacity
        style={[
          styles.authSignupButton,
          !email || !password
            ? styles.authSignupButtonDisabled
            : styles.authSignupButtonEnabled,
        ]}
        onPress={handleSignup}>
        <Text style={styles.authSignupButtonText}>{t('signup_button')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.authLoginText}>{t('go_to_login')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
