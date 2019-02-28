-- Create a new user
insert into user (name,first_name,mail,password_hash,avatar_img_path,is_admin) values (
    'admin',
    'joris',
    'admin@joris.com',
    SHA2('admin',256),
    'media/avatar/1.jpg',
    1
);

-- Create a new article
insert into article (title,content,author_id,date,cover_img_path) values (
    'first blog article',
    'This is my first blog article. I am really proud it works great.',
    1,
    NOW(),
    'media/cover/1.jpg'
);

-- Create a new comment
insert into comment (content,author_id,article_id,date) values (
    'This is a great article. You can be proud of you',
    1,
    1,
    NOW()
);

-- Create a new category
insert into category (name) values (
    'test'
);

-- Link an article to a category
insert into article_category values (
    1,
    1
);

-- Connect a user
select * from user
where mail = 'admin@joris.com'
and password_hash = SHA2('admin', 256);

-- Select an article
select * from article
where article_id = 1;

-- Delete an article
Delete from article
where article_id = 1;

-- Update an article
update article
set title = 'New article title',
    content = 'new content! It is cool.',
    date = NOW()
where article_id = 1;

-- Select all articles of a user
Select * from article
where author_id = 1;

-- Select all articles by title, content
Select * from article
where title like '%search%' or content like '%search%';
-- and categories
Select * from article
natural join article_category
where category_id = 1

-- find a user
select user_id,name,first_name,mail,avatar_img_path,count(comment.author_id) as comment_count from user
left join comment on user.user_id = comment.author_id
where user.name like '%search%' or user.first_name like '%search%'
    or user.mail like '%search%'
group by user.user_id;

-- delete a user
delete from user
where user_id = 1

-- update a user
update user
set name = 'better name',
    first_name = 'better first name',
    mail = 'bettermail@joris.com'
where user_id = 1;

-- update a comment
update comment
set content = 'new comment'
    date = NOW()
where comment_id = 1;

-- delete a comment
delete from comment
where comment_id = 1;

-- all article comment
select * from comment
where article_id = 1;

-- all user comment
select * from comment
where user_id = 1;

-- delete multiple comments
delete from comment
where comment_id in (1,2);

