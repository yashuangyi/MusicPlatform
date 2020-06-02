// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 我的收藏界面的控制器.
    /// </summary>
    public class MyStarController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入我的收藏界面.
        /// </summary>
        /// <returns>我的收藏界面.</returns>
        public ActionResult MyStar()
        {
            return View();
        }

        /// <summary>
        /// 获取歌曲库列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="userId">用户id.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>歌库列表.</returns>
        public ActionResult GetSong(int page, int limit, int userId, string search = null)
        {
            List<SongDTO> list = null;
            int count;
            // 分页操作，Skip()跳过前面数据项
            if (string.IsNullOrEmpty(search))
            {
                // 分页操作，Skip()跳过前面数据项
                var temp = Db.Queryable<Song, Star>((song, star) => new object[]
                {
                    JoinType.Inner, song.Id == star.SongId && star.UserId == userId,
                }).Select((song, star) => new SongDTO
                {
                    StarId = star.Id,
                    Name = song.Name,
                    SingerName = song.SingerName,
                    Language = song.Language,
                    Style = song.Style,
                    Time = song.Time,
                    Times = song.Times,
                    SongPath = song.SongPath,
                    WordPath = song.WordPath,
                });
                count = temp.Count();
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                // 分页操作，Skip()跳过前面数据项
                var temp = Db.Queryable<Song, Star>((song, star) => new object[]
                {
                    JoinType.Inner, song.Id == star.SongId && star.UserId == userId && (song.Name.Contains(search) || song.SingerName.Contains(search) || song.Language.Contains(search) || song.Style.Contains(search)),
                }).Select((song, star) => new SongDTO
                {
                    StarId = star.Id,
                    Name = song.Name,
                    SingerName = song.SingerName,
                    Language = song.Language,
                    Style = song.Style,
                    Time = song.Time,
                    Times = song.Times,
                    SongPath = song.SongPath,
                    WordPath = song.WordPath,
                });
                count = temp.Count();
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 播放歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult PlaySong(Song song)
        {
            song.Times += 1;
            Db.Updateable(song).ExecuteCommand();

            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 收藏.
        /// </summary>
        /// <param name="songId">歌曲编号.</param>
        /// <param name="userId">用户编号.</param>
        /// <returns>Json.</returns>
        public ActionResult SetStar(int songId, int userId)
        {
            if(Db.Queryable<Star>().Where(it => it.SongId == songId && it.UserId == userId).Single() != null)
            {
                return Json(new { code = 400 }, JsonRequestBehavior.AllowGet);
            }

            Star star = new Star
            {
                SongId = songId,
                UserId = userId,
            };
            Db.Insertable(star).ExecuteReturnIdentity();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 取消收藏.
        /// </summary>
        /// <param name="starId">收藏编号.</param>
        /// <returns>Json.</returns>
        public ActionResult SetNotStar(int starId)
        {
            Star star = Db.Queryable<Star>().Where(it => it.Id == starId).Single();
            Db.Deleteable(star).ExecuteCommand();

            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}