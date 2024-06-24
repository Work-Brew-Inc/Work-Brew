const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://miprhwyoxnrkecaibuff.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcHJod3lveG5ya2VjYWlidWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MjMzNTAsImV4cCI6MjAzNDM5OTM1MH0.lKiqY41KI2tMfWOSmoYgjI4cZ64yrpgk7gqPQvOGQFU';
const supabase = createClient(supabaseUrl, supabaseKey);
supabase
  .from('coffee_shop')
  .select('*')
  .then((response) => {
    if (response.error) {
      console.error('Error connecting to Supabase:', response.error);
    } else {
      console.log('Connected to Supabase');
    }
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
  });

module.exports = supabase;
