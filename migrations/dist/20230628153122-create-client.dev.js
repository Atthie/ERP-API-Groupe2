'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Clients', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              nom: {
                type: Sequelize.STRING,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
              },
              entreprise: {
                type: Sequelize.STRING,
                allowNull: false
              },
              adresse: {
                type: Sequelize.STRING,
                allowNull: false
              },
              statut: {
                type: Sequelize.STRING,
                allowNull: true
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                  model: 'Users',
                  key: 'id'
                }
              }
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(queryInterface.addConstraint('Clients', {
              fields: ['userId'],
              type: 'foreign key',
              name: 'fk_client_user',
              references: {
                table: 'Users',
                field: 'id'
              },
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('Clients'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};