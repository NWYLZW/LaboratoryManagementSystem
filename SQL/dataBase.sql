create table Captal
(
    laboratoryId   int auto_increment
        primary key,
    remainingMoney decimal(10, 2) not null
);

create table Direction
(
    id      int auto_increment
        primary key,
    name    char(20) not null,
    imgName char(20) not null,
    content text     null,
    constraint Direction_name_uindex
        unique (name)
);

create table JournalDaybook
(
    id                int auto_increment
        primary key,
    captalId          int            not null,
    dateTime          datetime       not null,
    changeMoneyUserId int            not null,
    changeReason      text           null,
    changeMoney       decimal(10, 2) not null,
    remainingMoney    decimal(10, 2) not null,
    constraint captal_fk
        foreign key (captalId) references Captal (laboratoryId)
);

create table Laboratory
(
    id       int auto_increment
        primary key,
    blockNum char(10) not null,
    doorNum  char(10) not null,
    content  text     null
);

create table LeaveMessageViolation
(
    userId       int       null,
    messageId    int       null,
    dateTime     datetime  null,
    reportTag    char(20)  null,
    reportId     int auto_increment
        primary key,
    reportReason char(100) null
);

create table LoginNotice
(
    id       int auto_increment
        primary key,
    authorId int                  not null,
    date     datetime             not null,
    title    char(50)             not null,
    content  text                 null,
    isShow   tinyint(1) default 0 not null
);

create table Mark
(
    id       int auto_increment,
    dateTime datetime not null,
    userId   int      not null,
    primary key (id, dateTime)
);

create table Notice
(
    id       int auto_increment
        primary key,
    title    char(20) not null,
    content  text     null,
    dateTime datetime not null,
    kindNum  int      not null,
    message  char(40) null,
    authorId int      not null
);

create table NoticeViewUsers
(
    id       int auto_increment
        primary key,
    dateTime datetime not null,
    userId   int      not null,
    noticeId int      not null,
    constraint notice
        foreign key (noticeId) references Notice (id)
);

create table ProfessionalClass
(
    id           int auto_increment
        primary key,
    professional char(40) not null,
    gradle       int      not null,
    classNum     int      not null
);

create table Role
(
    id          int auto_increment,
    name        char(64)             null,
    `default`   tinyint(1) default 0 null,
    permissions int                  null,
    constraint Role_id_uindex
        unique (id),
    constraint Role_name_uindex
        unique (name)
);

create index `default`
    on Role (`default`);

alter table Role
    add primary key (id);

create table User
(
    id                  int auto_increment comment '用户id',
    schoolID            char(32)      not null comment '用户名',
    nickName            char(32)      not null comment '昵称',
    sexBool             tinyint(1)    not null,
    passwordHash        char(128)     not null,
    roleId              int default 0 not null,
    directionId         int default 0 not null,
    laboratoryId        int default 0 not null,
    professionalClassId int default 0 not null,
    email               char(64)      null,
    qqNum               char(64)      not null,
    telNum              char(64)      not null,
    constraint User_id_uindex
        unique (id),
    constraint User_userName_uindex
        unique (schoolID),
    constraint directionId
        foreign key (directionId) references Direction (id),
    constraint laboratoryId
        foreign key (laboratoryId) references Laboratory (id),
    constraint professionalClassId
        foreign key (professionalClassId) references ProfessionalClass (id),
    constraint roleId
        foreign key (roleId) references Role (id)
);

alter table User
    add primary key (id);

create table LeaveMessage
(
    id          int auto_increment
        primary key,
    authorId    int                  not null,
    isAnonymous tinyint(1) default 0 not null,
    content     text                 not null,
    dateTime    datetime             not null,
    replyId     int                  null,
    constraint author
        foreign key (authorId) references User (id),
    constraint replyLeaveMessage
        foreign key (replyId) references LeaveMessage (id)
)
    comment '留言';

create table LeaveMessageLikeUsers
(
    id             int auto_increment
        primary key,
    dateTime       datetime not null,
    userId         int      not null,
    leaveMessageId int      null,
    constraint leaveMessage
        foreign key (leaveMessageId) references LeaveMessage (id),
    constraint user
        foreign key (userId) references User (id)
)
    comment '留言喜欢';

create table UserRegisterTime
(
    registerTime datetime default '0000-00-00 00:00:00' not null
        primary key,
    userId       int                                    not null
);

