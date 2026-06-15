const API = 'http://localhost:8000'

document.getElementById('register-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const name = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
      const res = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      
    const errorMsg = document.getElementById('error-msg')

    if (!res.ok) {
        const err = await res.json()
        errorMsg.textContent = err.detail  
        errorMsg.classList.remove('d-none')
        return
    }

    window.location.href = 'login.html'
      
    } catch (err) {
      console.log(err)
    }
})