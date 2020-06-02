// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 歌曲库管理界面的控制器.
    /// </summary>
    public class SongManageController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入歌曲库管理界面.
        /// </summary>
        /// <returns>歌曲库管理界面.</returns>
        public ActionResult SongManage()
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
                var temp = Db.Queryable<Song>().Where(it => it.Name.Contains(search) || it.SingerName.Contains(search));
                count = temp.Count();
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 上传歌曲.
        /// </summary>
        /// <returns>Json.</returns>
        public ActionResult UploadSong()
        {
            string songPath = string.Empty;
            string songName = string.Empty;
            string msg = string.Empty;
            HttpPostedFileWrapper file = (HttpPostedFileWrapper)Request.Files[0];
            songName = file.FileName;
            if (string.IsNullOrEmpty(songName))
            {
                msg = "无效文件，请重新上传！";
                return Json(new { msg, code = 400 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 获得当前时间的string类型
                string name = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
                string path = "/Source/songs/";
                string uploadPath = Server.MapPath("~/" + path);
                string ext = Path.GetExtension(songName);
                string savePath = uploadPath + name + ext;
                file.SaveAs(savePath);
                songPath = path + name + ext;
                msg = "上传成功！";
                return Json(new { songPath, msg, code = 200, songName }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 上传歌词.
        /// </summary>
        /// <returns>Json.</returns>
        public ActionResult UploadWord()
        {
            string wordPath = string.Empty;
            string wordName = string.Empty;
            string msg = string.Empty;
            HttpPostedFileWrapper file = (HttpPostedFileWrapper)Request.Files[0];
            wordName = file.FileName;
            if (string.IsNullOrEmpty(wordName))
            {
                msg = "无效文件，请重新上传！";
                return Json(new { msg, code = 400 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 获得当前时间的string类型
                string name = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
                string path = "/Source/words/";
                string uploadPath = Server.MapPath("~/" + path);
                string ext = Path.GetExtension(wordName);
                string savePath = uploadPath + name + ext;
                file.SaveAs(savePath);
                wordPath = path + name + ext;
                msg = "上传成功！";
                return Json(new { wordPath, msg, code = 200, wordName }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 新增歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult AddSong(Song song)
        {
            song.Time = DateTime.Now.ToString();
            Db.Insertable(song).ExecuteReturnIdentity();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult EditSong(Song song)
        {
            Db.Updateable(song).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult DeleteSong(Song song)
        {
            Db.Deleteable(song).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 设为推荐歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult SetRecommend(Song song)
        {
            song.IsRecommend = 1;
            Db.Updateable(song).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 不设为推荐歌曲.
        /// </summary>
        /// <param name="song">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult SetNotRecommend(Song song)
        {
            song.IsRecommend = 0;
            Db.Updateable(song).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
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