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
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-8 bg-zinc-900 rounded-2xl w-80"
      >
        <h1 className="text-2xl font-bold text-center">
          Crear cuenta
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 p-3 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}