CREATE TABLE SkatUser
(
    Id        INTEGER PRIMARY KEY AUTO_INCREMENT,
    UserId    INTEGER NOT NULL,
    CreatedAt DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsActive  BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE SkatUserYear
(
    Id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    SkatUserId INTEGER NOT NULL,
    SkatYearId INTEGER NOT NULL,
    UserId     INTEGER NOT NULL,
    IsPaid     BOOLEAN NOT NULL DEFAULT FALSE,
    Amount     INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (SkatUserId) REFERENCES SkatUser (Id) ON DELETE CASCADE,
    FOREIGN KEY (SkatYearId) REFERENCES SkatYear (Id) ON DELETE CASCADE
);

CREATE TABLE SkatYear
(
    Id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    Label      TEXT NOT NULL,
    CreatedAt  DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ModifiedAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    StartDate  DATE NOT NULL,
    EndDate    DATE NOT NULL
);

INSERT INTO SkatUser (UserId)
VALUES (1),
(2),
(3);

INSERT INTO SkatUserYear (SkatUserId, SkatYearId, UserId, IsPaid, Amount)
VALUES (1, 1, 1, TRUE, 1000),
(2, 2, 2, TRUE, 2000),
(3, 3, 3, TRUE, 3000);

INSERT INTO SkatYear (label, StartDate, EndDate)
VALUES ('A-Card', '2020-01-01', '2021-12-31'),
('B-Card', '2020-01-01', '2021-12-31'),
('A-Card', '2020-01-01', '2021-12-31');


CREATE TRIGGER `user_years` 
    AFTER INSERT 
    ON `SkatYear` 
    FOR EACH ROW 
BEGIN 
    INSERT INTO SkatUserYear(SkatUserId, SkatYearId, UserId) 
    SELECT SkatUser.Id, NEW.Id, SkatUser.UserId 
    FROM SkatUser; 
END;

