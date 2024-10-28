import _gido_menu_info from "./models/gido_menu_info.js";
import _admin_banner from "./models/admin_banner.js";

function initModels(sequelize) {
  const menus = _gido_menu_info(sequelize);
  const banner = _admin_banner(sequelize);
  return {
    menus,
    banner,
  };
}

export default initModels;
