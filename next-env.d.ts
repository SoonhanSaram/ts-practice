/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface Menu {
    menu_id: string,
    menu_name: string,
    menu_order: number,
    upper_menu: string,
    menu_url: string,
    use_yn : string,
    menu_authorizaion: string
}