module.exports = (sequelize, DataTypes) => sequelize.define('currencies', {
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
  symbol: {
    type: DataTypes.STRING(4),
    allowNull: false
  }
}, {
  tableName: 'currencies'
})
