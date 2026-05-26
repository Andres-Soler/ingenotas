'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage() {

  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || profile.role !== 'admin') {
      window.location.href = '/'
      return
    }

    getNotes()
  }

  async function getNotes() {

    const { data, error } = await supabase
      .from('notes')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    setNotes(data)
    setLoading(false)
  }

  async function deleteNote(id: string) {

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl font-bold mb-6">
        Panel Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-zinc-400">
            Total Notas
          </h2>

          <p className="text-3xl font-bold">
            {notes.length}
          </p>
        </div>

      </div>

      {loading ? (

        <p>Cargando...</p>

      ) : (

        <div className="flex flex-col gap-4">

          {notes.map((note) => (

            <div
              key={note.id}
              className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold">
                    {note.title}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {note.content}
                  </p>

                </div>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}