import _gido_menu_info from "./models/gido_menu_info.js";

function initModels(sequelize) {
    const menus = _gido_menu_info(sequelize);
    return {
        menus
    }
}

export default initModels;