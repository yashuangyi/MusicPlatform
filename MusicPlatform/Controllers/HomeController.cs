// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 主页界面的控制器.
    /// </summary>
    public class HomeController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入主页界面.
        /// </summary>
        /// <returns>主页界面.</returns>
        public ActionResult Home()
        {
            ViewBag.UserId = Session["userId"];
            ViewBag.UserPower = Session["userPower"];
            return View();
        }

        /// <summary>
        /// 进入首页界面.
        /// </summary>
        /// <returns>首页界面.</returns>
        public ActionResult HomePage()
        {
            return View();
        }

        /// <summary>
        /// 初始化首页数据.
        /// </summary>
        /// <param name="userId">用户编号</param>
        /// <param name="userPower">用户类别</param>
        /// <returns>json.</returns>
        public ActionResult ReadPageState(int userId, string userPower)
        {
            string name = "游客";
            if(userPower == "管理员")
            {
                name = Db.Queryable<Admin>().Where(it => it.Id == userId).Single().Name;
            }
            else if(userPower == "用户")
            {
                name = Db.Queryable<User>().Where(it => it.Id == userId).Single().Name;
            }

            int songNum = Db.Queryable<Song>().ToList().Count();
            List<Song> list = Db.Queryable<Song>().ToList();
            int timesNum = 0;
            if (list != null)
            {
                foreach (Song song in list)
                {
                    timesNum += song.Times;
                }
            }
            int friendNum = Db.Queryable<User>().ToList().Count();

            return Json(new { code = 200, name, songNum, timesNum, friendNum }, JsonRequestBehavior.AllowGet);
        }
    }
}