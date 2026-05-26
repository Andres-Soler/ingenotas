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
  <div className="hero">

    <div
      className="keep-card"
      style={{
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >

      <h1>Perfil</h1>

      <div
        className="keep-input"
        style={{
          cursor: "default",
        }}
      >
        {email}
      </div>

      <button
        onClick={handleLogout}
        className="keep-button"
      >
        Cerrar sesión
      </button>

    </div>

  </div>
)
}