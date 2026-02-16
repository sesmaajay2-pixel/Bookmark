"use client";

import { createContext, useContext, useState, useCallback } from "react";

const BookmarksContext = createContext();

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const addBookmarkToList = useCallback((bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
  }, []);

  const removeBookmarkFromList = useCallback((id) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }, []);

  const setInitialBookmarks = useCallback((initialBookmarks) => {
    setBookmarks(initialBookmarks);
    setIsInitialized(true);
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmarkToList,
        removeBookmarkFromList,
        setInitialBookmarks,
        isInitialized,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarksProvider");
  }
  return context;
}
