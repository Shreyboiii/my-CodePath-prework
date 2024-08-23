import { createClient } from '@supabase/supabase-js';

const URL = 'https://suocxzzcimovvknfwwwa.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1b2N4enpjaW1vdnZrbmZ3d3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MjkwNzYsImV4cCI6MjAzNDUwNTA3Nn0.73P0b2gXWTKeaqeKQhFvB80jFmDw5tVn59t6xbz0nDA';

export const supabase = createClient(URL, API_KEY); 