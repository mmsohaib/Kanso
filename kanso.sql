drop table if exists listings;
drop table if exists homeowners;
drop table if exists searchers;
drop table if exists users;

create table users (
    u_id int primary key auto_increment,
    first_name varchar(15) not null,
    last_name varchar(15) not null,
    email varchar(30) not null unique,
    username varchar(20) not null unique,
);

create table homeowners (
    homeowner_id int primary key,
    foreign key (homeowner_id) references users(u_id)
);

create table searchers (
    searcher_id int primary key,
    foreign key (searcher_id) references users(u_id)
);

create table listings (
    listing_id int primary key,
    listed_by int,
    addr varchar(100),
    listing_type varchar(15),
    numRooms int,
    numBath int,
    parking varchar(10),
    price int,
    posted_date datetime default current_timestamp,
    listing_desc varchar(300),
    image_path varchar(100),
    foreign key (listed_by) references homeowners(homeowner_id)
);