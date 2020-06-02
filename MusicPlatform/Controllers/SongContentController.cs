// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 歌内容界面的控制器.
    /// </summary>
    public class SongContentController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入歌内容界面.
        /// </summary>
        /// <returns>歌内容界面.</returns>
        public ActionResult SongContent(int songId, int userId)
        {
            var song = Db.Queryable<Song>().Where(it => it.Id == songId).Single();
            song.Times += 1;
            Db.Updateable(song).ExecuteCommand();
            ViewBag.UserId = userId;
            ViewBag.SongId = songId;
            return View();
        }

        /// <summary>
        /// 进入游客版歌内容界面.
        /// </summary>
        /// <returns>歌内容界面.</returns>
        public ActionResult SongForTourist(int songId)
        {
            var song = Db.Queryable<Song>().Where(it => it.Id == songId).Single();
            song.Times += 1;
            Db.Updateable(song).ExecuteCommand();
            ViewBag.SongId = songId;
            return View();
        }

        /// <summary>
        /// 初始化信息.
        /// </summary>
        /// <returns>值.</returns>
        public ActionResult ReadSong(int songId)
        {
            var song = Db.Queryable<Song>().Where(it => it.Id == songId).Single();
            string name = song.Name;
            string singerName = song.SingerName;
            string style = song.Style;
            string language = song.Language;
            string time = song.Time;
            string songPath = song.SongPath;
            string wordPath = song.WordPath;
            return Json(new { code = 200, name, singerName, style, language, time, songPath, wordPath }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取评论列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <returns>歌库列表.</returns>
        public ActionResult GetComment(int page, int limit, int songId)
        {
            List<CommentDTO> list = null;
            int count;
            // 分页操作，Skip()跳过前面数据项
            var temp = Db.Queryable<Comment, User>((c, u) => new object[]
            {
                    JoinType.Inner, c.UserId == u.Id && c.SongId == songId,
            }).Select((c, u) => new CommentDTO
            {
                Id = c.Id,
                SongId = c.SongId,
                UserId = c.UserId,
                Time = c.Time,
                Content = c.Content,
                Name = u.Name
            });
            count = temp.Count();
            list = temp.OrderBy(c => c.Time,OrderByType.Desc).Skip((page - 1) * limit).Take(limit).ToList();

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新增评论.
        /// </summary>
        /// <returns>Json.</returns>
        public ActionResult AddComment(int songId, int userId, string input)
        {
            Comment comment = new Comment
            {
                Time = DateTime.Now.ToString(),
                SongId = songId,
                UserId = userId,
                Content = input,
                Id = 0
            };
            Db.Insertable(comment).ExecuteReturnIdentity();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除歌曲.
        /// </summary>
        /// <param name="songId">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult DeleteComment(int commentId)
        {
            var comment = Db.Queryable<Comment>().Where(it => it.Id == commentId).Single();
            Db.Deleteable(comment).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

    }
}