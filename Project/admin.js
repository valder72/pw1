const API = 'http://localhost:8000'

const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

if (!token || role !== ???) {
    window.location.href = ???
}

async function loadNews() {
    const res = await fetch(`${API}/news`)
    const news = await res.json()
    const list = document.getElementById('news-list')
    
    list.innerHTML = ''
    
    for (const item of news) {
        const div = document.createElement('div')
        div.className = 'card mb-3'
        div.innerHTML = `
            <div class="card-body d-flex justify-content-between">
                <h5>${item.title}</h5>
                <button class="btn btn-danger" data-id="${item.id}">
                    Видалити
                </button>
            </div>
        `
        list.append(div)
    }
    
    list.addEventListener('click', async (e) => {
        if (e.target.dataset.id) {
            await deleteNews(e.target.dataset.id)
        }
    })
}

async function deleteNews(id) {
    const res = await fetch(`${API}/news/${id}`, {
        method: DELETE,
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) loadNews()
}

// 4. Створити новину
document.getElementById('create-news-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('title', document.getElementById('title').value)
        formData.append('content', document.getElementById('content').value)
        formData.append('img', document.getElementById('image').files[0])
        
        const res = await fetch(`${API}/news`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: {title, con}
        })
        
        if (res.ok) {
            e.target.reset()
            loadNews()
        }
    })

loadNews()