import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Password" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {isSignUp ? 'or use your email for registration' : 'or use your account'}
          </Text>
          <View style={styles.socialLinks}>
            {/* Add social icons and links here */}
          </View>
          <TouchableOpacity style={styles.overlayButton} onPress={toggleForm}>
            <Text style={styles.overlayButtonText}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebecf0',
  },
  formContainer: {
    // Style for the form container
  },
  headerText: {
    // Style for the header text
  },
  input: {
    // Style for text input fields
  },
  button: {
    // Style for the sign-up or sign-in button
  },
  buttonText: {
    // Style for the button text
  },
  overlay: {
    // Style for the overlay container
  },
  overlayText: {
    // Style for the overlay text
  },
  socialLinks: {
    // Style for social links container
  },
  overlayButton: {
    // Style for the overlay button (Sign In or Sign Up)
  },
  overlayButtonText: {
    // Style for the overlay button text
  },
});
