module.exports = (sequelize, DataTypes) => sequelize.define('expenses', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  trip_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'trips',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'categories',
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
  place_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'places',
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
  }
}, {
  tableName: 'expenses'
})
