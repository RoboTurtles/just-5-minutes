import { CalendarBody, CalendarContainer, CalendarHeader, DeepPartial, ThemeConfigs } from '@howljs/calendar-kit';
import React, { useMemo } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Habit = {
  title: string;
  startTime?: string;
  endTime?: string;
};

const DEFAULT_EVENT_DATE = '2025-10-26';
const DEFAULT_TIMEZONE_OFFSET = '-04:00';
const DEFAULT_EVENT_COLOR = '#f47d42ff';

const normalizeTime = (time?: string) => {
  if (!time) return '00:00:00';
  return /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
};

const Calendar = ({ habits = [] }: { habits?: Habit[] }) => {
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
        borderWidth: 1,
        borderColor: highlight,
        backgroundColor:
          colorScheme === 'dark' ? 'rgba(10, 56, 86, 0.32)' : 'rgba(2, 48, 71, 0.18)',
        padding: 8,
      },
      eventTitleStyle: {
        fontSize: 13,
        fontWeight: '700',
      },
      nowIndicatorColor: highlight,
    };
  }, [colorScheme, palette]);

  const events = useMemo(
    () =>
      habits.map((habit, index) => {
        const title = habit.title ?? 'Untitled Habit';
        const slug = title.toLowerCase().replace(/\s+/g, '-') || `habit-${index}`;
        const startTime = normalizeTime(habit.startTime);
        const endTime = normalizeTime(habit.endTime ?? habit.startTime);

        return {
          id: `${slug}-${startTime}-${index}`,
          title,
          start: { dateTime: `${DEFAULT_EVENT_DATE}T${startTime}${DEFAULT_TIMEZONE_OFFSET}` },
          end: { dateTime: `${DEFAULT_EVENT_DATE}T${endTime}${DEFAULT_TIMEZONE_OFFSET}` },
          color: DEFAULT_EVENT_COLOR,
        };
      }),
    [habits],
  );

  return (
    <CalendarContainer theme={calendarTheme} numberOfDays={1} events={events}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarContainer>
  );
};

export default Calendar;