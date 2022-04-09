const {Task, User, model_have_tasks} = require('../models')
const { Op } = require('@sequelize/core')

const haveTask = (req, res, next) => {
    model_have_tasks.findOne({
        where: {
            [Op.and]: [
                {user_id: req.userId},
                {id: req.params.id},
            ]
        }
    }).then(result => {
        // console.log(result);
        if (result) {
            next()
            return
        }
        return res.status(401).send({
            msg: `Unauthorized!`
        })
    }).catch( err => {
        return res.status(500).send({
            msg: err
        })
    })
}

const ownAccount = (req, res, next) =>{
    if (req.userId != req.params.id) {
        return res.status(401).send({
            msg: `Unauthorized!`
        })
    }
    req.ownAccount = true
    next()
    return
}
                
const validateUserSignUp = async (req, res, next) => {
    const data = req.body
    await User.findOne({
        where: {email: data.email}
    }).then( async userCheckEmail => {
        if (userCheckEmail) {
            return res.status(400).send({
                msg: `Email has exists`
            })
        }
        await User.findOne({
            where: {username: data.username}
        }).then( async userCheckUsername => {
            if (userCheckUsername) {
                return res.status(400).send({
                    msg: `Username has exists`
                })
            }

            await User.findOne({
                where: {phone: data.phone}
            }).then( async userCheckUsername => {
                if (userCheckUsername) {
                    return res.status(400).send({
                        msg: `Phone has exists`
                    })
                }else{
                    return next()
                }
            }).catch( err => {
                return res.status(500).send({
                    msg: err
                })
            })
        }).catch( err => {
            return res.status(500).send({
                msg: err
            })
        })
    }).catch( err => {
        return res.status(500).send({
            msg: err
        })
    })
    
}

module.exports = {
    haveTask,
    ownAccount,
    validateUserSignUp
}