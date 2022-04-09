'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsToMany(models.User, {
        foreignKey: 'task_id',
        as: 'users',
        through: 'model_have_tasks'
      })
    }
  }
  Task.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    icon: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};