'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export async function login(formData: FormData) {
  const supabase = createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/login?error=Invalid Credentials')
  }

  // CRITICAL: Revalidate and force redirect to ensure middleware sees the fresh cookie
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}