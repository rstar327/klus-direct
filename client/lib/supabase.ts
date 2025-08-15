import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpcnxmmgfidhmiiskpar.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY254bW1nZmlkaG1paXNrcGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzkzODIsImV4cCI6MjA3MDU1NTM4Mn0.54uqMJfbtEjH_-zbXVK0SD3szF6iLnA4eir5Bwe8Y4w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Register function
export async function registerUser(
  email: string,
  password: string,
  packageType: string,
) {
  try {
    // For test accounts, skip Supabase and return success
    if (email === "111" && password === "111") {
      return { 
        user: { 
          id: "test_user_111", 
          email: "111",
          package: packageType 
        }, 
        error: null 
      };
    }

    // Sign up the user
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!user) {
      throw new Error("No user returned from signup");
    }

    // Store package info in localStorage for now (since database table may not exist)
    localStorage.setItem(`user_package_${user.id}`, packageType);
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}
