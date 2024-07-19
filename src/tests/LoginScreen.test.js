import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen'; // Adjust the import based on your file structure
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock the firebase authentication module
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText("Don't have an account? Create one")).toBeTruthy();
  });

  it('handles login success', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com' },
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Feeds', { username: 'test@example.com' });
    });
  });

  it('handles incorrect email error', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/user-not-found' });

    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('Incorrect email. Please try again.')).toBeTruthy();
    });
  });

  it('handles incorrect password error', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/wrong-password' });

    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('Incorrect password. Please try again.')).toBeTruthy();
    });
  });

  it('handles generic login error', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: 'Network error' });

    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByTestId('error-alert')).toBeTruthy();
      expect(getByText('Network error')).toBeTruthy();
    });
  });

  it('navigates to Register screen', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.press(getByText("Don't have an account? Create one"));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });
});
