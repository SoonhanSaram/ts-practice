interface Menu {
    menu_id : string
    menu_name : string
    menu_order : number
    upper_menu : string
    menu_url : string
    use_yn : string
    menu_authorizaion : string
}

interface NotificationData {
    data : {
        title : string
        body : string
        image: string
        click_action : string
    }
}