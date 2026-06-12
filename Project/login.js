const API = 'http://localhost:8000'

document.getElementById('login-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!res.ok) {
        const err = await res.json()
        console.log(err)
        return
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      window.location.href = 'index.html'
      
    } catch (err) {
      console.log(err)
    }
})