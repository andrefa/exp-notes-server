module.exports = (sequelize, DataTypes) => sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
}, {
  tableName: 'users'
})
