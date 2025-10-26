import React, { createContext, useContext, useState } from 'react';

type Task = { title: string; description: string };
type UserData = { taskList: Task[], mostRecentCompletionDateTime: Date | null, streakDuration: Number }

type UserDataContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const defaultUserData: UserData = {
  taskList: [
    {"title": "find a job", "description": "i need a job"},
    {"title": "do calc homework", "description": "focus on studying derivatives"}
  ],
  mostRecentCompletionDateTime: null,
  streakDuration: 0
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }:  { children: React.ReactNode }) {
  const [userData, setUserData] = useState(defaultUserData);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) throw new Error('useUserDataContext must be used within a UserDataProvider');
  return context;
}