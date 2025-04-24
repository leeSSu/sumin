// src/NicknameContext.js
import React, { createContext, useState } from 'react';

export const NicknameContext = createContext();

export function NicknameProvider({ children }) {
  const [nickname, setNickname] = useState('me');

  return (
    <NicknameContext.Provider value={{ nickname, setNickname }}>
      {children}
    </NicknameContext.Provider>
  );
}
