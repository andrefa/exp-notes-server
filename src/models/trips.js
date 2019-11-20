module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('trips', {
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

  Trip.associate = (models) => {
    Trip.belongsToMany(models.users, {
      through: 'user_trips',
      as: 'users',
      foreignKey: 'trip_id'
    })
  }

  return Trip
}
