import Sequelize from "sequelize";

export default (sequelize) => {
  return sequelize.define('gido_menu_info', {
    menu_id: {
      type: Sequelize.DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "메뉴 ID"
    },
    menu_name: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      comment: "메뉴명"
    },
    menu_order: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      comment: "메뉴 순서"
    },
    upper_menu: {
      type: Sequelize.DataTypes.STRING(20),
      allowNull: true,
      comment: "상위 메뉴id"
    },
    menu_url: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
      comment: "메뉴 url"
    },
    use_yn: {
      type: Sequelize.DataTypes.ENUM('y', 'n'),
      allowNull: true,
      comment: "사용 여부"
    },
    menu_authorizaion: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: true,
      comment: "메뉴 권한"
    }
  }, {
    sequelize,
    tableName: 'gido_menu_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
    ]
  })
}