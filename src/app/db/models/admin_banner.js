import Sequelize from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Admin_menu",
    {
      banner_seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "배너 번호",
      },
      banner_title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: "배너 제목",
      },
      banner_used: {
        type: Sequelize.DataTypes.ENUM("y", "n"),
        allowNull: false,
        comment: "배너 사용여부",
      },
      banner_sdate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        comment: "시작 일자",
      },
      banner_stime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
        comment: "시작 시각",
      },
      banner_edate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        comment: "종료 일자",
      },
      banner_etime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
        comment: "종료 시각",
      },
      banner_registrant: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: "등록자명",
      },
      banner_image: {
        type: Sequelize.DataTypes.STRING(1000),
        allowNull: true,
        comment: "이미지 파일 위치",
      },
    },
    {
      sequelize,
      tableName: "Admin_banner",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "banner_seq" }],
        },
      ],
    }
  );
};
