/*
 Navicat Premium Data Transfer

 Source Server         : sqlserver
 Source Server Type    : SQL Server
 Source Server Version : 13004001
 Source Host           : (localdb)\MSSQLLocalDB:1433
 Source Catalog        : MusicPlatform
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 13004001
 File Encoding         : 65001

 Date: 02/06/2020 14:45:34
*/


-- ----------------------------
-- Table structure for admin
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[admin]') AND type IN ('U'))
	DROP TABLE [dbo].[admin]
GO

CREATE TABLE [dbo].[admin] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [account] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [password] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [name] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[admin] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [admin]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[admin] ON
GO

INSERT INTO [dbo].[admin] ([id], [account], [password], [name]) VALUES (N'1', N'admin', N'123456', N'管理员')
GO

SET IDENTITY_INSERT [dbo].[admin] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for comment
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[comment]') AND type IN ('U'))
	DROP TABLE [dbo].[comment]
GO

CREATE TABLE [dbo].[comment] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [userId] int  NULL,
  [songId] int  NULL,
  [content] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [time] datetime  NULL
)
GO

ALTER TABLE [dbo].[comment] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [comment]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[comment] ON
GO

INSERT INTO [dbo].[comment] ([id], [userId], [songId], [content], [time]) VALUES (N'1', N'1', N'1', N'好听！', N'2020-04-27 12:56:40.000'), (N'2', N'1', N'1', N'膜拜！', N'2020-04-27 12:57:55.000'), (N'5', N'1', N'1', N'还行', N'2020-04-27 13:03:31.000'), (N'6', N'1', N'3', N'好听啊！', N'2020-04-27 15:08:54.000'), (N'7', N'2', N'3', N'123', N'2020-04-27 15:09:23.000'), (N'8', N'3', N'3', N'好', N'2020-04-28 14:13:29.000')
GO

SET IDENTITY_INSERT [dbo].[comment] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for song
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[song]') AND type IN ('U'))
	DROP TABLE [dbo].[song]
GO

CREATE TABLE [dbo].[song] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [name] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [singerName] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [language] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [style] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [time] datetime  NULL,
  [isRecommend] int  NULL,
  [times] int  NULL,
  [songPath] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [wordPath] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[song] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [song]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[song] ON
GO

INSERT INTO [dbo].[song] ([id], [name], [singerName], [language], [style], [time], [isRecommend], [times], [songPath], [wordPath]) VALUES (N'1', N'暗涌', N'王菲姐姐', N'粤语', N'经典', NULL, N'1', N'33', N'/Source/songs/2020-04-19-00-59-13.mp3', N'/Source/words/2020-04-19-00-59-30.txt'), (N'2', N'测试', N'我', N'欧美', N'经典歌', N'2020-04-23 13:52:33.000', N'0', N'26', N'/Source/songs/2020-04-23-13-52-30.mp3', N'/Source/words/2020-04-19-00-59-30.pdf'), (N'3', N'17岁', N'华仔', N'粤语', N'经典', N'2020-04-27 15:08:17.000', N'1', N'25', N'/Source/songs/2020-04-27-15-08-09.mp3', N'/Source/words/2020-04-27-15-08-16.pdf')
GO

SET IDENTITY_INSERT [dbo].[song] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for star
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[star]') AND type IN ('U'))
	DROP TABLE [dbo].[star]
GO

CREATE TABLE [dbo].[star] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [userId] int  NULL,
  [songId] int  NULL
)
GO

ALTER TABLE [dbo].[star] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [star]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[star] ON
GO

INSERT INTO [dbo].[star] ([id], [userId], [songId]) VALUES (N'3', N'1', N'2'), (N'4', N'4', N'2'), (N'5', N'3', N'1')
GO

SET IDENTITY_INSERT [dbo].[star] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for user
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type IN ('U'))
	DROP TABLE [dbo].[user]
GO

CREATE TABLE [dbo].[user] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [account] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [password] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [name] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL,
  [love] varchar(255) COLLATE Chinese_PRC_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[user] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [user]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[user] ON
GO

INSERT INTO [dbo].[user] ([id], [account], [password], [name], [love]) VALUES (N'1', N'user', N'123456', N'靓仔', N'粤语歌'), (N'2', N'test', N'123456', N'测试', N'华语'), (N'3', N'MADKEE', N'123456', N'MADKEE', N'张国荣')
GO

SET IDENTITY_INSERT [dbo].[user] OFF
GO

COMMIT
GO


-- ----------------------------
-- Primary Key structure for table admin
-- ----------------------------
ALTER TABLE [dbo].[admin] ADD CONSTRAINT [PK__tmp_ms_x__3213E83FBDA4F2EF] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table comment
-- ----------------------------
ALTER TABLE [dbo].[comment] ADD CONSTRAINT [PK__tmp_ms_x__3213E83F1ABC8E65] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table song
-- ----------------------------
ALTER TABLE [dbo].[song] ADD CONSTRAINT [PK__tmp_ms_x__3213E83F0A2F4E88] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table star
-- ----------------------------
ALTER TABLE [dbo].[star] ADD CONSTRAINT [PK__tmp_ms_x__3213E83F5465BEB6] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE [dbo].[user] ADD CONSTRAINT [PK__tmp_ms_x__3213E83F98FFD838] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

