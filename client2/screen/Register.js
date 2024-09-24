import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosInstance';
import { errorLogger } from '../utils';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username cannot be less than 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
      'Password must contain at least one letter, one number, and one special character'
    ),
});
const Register = ({ navigation }) => {
  const [formErrors, setformErrors] = useState({});

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setformErrors({});
    try {
      const response = await axiosInstance.post('/auth/register', values);
      navigation.navigate('Login');
    } catch (error) {
      errorLogger(error);
      setformErrors(error.response.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          setFieldError(key, error.response.data[key]);
        });
      } else {
        setFieldError('general', 'An error occurred during registration');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Username"
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              {errors.general && (
                <Text style={styles.errorText}>{errors.general}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
            <View style={styles.homeLinkContainer}>
              <Text>Already have an account?</Text>
              <Text
                style={styles.homeLink}
                onPress={() => navigation.navigate('Login')}
              >
                Login.
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: 'red' }}>{formErrors.error}</Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  homeLinkContainer: {
    marginTop: 10,
    textAlign: 'left',
  },
  homeLink: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
