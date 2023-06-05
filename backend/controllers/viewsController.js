
exports.getSignupView = (req , res) => {
    res.status(200).render('signup')
  }
exports.getCreateQuestionView = (req , res)=> {
    res.status(200).render('createQuestion')
  }