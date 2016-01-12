SELECT * FROM user;

SELECT username FROM user;

SELECT username,pass FROM user;

SELECT * FROM user WHERE username="jamppa";

SELECT * FROM user WHERE username="pete" and pass="pete" order by username;

SELECT * FROM friend;

SELECT user.username,friend.name,friend.address,friend.age FROM
user INNER JOIN friend ON user.user_id=friend.user_id WHERE user.username="jamppa";

/*Call procedure. This will get all users from user table*/
CALL getAllUsers();

CALL getLoginInfo("pete","pete");

CALL getFriendsForUser("pete");

CALL getFriendsForUserId(*);