"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, Zap, Lock, Chrome, Plus, Settings } from "lucide-react";
import { signInWithGoogle } from "@/app/auth/actions";
import { getUser } from "@/app/auth/actions";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <Bookmark className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Smart Bookmark Manager
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Save and organize your favorite websites with real-time
            synchronization across all your devices.
          </p>
          {user ? (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/bookmarks">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Bookmarks
                </Button>
              </Link>
              <Link href="/bookmarks">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Manage Bookmarks
                </Button>
              </Link>
            </div>
          ) : (
            <form action={signInWithGoogle}>
              <Button size="lg" className="text-lg px-8 py-6">
                <Chrome className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Smart Bookmarks?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Real-Time Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your bookmarks update instantly across all tabs and devices.
                  Add a bookmark in one tab, see it everywhere.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Private & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your bookmarks are completely private. Only you can see and
                  manage your saved websites.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Chrome className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Google Sign-In</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick and secure authentication with your Google account. No
                  passwords to remember.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          {user ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-muted-foreground mb-8">
                Start managing your bookmarks. Add new bookmarks or browse your
                existing collection.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/bookmarks">
                  <Button size="lg" className="text-lg px-8 py-6">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Bookmark
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6"
                  >
                    <Bookmark className="mr-2 h-5 w-5" />
                    View All Bookmarks
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8">
                Sign in with Google and start organizing your bookmarks today.
              </p>
              <form action={signInWithGoogle}>
                <Button size="lg" className="text-lg px-8 py-6">
                  <Chrome className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
