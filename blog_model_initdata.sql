insert into user (name,first_name,mail,password_hash,avatar_img_path,is_admin) values (
    'admin',
    'joris',
    'admin@joris.com',
    SHA2('admin', 256),
    'media/avatar/joris_admin.jpg',
    1
);

insert into article (title,content,author_id,date,cover_img_path) values (
    'first blog article',
    'This is my first blog article. I am really proud it works great.',
    1,
    NOW(),
    'media/cover/first_blog_article'
);

insert into comment (content,author_id,article_id,date) values (
    'This is a great article. You can be proud of you',
    1,
    1,
    NOW()
);

insert into category (name) values (
    'game'
);
insert into category (name) values (
    'car'
);
insert into category (name) values (
    'health'
);
insert into category (name) values (
    'people'
);

insert into article_category values (
    1,
    1
);