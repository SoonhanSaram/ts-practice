/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// 원시자료형 데이터 확장을 사용하지 않을 시 = type
// 자료의 확장을 사용하고 object 를 사용해 = interface

interface Menu {
    menu_id: string;
    menu_name: string;
    menu_order: number;
    upper_menu: string;
    menu_url: string;
    use_yn: string;
    menu_authorizaion: string;
}