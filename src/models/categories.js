module.exports = (sequelize, DataTypes) => sequelize.define('categories', {
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
  parent_category_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'categories'
})
