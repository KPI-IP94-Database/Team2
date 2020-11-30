-- passwords
-- kiril, nikita, vova, sasha, illya, nick

INSERT INTO User(name, login, password) VALUES('Kiril', 'kiril@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$Km5w3hSy9GTOo0VnQ/FuVKTxzn0l8/5fw4kInHQqPiU$KhP5LNeJoGeEG/OyEnr2jGO7XKD7TnrI0nQsjgPATjtTEIHZ0e3YXeFBBGkdcMsZqhF7G/Vvhpv6ZP/2BL/HjQ');
INSERT INTO User(name, login, password) VALUES('Nikita', 'nikita@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$lt59T2ATUFPuC2UWtZpLJpUwfdgccQ3G0PvUI8UJpQU$SDWP2CLPDYAT0fh2tZ7gGp11N+KOvViLxbhrRpOLuZNfusaWAV21m0+cCfstoR/HnBmMFsJBJ/Xe2G4a6Db0fQ');
INSERT INTO User(name, login, password) VALUES('Vova', 'vova@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$clnzUntqp5wd0PTiXgwtZezRfa7KM2ZEFQZvvqt/QIM$C22iVpp8rg5FxhsNAURCYmz18Cv7F7abFLBoLGRdtKdNtSuoWSGJ4zVuaS1JXE9jJFs6d0hKt47LEnk5LnzJoA');
INSERT INTO User(name, login, password) VALUES('Sasha', 'sasha@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$NDkNEVIw9TmPEayLX8kflEJ83RbTNsyYbE8v/xTKvy4$SvSNfPKdFUvW1At975/cb8OxSEAEX4Jw9Jr6O/X/dRPANO32Hhi5fBgKfuexBSchSPQYJZ2anmadwfOguGHbig');
INSERT INTO User(name, login, password) VALUES('Illya', 'illya@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$D2IgTweEtMNEuTJfccORsPOIGzRBIfgwthnW3t68s4s$J+bQDaV9YOJvApa7WH+Rf1wVFoyVavShe5C73FzKwMYmLIyod4vwPRnrXFhTak9/kbUvNwWHh6mae/XJc66uxA');
INSERT INTO User(name, login, password) VALUES('Nick', 'nick@gmail.com', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$6mUXwBJfc0xx9GMHDk8Lfq2mCysIrwU6zK3jIr837Bc$13btT87TbbHP5ABAQy4urlD+xKjresCHyYUgb0c6Pq7jeawXFG6+UcU6HoUYm8MocrAbHQ6h6i2HdQSAJ2b7hw');

INSERT INTO Product(name, description, price) Values('t-shirt', 'Just cool black	 t-shirt', 500);
INSERT INTO Product(name, description, price) Values('pants', 'Skinny blue jeans', 1000);
INSERT INTO Product(name, description, price) Values('glasses', 'Original Ray-Ban glasses', 3000);
INSERT INTO Product(name, description, price) Values('socks', 'Cheap socks', 50);
INSERT INTO Product(name, description, price) Values('coat', 'Brown wool coat', 3000);
INSERT INTO Product(name, description, price) Values('shoes', 'Suede loafers', 2000);

INSERT INTO Rating(value, user_login, product_name) Values(5, 'kiril@gmail.com', 't-shirt');
INSERT INTO Rating(value, user_login, product_name) Values(3, 'nikita@gmail.com', 'pants');
INSERT INTO Rating(value, user_login, product_name) Values(4, 'vova@gmail.com', 'glasses');
INSERT INTO Rating(value, user_login, product_name) Values(2, 'sasha@gmail.com', 'socks');
INSERT INTO Rating(value, user_login, product_name) Values(5, 'illya@gmail.com', 'coat');
INSERT INTO Rating(value, user_login, product_name) Values(4, 'nick@gmail.com', 'shoes');

INSERT INTO Comment(content, user_login, product_name) Values('Excellent t-shirt', 'kiril@gmail.com', 't-shirt');
INSERT INTO Comment(content, user_login, product_name) Values('It`s worth it', 'nikita@gmail.com', 'pants');
INSERT INTO Comment(content, user_login, product_name) Values('I`m satisfied', 'vova@gmail.com', 'glasses');
INSERT INTO Comment(content, user_login, product_name) Values('These are the worst socks I`ve seen', 'sasha@gmail.com', 'socks');
INSERT INTO Comment(content, user_login, product_name) Values('Now I look like a killer', 'illya@gmail.com', 'coat');
INSERT INTO Comment(content, user_login, product_name) Values('Beatiful a pair of shoes', 'nick@gmail.com', 'shoes');

