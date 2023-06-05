const form = document.querySelector('.login-form')
const success = document.querySelectorAll('.hidden')

const createQuestion = (async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://codemedaddy.gr/api/v1/questions',
            data: body,
            withCredentials: true,
        })
        if (res.data.status === 'success')  {
            form.style.display = 'none'
            success.forEach((el)=> el.style.display = 'block') 
        }
    }
    catch (err) {
        showAlert('error', err.response.data.message);
    }
})

document.querySelector('.form').addEventListener('submit', (e) => {
    
    e.preventDefault()
    
    const content = document.getElementById('content').value.toLowerCase()
    const category = document.getElementById('category').value.toLowerCase()
    const difficulty= document.getElementById('difficulty').value.toLowerCase()
    const answers = [
        document.getElementById('answer1').value.toLowerCase(),
        document.getElementById('answer2').value.toLowerCase(),
        document.getElementById('answer3').value.toLowerCase(),
        document.getElementById('answer4').value.toLowerCase(),
    ]
    const correctAnswer = parseInt(document.getElementById('correctAnswer').value)
    const body = {
        content,
        category,
        difficulty,
        answers,
        correctAnswer
    }
    createQuestion(body)
})