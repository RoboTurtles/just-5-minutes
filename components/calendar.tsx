import { CalendarBody, CalendarContainer, CalendarHeader, DeepPartial, ThemeConfigs } from '@howljs/calendar-kit';
import React, { useMemo } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View } from 'react-native';

type Habit = {
  title: string;
  startTime?: string;
  endTime?: string;
  color?: string;
};

const DEFAULT_EVENT_DATE = '2025-10-26';
const DEFAULT_TIMEZONE_OFFSET = '-04:00';
const DEFAULT_EVENT_COLOR = '#FF8A00';
const DUMMY_EVENT_COLOR = '#ADD8E6';

const DUMMY_TASKS: Array<Required<Pick<Habit, 'title' | 'startTime' | 'endTime'>> & { color: string }> = [
  { title: 'Sleep', startTime: '00:00', endTime: '06:30', color: DUMMY_EVENT_COLOR },
  { title: 'Morning Stretch', startTime: '07:00', endTime: '07:30', color: DUMMY_EVENT_COLOR },
  { title: 'Daily Standup', startTime: '08:00', endTime: '08:30', color: DUMMY_EVENT_COLOR },
  { title: 'Lunch Break', startTime: '12:00', endTime: '12:45', color: DUMMY_EVENT_COLOR },
  { title: 'Client Meeting', startTime: '13:30', endTime: '14:30', color: DUMMY_EVENT_COLOR },
  { title: 'Evening Wind Down', startTime: '21:00', endTime: '22:00', color: DUMMY_EVENT_COLOR },
];

const normalizeTime = (time?: string) => {
  if (!time) return '00:00:00';
  return /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
};

const Calendar = ({ habits = [], onInteractStart, onInteractEnd }: { habits?: Habit[], onInteractStart?: () => void, onInteractEnd: () => void }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const calendarTheme = useMemo<DeepPartial<ThemeConfigs>>(() => {
    const border = colorScheme === 'dark' ? 'rgba(236, 238, 238, 0.12)' : 'rgba(17, 24, 28, 0.08)';
    const surface = colorScheme === 'dark' ? '#1F2023' : '#F8F8F9';
    const highlight = colorScheme === 'dark' ? '#0A3856' : '#023047';

    return {
      colors: {
        primary: highlight,
        onPrimary: colorScheme === 'dark' ? '#151718' : '#FFFFFF',
        background: palette.background,
        onBackground: palette.text,
        border,
        text: palette.text,
        surface,
        onSurface: colorScheme === 'dark' ? '#D7D9DC' : palette.icon,
      },
      textStyle: {
        fontFamily: 'System',
      },
      hourBackgroundColor: surface,
      hourTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        color: palette.icon,
      },
      hourBorderColor: border,
      headerBackgroundColor: surface,
      headerBorderColor: border,
      dayBarContainer: {
        borderBottomWidth: 0,
        paddingHorizontal: 0,
      },
      dayBarBorderColor: border,
      dayContainer: {
        paddingVertical: 8,
        alignItems: 'center',
      },
      dayNumberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 36,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 12,
      },
      dayNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: palette.text,
      },
      todayNumberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 36,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: highlight,
      },
      todayNumber: {
        color: colorScheme === 'dark' ? '#EAF4FB' : '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
      },
      allDayEventsContainer: {
        backgroundColor: surface,
        borderTopWidth: 1,
        borderColor: border,
      },
      eventContainerStyle: {
        borderRadius: 12,
        borderWidth: 0,
        padding: 8,
      },
      eventTitleStyle: {
        fontSize: 13,
        fontWeight: '700',
        color: palette.text,
      },
      nowIndicatorColor: highlight,
    };
  }, [colorScheme, palette]);

  const combinedHabits = useMemo(() => [...habits, ...DUMMY_TASKS], [habits]);

  const events = useMemo(
    () =>
      combinedHabits.map((habit, index) => {
        const title = habit.title ?? 'Untitled Habit';
        const slug = title.toLowerCase().replace(/\s+/g, '-') || `habit-${index}`;
        const startTime = normalizeTime(habit.startTime);
        const endTime = normalizeTime(habit.endTime ?? habit.startTime);
        const color = habit.color ?? DEFAULT_EVENT_COLOR;

        return {
          id: `${slug}-${startTime}-${index}`,
          title,
          start: { dateTime: `${DEFAULT_EVENT_DATE}T${startTime}${DEFAULT_TIMEZONE_OFFSET}` },
          end: { dateTime: `${DEFAULT_EVENT_DATE}T${endTime}${DEFAULT_TIMEZONE_OFFSET}` },
          color,
        };
      }),
    [combinedHabits],
  );

  return (
    <View style={{ flex: 1, minHeight: '100%' }} onTouchStart={onInteractStart} onTouchEnd={onInteractEnd} onTouchCancel={onInteractEnd}>
      <CalendarContainer theme={calendarTheme} numberOfDays={1} events={events}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
    </View>
  )
};

export default Calendar;