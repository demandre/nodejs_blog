create table user (
    user_id int unsigned auto_increment primary key not null,
    name varchar(100),
    first_name varchar(100),
    mail varchar(255),
    password_hash varchar(255),
    avatar_img_path varchar(255),
    is_admin boolean
);

create table article (
    article_id int unsigned auto_increment primary key not null,
    title varchar(255),
    content text,
    author_id int unsigned not null,
    date datetime,
    cover_img_path varchar(255),
    foreign key(`author_id`) references user(`user_id`) on delete cascade
);

create table comment (
    comment_id int unsigned auto_increment primary key not null,
    content text,
    author_id int unsigned not null,
    article_id int unsigned not null,
    date datetime,
    foreign key(`author_id`) references user(`user_id`) on delete cascade,
    foreign key(`article_id`) references article(`article_id`) on delete cascade
);

create table category (
    category_id int unsigned auto_increment primary key not null,
    name varchar(100)
);

create table article_category (
    article_id int unsigned not null,
    category_id int unsigned not null,
    PRIMARY KEY (article_id, category_id),
    foreign key(`article_id`) references article(`article_id`) on delete cascade,
    foreign key(`category_id`) references category(`category_id`) on delete cascade
);