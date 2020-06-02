// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 热度排行管理界面的控制器.
    /// </summary>
    public class HeatRankingController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入热度排行界面.
        /// </summary>
        /// <returns>热度排行界面.</returns>
        public ActionResult HeatRanking()
        {
            return View();
        }

        /// <summary>
        /// 获取歌曲库列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <returns>歌库列表.</returns>
        public ActionResult GetSong(int page, int limit)
        {
            List<Song> list = null;
            int count;

            // 分页操作，Skip()跳过前面数据项
            var temp = Db.Queryable<Song>().OrderBy(it => it.Times, OrderByType.Desc).Take(10);
            count = temp.Count();
            list = temp.ToList();

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
    }
}