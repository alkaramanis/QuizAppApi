
const signup = (async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://codemedaddy.gr/api/v1/users/signup',
            data: body,
            withCredentials: true,
        })
        if (res.data.status === 'success')  {
            location.assign('/createQuestion');
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
})

document.querySelector('.form').addEventListener('submit', (e) => {
    
    e.preventDefault()
    
    const name = document.getElementById('name').value.toLowerCase()
    const email = document.getElementById('email').value.toLowerCase()
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
        
    const body = {
        name,
        email,
        password,
        passwordConfirm,
    }
    signup(body)
})