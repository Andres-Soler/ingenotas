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
  <div style={{ padding: "24px" }}>

    <h1
      style={{
        fontSize: "2rem",
        marginBottom: "24px",
      }}
    >
      Mis Notas
    </h1>

    <form
      onSubmit={createNote}
      className="keep-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "24px",
        maxWidth: "700px",
      }}
    >

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="keep-input"
      />

      <textarea
        placeholder="Escribe una nota..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="keep-input"
        style={{
          minHeight: "120px",
          resize: "vertical",
        }}
      />

      <button
        type="submit"
        className="keep-button"
      >
        Crear Nota
      </button>

    </form>

    <div className="notes-grid">

      {notes.map((note) => (

        <div
          key={note.id}
          className="note-card"
        >

          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {note.title}
          </h2>

          <p
            style={{
              marginBottom: "16px",
            }}
          >
            {note.content}
          </p>

          <button
            onClick={() => deleteNote(note.id)}
            className="keep-button"
          >
            Eliminar
          </button>

        </div>

      ))}

    </div>

  </div>
)
}