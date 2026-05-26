'use client'

import { useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert('Usuario registrado')
    console.log(data)
  }

  return (
  <div className="hero">

    <form
      onSubmit={handleRegister}
      className="keep-card"
      style={{
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >

      <h1>Crear cuenta</h1>

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
        Registrarse
      </button>

    </form>

  </div>
)
}