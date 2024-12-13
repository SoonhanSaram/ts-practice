interface Menu {
  menu_id: string;
  menu_name: string;
  menu_order: number;
  upper_menu: string;
  menu_url: string;
  use_yn: string;
  menu_authorizaion: string;
}

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  };
}

interface Banner {
  banner_image: string;
  banner_seq: number;
  banner_title: string;
  banner_used: string;
  banner_sdate: string;
  banner_stime: string;
  banner_edate: string;
  banner_etime: string;
  banner_registrant: string;
  banner_location: string;
  banner_count: number;
}
