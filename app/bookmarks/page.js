import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import BookmarkList from "@/components/BookmarkList";
import AddBookmarkForm from "@/components/AddBookmarkForm";

export default async function BookmarksPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const supabase = await createClient();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error);
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">My Bookmarks</h1>
        <p className="text-muted-foreground">
          Save and organize your favorite websites
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookmarkList initialBookmarks={bookmarks || []} userId={user.id} />
        </div>
        <div>
          <AddBookmarkForm />
        </div>
      </div>
    </div>
  );
}
