'use client'

import { useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    alert('Login exitoso')
    console.log(data)
  }

  return (
  <div className="hero">
    <form
      onSubmit={handleLogin}
      className="keep-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <h1>Iniciar sesión</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="keep-input"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="keep-input"
      />

      <button
        type="submit"
        className="keep-button"
      >
        Entrar
      </button>
    </form>
  </div>
)
}