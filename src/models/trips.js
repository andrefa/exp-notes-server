module.exports = (sequelize, DataTypes) => sequelize.define('trips', {
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
  start_date: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  end_date: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'trips'
})
