CREATE TABLE SkatUser
(
    Id        INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId    INTEGER NOT NULL,
    CreatedAt DATE    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsActive  BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE SkatYear
(
    Id         INTEGER PRIMARY KEY AUTOINCREMENT,
    Label      TEXT NOT NULL,
    CreatedAt  DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ModifiedAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    StartDate  DATE NOT NULL,
    EndDate    DATE NOT NULL
);

CREATE TABLE SkatUserYear
(
    Id         INTEGER PRIMARY KEY AUTOINCREMENT,
    SkatUserId INTEGER NOT NULL,
    SkatYearId INTEGER NOT NULL,
    UserId     INTEGER NOT NULL,
    IsPaid     BOOLEAN NOT NULL DEFAULT FALSE,
    Amount     INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (SkatUserId) REFERENCES SkatUser (Id) ON DELETE CASCADE,
    FOREIGN KEY (SkatYearId) REFERENCES SkatYear (Id) ON DELETE CASCADE
);

CREATE TRIGGER create_user_years
    AFTER INSERT
    ON SkatYear
    FOR EACH ROW
BEGIN
    INSERT INTO SkatUserYear(SkatUserId, SkatYearId, UserId)
    SELECT SkatUser.Id, NEW.Id, SkatUser.UserId
    FROM SkatUser;
END;