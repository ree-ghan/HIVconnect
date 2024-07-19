import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../RegisterScreen'; // Adjust the import based on your file structure
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Mock the firebase authentication module
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  doc: jest.fn(() => 'mockDoc'),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('RegisterScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
    expect(getByText('Already have an account? Log in')).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Username').props.value).toBe('testuser');
    expect(getByPlaceholderText('Password').props.value).toBe('password123');
    expect(getByPlaceholderText('Confirm Password').props.value).toBe('password123');
  });

  it('handles password mismatch error', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password321');
    fireEvent.press(getByText('Register'));

    waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('Passwords do not match')).toBeTruthy();
    });
  });

  it('handles successful registration', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });

    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(updateProfile).toHaveBeenCalledWith({ displayName: 'testuser' });
      expect(setDoc).toHaveBeenCalledWith(doc(db, 'users', '123'), {
        username: 'testuser',
        userId: '123',
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('ProfileSetup');
    });
  });

  it('handles email already in use error', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });

    const { getByPlaceholderText, getByText, getByTestId } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('That email address is already in use!')).toBeTruthy();
    });
  });

  it('handles invalid email error', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/invalid-email' });

    const { getByPlaceholderText, getByText, getByTestId } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('That email address is invalid!')).toBeTruthy();
    });
  });

  it('navigates to Login screen', () => {
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('Already have an account? Log in'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});
