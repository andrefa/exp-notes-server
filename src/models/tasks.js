module.exports = (sequelize, DataTypes) => sequelize.define('tasks', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  trip_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'trips',
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'tasks'
})
