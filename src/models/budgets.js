module.exports = (sequelize, DataTypes) => sequelize.define('budgets', {
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
  source_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'sources',
      key: 'id'
    }
  },
  currency_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'currencies',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'budgets'
})
