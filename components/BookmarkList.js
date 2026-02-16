"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { deleteBookmark } from "@/app/bookmarks/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BookmarkList({ initialBookmarks, userId }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isDeleting, setIsDeleting] = useState(null);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    // Set up real-time subscription
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((bookmark) =>
                bookmark.id === payload.new.id ? payload.new : bookmark,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((bookmark) => bookmark.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  async function handleDelete(id) {
    setIsDeleting(id);
    try {
      await deleteBookmark(id);
      toast({
        title: "Bookmark deleted",
        description: "Your bookmark has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No bookmarks yet. Add your first bookmark to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{bookmark.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <a
                    href={bookmark.url}
                    className="text-blue-500 hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.url}
                  </a>
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(bookmark.id)}
                disabled={isDeleting === bookmark.id}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              Added {new Date(bookmark.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
