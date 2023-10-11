'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slug: Sequelize.STRING,
      title: Sequelize.STRING,
      image: Sequelize.STRING,
      category_id: Sequelize.BIGINT,
      sub_category_id: Sequelize.BIGINT,
      description: Sequelize.TEXT,
      property_type: Sequelize.STRING,
      price: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  },
};
