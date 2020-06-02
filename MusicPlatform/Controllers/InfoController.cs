// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 基本资料界面的控制器.
    /// </summary>
    public class InfoController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入基本资料界面.
        /// </summary>
        /// <returns>基本资料界面.</returns>
        public ActionResult Info()
        {
            return View();
        }

        /// <summary>
        /// 初始化信息.
        /// </summary>
        /// <param name="userId">用户ID.</param>
        /// <returns>Json.</returns>
        public ActionResult GetUserInfo(int userId)
        {
            var user = Db.Queryable<User>().Where(it => it.Id == userId).Single();
            object data = new
            {
                id = user.Id,
                name = user.Name,
                account = user.Account,
            };
            return Json(new { code = 200, data }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 初始化信息.
        /// </summary>
        /// <param name="userId">用户ID.</param>
        /// <returns>Json.</returns>
        public ActionResult GetAdminInfo(int userId)
        {
            var user = Db.Queryable<Admin>().Where(it => it.Id == userId).Single();
            object data = new
            {
                id = user.Id,
                name = user.Name,
                account = user.Account,
            };
            return Json(new { code = 200, data }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改信息.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="name">用户新昵称.</param>
        /// <returns>Json.</returns>
        public ActionResult EditUserInfo(int id, string name)
        {
            var user = Db.Queryable<User>().Where(it => it.Id == id).Single();
            user.Name = name;
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改信息.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="name">用户新昵称.</param>
        /// <returns>Json.</returns>
        public ActionResult EditAdminInfo(int id, string name)
        {
            var user = Db.Queryable<Admin>().Where(it => it.Id == id).Single();
            user.Name = name;
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改密码.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="password">用户新昵称.</param>
        /// <returns>Json.</returns>
        public ActionResult EditUserPassword(int id, string password)
        {
            var user = Db.Queryable<User>().Where(it => it.Id == id).Single();
            user.Password = password;
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改密码.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="password">用户新昵称.</param>
        /// <returns>Json.</returns>
        public ActionResult EditAdminPassword(int id, string password)
        {
            var user = Db.Queryable<Admin>().Where(it => it.Id == id).Single();
            user.Password = password;
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}