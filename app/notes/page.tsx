'use client'

import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NotesPage() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [notes, setNotes] = useState<any[]>([])

  useEffect(() => {
    getNotes()
  }, [])

  async function getNotes() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setNotes(data)
  }

  async function createNote(
    e: FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user.id,
          title,
          content,
        },
      ])
      .select()

    if (error) {
      alert(error.message)
      return
    }

    setNotes([data[0], ...notes])

    setTitle('')
    setContent('')
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

      <h1 className="text-3xl font-bold mb-8">
        Mis Notas
      </h1>

      <form
        onSubmit={createNote}
        className="bg-zinc-900 p-6 rounded-2xl flex flex-col gap-4 mb-8"
      >

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-zinc-800 p-3 rounded-lg outline-none"
        />

        <textarea
          placeholder="Escribe una nota..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-zinc-800 p-3 rounded-lg outline-none min-h-32"
        />

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 p-3 rounded-lg"
        >
          Crear Nota
        </button>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {notes.map((note) => (

          <div
            key={note.id}
            className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"
          >

            <h2 className="text-xl font-bold mb-2">
              {note.title}
            </h2>

            <p className="text-zinc-400 mb-4">
              {note.content}
            </p>

            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Eliminar
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}