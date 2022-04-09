const {User, Task} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (dataQuery, page, limit) => {
    const { count: totalItems, rows: data } = dataQuery;
    const active = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, active };
};

const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        const data = await User.create(req.body)
        return res.status(201).json({
            msg: "success sign up",
            data: {
                id: data.id,
                name: data.name,
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

}

const signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email}
        })  
            .then(user => {
                if (user) {
                    let checkPassword = bcrypt.compareSync(req.body.password, user.password)

                    if (!checkPassword) {
                        return res.status(401).json({
                            msg: "invalid password"
                        })
                    }

                    // create token jwt

                    let key = jwt.sign({id: user.id}, process.env.JWT_KEY, {
                        expiresIn: 86400 // 24 hours
                    })

                    return res.status(200).json({
                        msg: "success sign in",
                        key
                    })
                }
                return res.status(404).json({
                    msg: "user not found"
                })
            })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const { page, size} = req.query;
        const { limit, offset } = getPagination(page, size);
        await User.findAndCountAll().then( result => {

            const data = getPagingData(result, page, limit)
            
            return res.status(200).json({
                msg: "Success retrieve data users",
                data
            })
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const {id} = req.params
        await User.findOne({
            where: {id}
        }).then( result => {
            if (!result) {
                return res.status(404).json({
                    msg: "User not found"
                })
            }
            return res.status(200).json({
                msg: "Success retrieve detail user",
                result
            })    
        }).catch( err => {
            throw new Error(err)  
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        const {id} = req.params
        await User.update(req.body, {
            where: {id}
        })
        return res.status(200).json({
            msg: "Success update detail user."
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = {
    signUp,
    signIn,
    getAllUser,
    getDetailUser,
    updateUser,
}