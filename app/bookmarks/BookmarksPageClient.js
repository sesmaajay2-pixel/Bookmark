"use client";

import { BookmarksProvider } from "@/contexts/BookmarksContext";
import BookmarkList from "@/components/BookmarkList";
import AddBookmarkForm from "@/components/AddBookmarkForm";

export default function BookmarksPageClient({ initialBookmarks, userId }) {
  return (
    <BookmarksProvider>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            My Bookmarks
          </h1>
          <p className="text-muted-foreground">
            Save and organize your favorite websites
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookmarkList initialBookmarks={initialBookmarks} userId={userId} />
          </div>
          <div>
            <AddBookmarkForm />
          </div>
        </div>
      </div>
    </BookmarksProvider>
  );
}
