import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSignInTab, setIsSignInTab] = useState(true);
  const [institute, setInstitute] = useState('');
  const [instituteError, setInstituteError] = useState('');





  //Email Validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
    setEmail(value);
    validateForm(value, password, rememberMe, institute);
  };

  //Password Validation
  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
    setPassword(value);
    validateForm(email, value, rememberMe, institute);
  };

  //Institute validation
  const validateInstitute = (value) => {
    if (!value.trim()) {
      setInstituteError('Institute/Organization is required');
    } else {
      setInstituteError('');
    }
    setInstitute(value);
    validateForm(email, password, value, rememberMe);
  };

  //Form Validation
  const validateForm = (emailVal, passwordVal, rememberMeVal, instituteVal) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    const passwordValid = passwordVal.length >= 6;
    const instituteValid = !isSignInTab || (instituteVal.trim().length > 0);
    setIsFormValid(emailValid && passwordValid && (isSignInTab ? true : instituteValid));
  };




  const handleSignIn = () => {
    if (isFormValid) {
      console.log('Sign In:', { email, password });
      navigation.navigate('WelcomePage');
      setEmail('');
      setPassword('');
    } else {
      console.log('Form is invalid');
    }
  };




  const handleSignUp = () => {
    if (isFormValid) {
      console.log("Signing up with:", { email, password, institute });
      navigation.navigate('WelcomePage')
      setEmail('');
      setPassword('');
      setInstitute('');
    } else {
      console.log('Sign Up form is invalid');
    }
  };


  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
    validateForm(email, password, !rememberMe, institute);
  };


  //Facebook Login
  const handleFacebookLogin = () => {
    const facebookLoginUrl = "https://www.facebook.com/login";
    Linking.openURL(facebookLoginUrl)
      .catch((err) => {
        console.error("Failed to open URL:", err);
        Alert.alert("Error", "Unable to open facebook ")
      });
  };

  //Google Signin
  const handleGoogleLogin = () => {
    const googleLoginUrl = "https://accounts.google.com/signin";
    Linking.openURL(googleLoginUrl)
        .catch((err) => {
            console.error("Failed to open URL:", err);
            Alert.alert("Error", "Unable to open Google Sign-In.");
        });
};

//Github Signin
const handleGithubLogin = ()=>{
  const googleLoginUrl = "https://github.com/login";
  Linking.openURL(googleLoginUrl).catch((err)=>{
    console.error("Failed to open URL:", err);
    Alert.alert("Error", "Unable to open Github Sign-In.");
  })
}

 //Linkedin Login
 const handleLinkedinLogin = () => {
  const linkedinLoginUrl = "https://www.linkedin.com/login";
  Linking.openURL(linkedinLoginUrl).catch((err) => {
    console.error("Failed to open URL:", err);
    Alert.alert("Error", "Unable to open Linkedin Sign-In.");
  })
}



  return (
    <View style={styles.container}>
     {isSignInTab ?
        <Text style={styles.title}>Please Login To Continue</Text> :
        <Text style={styles.title}>Signup</Text>
      }
      {/* Sign In / Sign Up Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, isSignInTab && styles.activeTab]}
          onPress={() => setIsSignInTab(true)}
        >
          <Text style={styles.tabText}>Sign In</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, !isSignInTab && styles.activeTab]}
          onPress={() => setIsSignInTab(false)}
        >
          <Text style={styles.tabText}>Sign Up</Text>
        </Pressable>
      </View>



      {/* Input Fields with Icons */}
      <View style={styles.inputContainer}>
        {isSignInTab ? <FontAwesome name="user" size={20} color="#888" style={styles.inputIcon} /> : <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />}

        <TextInput
          style={styles.inputWithIcon}
          placeholder={isSignInTab ? 'Username or email' : 'E-mail'}
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Password"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {!isSignInTab && (
        <View style={styles.inputContainer}>
          <FontAwesome name="building" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Institutes/Organizations"
            value={institute}
            onChangeText={validateInstitute}
          />
        </View>
      )}
      {instituteError ? <Text style={styles.errorText}>{instituteError}</Text> : null}

      {/* Remember Me and Forgot Password */}
      {isSignInTab && (
        <View style={styles.row}>
          <View style={styles.rememberMeContainer}>
            <Pressable
              onPress={toggleRememberMe}
              style={[styles.customCheckbox, rememberMe && styles.checkedCheckbox]}
            >
              {rememberMe && <FontAwesome name="check" size={18} color="#fff" />}
            </Pressable>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <Pressable >
            <Text style={styles.forgotPassword}>Forgot password</Text>
          </Pressable>
        </View>
      )}



      {/* Sign In Button */}
      <Pressable
        style={[styles.signInButton, !isFormValid && { backgroundColor: '#ccc' }]}
        onPress={isSignInTab ? handleSignIn : handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.signInText}>{isSignInTab ? 'Sign In' : 'Sign Up'}</Text>
      </Pressable>






      {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>


      {/* Social Media Buttons */}
      <View style={styles.socialButtons}>
        <View style={styles.socialButtonWrapper}>
          <Pressable style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleLogin}>
            <View style={styles.leftSection}>
              <FontAwesome name="google" size={24} color="white" />
              <View style={styles.verticalDivider} />
            </View>
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
        </View>
        <View style={styles.socialButtonWrapper}>
          <Pressable style={[styles.socialButton, styles.facebookButton]} onPress={handleFacebookLogin}>
            <View style={styles.leftSection}>
              <FontAwesome name="facebook" size={24} color="white" />
              <View style={styles.verticalDivider} />
            </View>
            <Text style={styles.socialText}>Facebook</Text>
          </Pressable>
        </View>
        <View style={styles.socialButtonWrapper}>
          <Pressable style={[styles.socialButton, styles.linkedinButton]} onPress={handleLinkedinLogin}>
            <View style={styles.leftSection}>
              <FontAwesome name="linkedin" size={24} color="white" />
              <View style={styles.verticalDivider} />
            </View>
            <Text style={styles.socialText}>LinkedIn</Text>
          </Pressable>
        </View>
        <View style={styles.socialButtonWrapper}>
          <Pressable style={[styles.socialButton, styles.githubButton]} onPress={handleGithubLogin}>
            <View style={styles.leftSection}>
              <FontAwesome name="github" size={24} color="white" />
              <View style={styles.verticalDivider} />
            </View>
            <Text style={styles.socialText}>GitHub</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 80,
    fontWeight: '700'
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderColor: '#008000',
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500'
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#1c8bff',
  },
  rememberMeText: {
    fontSize: 14,
    fontWeight: '500'
  },
  signInButton: {
    backgroundColor: '#008000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButtonWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#000',
    marginLeft: 10,
    alignSelf: 'stretch',
  },
  socialText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    paddingLeft: 30,
    fontSize: 15,
    fontWeight: '500',
    color: '#000'
  },
  horizontalLine: {
    borderWidth: 2,
    borderColor: '#000'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});

export default LoginScreen;
