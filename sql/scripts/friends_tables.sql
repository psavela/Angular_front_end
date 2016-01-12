create table user(
	user_id int NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    pass varchar(255) NOT NULL,
    /*Every table have a private key
    That is one of the attributes defined
    In our case it is user_id*/
    primary key(user_id)

)Engine=InnoDb;

create table friend(
	_id int NOT NULL UNIQUE AUTO_INCREMENT,
    name varchar(255),
    address varchar(255),
    age int,
    user_id int,
    primary key(_id),
    foreign key(user_id) references user(user_id)

)Engine=InnoDb;

/*drop table user; tämä tuhoaa user tablen */
/*DROP table friend;*/