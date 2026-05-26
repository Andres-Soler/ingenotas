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
  <div className="p-8">

    <h1
      style={{
        fontSize: "2rem",
        marginBottom: "24px",
      }}
    >
      Panel Admin
    </h1>

    <div
      style={{
        marginBottom: "24px",
      }}
    >
      <div className="stat-card">
        <h2>Total Notas</h2>

        <p>{notes.length}</p>
      </div>
    </div>

    {loading ? (

      <p>Cargando...</p>

    ) : (

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >

        {notes.map((note) => (

          <div
            key={note.id}
            className="note-card"
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >

              <div>

                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {note.title}
                </h2>

                <p
                  style={{
                    marginTop: "8px",
                  }}
                >
                  {note.content}
                </p>

              </div>

              <button
                onClick={() => deleteNote(note.id)}
                className="keep-button"
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