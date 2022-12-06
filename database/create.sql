create schema ccca

create table ccca.item (
  id_item serial primary key,
  category text,
  description text,
  price numeric,
  width integer,
  height integer,
  length integer,
  weight integer
)

insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (1, 'Music', 'CD', 30, 30, 30, 10, 0.5)
insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (2, 'Video', 'DVD', 50, 40, 20, 10, 0.5)
insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (3, 'Video', 'VHD', 10, 40, 20, 10, 0.5)
insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3)
insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20)
insert into ccca.item (id_item, category, description, price, width, height, length, weight) values (6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9)

create table ccca.coupon (
  code text,
  percentage numeric,
  expire_date timestamp,
  primary key (code)
)

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2023-10-10T10:00:00')
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00')

create table ccca.order (
  id_order serial,
  coupon text,
  code text,
  cpf text,
  issue_date timestamp,
  freight numeric,
  sequence integer,
  primary key (id_order)
)

create table ccca.order_item (
  id_order integer,
  id_item integer,
  price numeric,
  quantity integer,
  primary key (id_order, id_item)
)
