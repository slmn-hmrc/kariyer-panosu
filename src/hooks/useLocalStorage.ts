/**
 * useLocalStorage.ts — LocalStorage ile senkron state kancası
 *
 * Yönergede belirtildiği gibi veriler tarayıcının LocalStorage'ında saklanır.
 * State her değiştiğinde otomatik olarak diske yazılır; sayfa yenilendiğinde
 * veri kaybolmaz.
 */

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      // Bozuk JSON veya erişim hatası durumunda başlangıç değerine dön.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage yazma hatası:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
