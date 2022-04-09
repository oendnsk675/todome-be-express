const { Task, User, model_have_tasks} = require('../models')
const {Op} = require('sequelize')

const createTask = async (req, res) => {
    // check for each user id ada semua gak 
    try {
        req.body.list_id.forEach(async idUs => {
            let check = await User.findByPk(idUs)
            if (!check) {
                return res.status(404).json({
                    msg: "Some user not found"
                })
            }
        });
        req.body.list_id.push(req.userId)

        let task_id
    
        // create the task
        const task = await Task.create({
            title: req.body.title,
            body: req.body.body,
            icon: req.body.icon,
            isComplete: false
        }).then(result => {
            task_id = result.id
        }).catch(err => {
            throw new Error(err)
        })

        const uniqueIdUser = [...new Set(req.body.list_id)]
        // create the model_have_task
        uniqueIdUser.forEach(user_id => {
            model_have_tasks.create({
                user_id,
                task_id
            }).catch(err => {
                throw new Error(err)
            })
        })

        return res.status(201).json({
            msg: "Successfully add task"
        })
           
    } catch (error) {
        console.log('azzek');
        return res.status(500).json({
            msg: error
        })
    }
}

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

const getAllTask = async (req, res) => {
    try {
        const { page, size} = req.query;
        const { limit, offset } = getPagination(page, size);
        await Task.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: User,
                    as: "users"
                }
            ]
        }).then(result => {

            const data = getPagingData(result, page, limit)

            return res.status(200).json({
                msg: "Success retrieve the task",
                data
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

const getDetailTask = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Task.findOne({
            where: {id},
            include: [{
                model: User,
                as: "users"
            }]
        })
        if (!data) {
            return res.status(404).json({
                msg: "Task not found"
            })
        }
        return res.status(200).json({
            msg: "Success retrieve detail task",
            data
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })   
    }
}

const updateTask = async (req, res) => {
    try {
        console.log('asd');
        const {id} = req.params
        const data = await Task.update(req.body, {
            where: {id}
        })

        if (!data) {
            return res.status(404).json({
                msg: "Task not found"
            })
        }
        
        return res.status(201).json({
            msg: "Success updated task"
        })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })   
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Task.destroy({
            where: {id}
        })

        if (data) {
            await model_have_tasks.destroy({
                where: {
                    [Op.and]: {
                        user_id: req.userId,
                        task_id: id
                    } 
                }
            }).then( () => {
                return res.status(200).json({
                    msg: "Successfully delete task"
                })
            }).catch ( err => {
                throw new Error(err)
            }) 
        }

        return res.status(404).json({
            msg: "Task not found"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })   
    }
}

module.exports = {
    createTask,
    getAllTask,
    getDetailTask,
    updateTask,
    deleteTask
}