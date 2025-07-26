import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const INTERVALS = {
  light: [0, 2, 7, 21, 45, 90, 180], // days
  standard: [0, 1, 3, 7, 14, 30, 90],
  intensive: [0, 0.5, 1, 2, 5, 10, 30],
};

const useSpacedRepetition = () => {


    const syncActiveTasks = async () => {

        try {
            // Get all AsyncStorage keys
            const keys = await AsyncStorage.getAllKeys();
            const taskKeys = keys.filter(key => key.startsWith('task_'));
            console.log(keys);
            
            if (taskKeys.length === 0) return;
            
            // Get all task data
            const taskData = await AsyncStorage.multiGet(taskKeys);
            const activeTasks = taskData.map(([key, value]) => ({
                taskId: key.replace('task_', ''),
                ...JSON.parse(value)
            }));
            
            // Get scheduled notifications
            const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

            console.log(scheduledNotifications);
            
            for (const task of activeTasks) {
                const expectedId = `task_${task.taskId}_${task.level}`;

                const hasScheduledNotification = scheduledNotifications.some(
                    notif => notif.identifier === expectedId
                );
                
                // If no notification scheduled but task is active, reschedule
                if (!hasScheduledNotification) {
                    const nextDate = new Date(task.nextDue);
                    if (nextDate > new Date()) {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Reminder",
                                body: "Don't forget your task!",
                                data: { taskId: task.taskId, level: task.level, mode: task.mode }
                            },
                            trigger: { date: nextDate },
                            identifier: expectedId
                        });
                    } else {
                        await Notifications.cancelScheduledNotificationAsync(expectedId);
                    }
                }
            }
            } catch (error) {
                console.error('Error syncing tasks:', error);
            }
    };


  const scheduleNext = async (mode = 'light') => {
    const intervals = INTERVALS[mode];
    const baseDate = new Date();
    
    for (let i = 1; i < intervals.length; i++) {
      const nextDate = new Date(baseDate);
      nextDate.setDate(baseDate.getDate() + intervals[i]);
      
      const randomId = Crypto.randomUUID();
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: `Day ${intervals[i]} reminder - Don't forget your task!`,
          data: { randomId, level: i, mode }
        },
        trigger: { date: nextDate },
        identifier: randomId
      });
      
      // Store each notification with the format you showed
      await AsyncStorage.setItem(`task_${randomId}`, JSON.stringify({
        level: i,
        mode,
        lastScheduled: new Date().toISOString(),
        nextDue: nextDate.toISOString(),
        taskId: randomId,
      }));
    }
  };


  // Get current status of a task
  const getTaskStatus = async (taskId) => {
    const stored = await AsyncStorage.getItem(`task_${taskId}`);
    return stored ? JSON.parse(stored) : null;
  };

  return {
    scheduleNext,
    getTaskStatus,
    intervals: INTERVALS,
    syncActiveTasks
  };
};

export default useSpacedRepetition;