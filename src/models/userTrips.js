module.exports = (sequelize, DataTypes) => sequelize.define('user_trips', {
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  trip_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'trips',
      key: 'id'
    }
  }
})
