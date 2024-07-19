import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AlarmClock from './AlarmClock';  // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
}));

describe('AlarmClock Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering and Initial State Tests
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AlarmClock />);
    
    expect(getByText('Medication Reminder')).toBeTruthy();
    expect(getByPlaceholderText('Hour (1-12)')).toBeTruthy();
    expect(getByPlaceholderText('Minute (0-59)')).toBeTruthy();
    expect(getByPlaceholderText('AM / PM')).toBeTruthy();
    expect(getByText('No reminder set')).toBeTruthy();
    expect(getByText('Set Reminder')).toBeTruthy();
    expect(getByText('Turn Off')).toBeTruthy();
  });

  it('initial state is correct', () => {
    const { getByPlaceholderText, getByText } = render(<AlarmClock />);
    
    expect(getByPlaceholderText('Hour (1-12)').props.value).toBe('');
    expect(getByPlaceholderText('Minute (0-59)').props.value).toBe('');
    expect(getByPlaceholderText('AM / PM').props.value).toBe('');
    expect(getByText('No reminder set')).toBeTruthy();
  });

  // Validation Function Tests
  describe('Validation Function', () => {
    it('shows alert for missing input', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(getByText('Missing Input')).toBeTruthy();
      });
    });

    it('shows alert for non-numeric hour and minute', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), 'a');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), 'b');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(getByText('Invalid Input')).toBeTruthy();
      });
    });

    it('shows alert for out-of-range hour and minute', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '13');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '60');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(getByText('Invalid Input')).toBeTruthy();
      });
    });

    it('shows alert for incorrect AM/PM input', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '10');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'xyz');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(getByText('Invalid Input')).toBeTruthy();
      });
    });
  });

  // Notification Scheduling Tests
  describe('Notification Scheduling', () => {
    it('schedules notification correctly', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '10');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
        expect(getByText('Reminder set successfully!')).toBeTruthy();
        expect(getByText('10:30 AM')).toBeTruthy();
      });
    });

    it('does not schedule notification if one already exists', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);
      
      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '10');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(getByText('Turn off the existing reminders before setting a new one.')).toBeTruthy();
      });
    });
  });

  // Turn Off Notification Tests
  describe('Turn Off Notification', () => {
    it('turns off notification correctly', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);

      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '10');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        fireEvent.press(getByText('Turn Off'));
      });

      await waitFor(() => {
        expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalled();
        expect(getByText('Reminder turned off successfully!')).toBeTruthy();
        expect(getByText('No alarm set')).toBeTruthy();
      });
    });

    it('shows error when turning off non-existent notification', async () => {
      const { getByText } = render(<AlarmClock />);

      await act(async () => {
        fireEvent.press(getByText('Turn Off'));
      });

      await waitFor(() => {
        expect(getByText('No alarm to turn off.')).toBeTruthy();
      });
    });
  });

  // Storage Functionality Tests
  describe('Storage Functionality', () => {
    it('stores notification ID correctly', async () => {
      const { getByText, getByPlaceholderText } = render(<AlarmClock />);

      fireEvent.changeText(getByPlaceholderText('Hour (1-12)'), '10');
      fireEvent.changeText(getByPlaceholderText('Minute (0-59)'), '30');
      fireEvent.changeText(getByPlaceholderText('AM / PM'), 'am');

      await act(async () => {
        fireEvent.press(getByText('Set Reminder'));
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith("currentAlarmId", expect.any(String));
      });
    });

    it('retrieves stored notification ID correctly', async () => {
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify("mockNotificationId"));

      const { getByText } = render(<AlarmClock />);

      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith("currentAlarmId");
        expect(getByText('Reminder set')).toBeTruthy();
      });
    });

    it('handles storage retrieval error correctly', async () => {
      AsyncStorage.getItem.mockRejectedValueOnce(new Error("Failed to retrieve data"));

      const { getByText } = render(<AlarmClock />);

      await waitFor(() => {
        expect(getByText('Error')).toBeTruthy();
        expect(getByText('Failed to retrieve data')).toBeTruthy();
      });
    });
  });
});
