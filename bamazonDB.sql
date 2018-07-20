drop database if exists bamazon;

create database if not exists bamazon;

use bamazon;

create table if not exists products (
`itemId` int not null auto_increment,
`productName` varchar(200) not null,
`departmentName` varchar(100) null,
`price` Decimal (7,2) not null,
`quantityInStock` int not null,
primary key (`itemId`)
);

insert into products (`productName`, `departmentName`, `price`, `quantityInStock`) values
("iPhone 10", "mobile", 899.99, 10),
("Hoyle Casino Games 2008", "Software Games", 9.99, 8),
("Exploding Kittens Card Game", "Entertainment", 19.99, 4),
("Echo (2nd Generation) - Smart speaker with Alexa - Charcoal Fabric", "Electronics", 99.99, 15),
("Doinkit Darts - Magnetic Dart Board", "Game Room", 29.99, 2),
("STIGA Pro Carbon Table Tennis Racket", "Game Room", 52.28, 3),
("Kindle E-reader - Black, Glare-Free 6-Inch Touchscreen Display", "Electronics", 899.99, 9),
("Fire TV Stick with Alexa Voice Remote | Streaming Media Player", "Television", 899.99, 7),
("Samsung Galaxy S9 Plus", "mobile", 799.99, 5),
("Pop-Tarts Dash Button", "Prime Exclusive", 4.99, 4);