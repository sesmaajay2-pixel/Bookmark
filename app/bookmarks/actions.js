"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/app/auth/actions";

export async function addBookmark(formData) {
  const user = await getUser();

  if (!user) {
    throw new Error("You must be logged in to add a bookmark");
  }

  const url = formData.get("url");
  const title = formData.get("title");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      url,
      title,
    })
    .select();

  if (error) {
    console.error("Error adding bookmark:", error);
    throw new Error(`Failed to add bookmark: ${error.message}`);
  }

  revalidatePath("/bookmarks");
  return { success: true, bookmark: data[0] };
}

export async function deleteBookmark(id) {
  const user = await getUser();

  if (!user) {
    throw new Error("You must be logged in to delete a bookmark");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting bookmark:", error);
    throw new Error(`Failed to delete bookmark: ${error.message}`);
  }

  revalidatePath("/bookmarks");
  return { success: true };
}
