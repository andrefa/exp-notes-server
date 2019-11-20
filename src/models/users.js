module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
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

  User.associate = (models) => {
    User.belongsToMany(models.trips, {
      through: 'user_trips',
      as: 'trips',
      foreignKey: 'user_id'
    })
  }

  return User
}
