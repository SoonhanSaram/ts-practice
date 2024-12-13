

/* 지도 DB*/

drop database if exists SDA_GIDO;
create database if not exists SDA_GIDO;
use SDA_GIDO;

/* 메뉴정보 */

drop table if exists GIDO_menu_info;

create table if not exists GIDO_menu_info (
menu_id varchar(20) not null primary key comment "메뉴 ID",
menu_name varchar(50) not null comment "메뉴명",
menu_order int not null comment '메뉴 순서',
upper_menu varchar(20) comment '상위 메뉴id' default "",
menu_url varchar(255) comment '메뉴 url' default "",
use_yn enum('y', 'n') comment '사용 여부',
menu_authorizaion varchar(50) comment '메뉴 권한'
);

/*	             				 메뉴ID,   메뉴명,  메뉴순서, 상위메뉴ID, 메뉴 url, 사용 여부, 메뉴 권한  */
insert into GIDO_menu_info value('ad01', '푸시알람', 1 ,'', 'admin/PID01', 'y', 'admin');
insert into GIDO_menu_info value('ad02', '회원관리', 2 ,'' , 'admin/PID02', 'y', 'admin');
insert into GIDO_menu_info value('ad03', '배너관리', 3,'' , '', 'y', 'admin');
insert into GIDO_menu_info value('ad04', '메뉴관리', 4,'' , 'admin/PID04', 'y', 'admin');

insert into GIDO_menu_info value('ad0301', '이벤트배너관리',1 ,'ad03' , 'admin/PID0301', 'y', 'admin');
insert into GIDO_menu_info value('ad0302', '팝업관리', 2,'ad03' , 'admin/PID0302', 'y', 'admin');

/* 배너 정보 */ 

use sda_gido;

drop table if exists Admin_banner;

create table if not exists Admin_banner (
banner_seq int not null auto_increment comment "배너 번호",
banner_title varchar(255) not null comment "배너 제목",
banner_used enum('y', 'n') not null comment "배너 사용여부",
-- tinyint 0 ~ 255
banner_location tinyint not null comment "배너 위치",
banner_sdate date not null comment "시작 일자",
banner_stime time not null comment "시작 시각",
banner_edate date not null comment "종료 일자",
banner_etime time not null comment "종료 시각",
banner_url text not null comment "배너 url",
banner_registrant varchar(30) not null comment "등록자명",
banner_image varchar(1000) comment "이미지 파일 위치",
-- int -2^31 ~ 2^31 - 1 까지
banner_count int not null default 0 comment "클릭 수",
primary key (banner_seq)
);







