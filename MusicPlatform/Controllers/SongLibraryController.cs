// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 歌曲库界面的控制器.
    /// </summary>
    public class SongLibraryController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入歌曲库界面.
        /// </summary>
        /// <returns>歌曲库界面.</returns>
        public ActionResult SongLibrary()
        {
            return View();
        }

        /// <summary>
        /// 获取歌曲库列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>歌库列表.</returns>
        public ActionResult GetSong(int page, int limit, string search = null)
        {
            List<Song> list = null;
            int count;
            // 分页操作，Skip()跳过前面数据项
            if (string.IsNullOrEmpty(search))
            {
                // 分页操作，Skip()跳过前面数据项
                var temp = Db.Queryable<Song>();
                count = temp.Count();
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                var temp = Db.Queryable<Song>().Where(it => it.Name.Contains(search) || it.SingerName.Contains(search) || it.Language.Contains(search) || it.Style.Contains(search));
                count = temp.Count();
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }
    }
}