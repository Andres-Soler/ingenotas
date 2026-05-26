'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage() {

  const [email, setEmail] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setEmail(user.email || '')
    }
  }

  async function handleLogout() {

    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(error.message)
      return
    }

    alert('Sesión cerradanpm run dev')

    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-8 rounded-2xl w-80 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-center">
          Perfil
        </h1>

        <div className="bg-zinc-800 p-3 rounded">
          {email}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 p-3 rounded"
        >
          Cerrar sesión
        </button>

      </div>

    </div>
  )
}