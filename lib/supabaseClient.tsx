import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hmieioveuzwqiucafuta.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtaWVpb3ZldXp3cWl1Y2FmdXRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTc0NDk1OSwiZXhwIjoyMDk1MzIwOTU5fQ.zprdQN9tC-vZu_-5dS-1dchYJLjyzO8GP7QnI6uHXfg'
export const supabase = createClient(supabaseUrl, supabaseKey);