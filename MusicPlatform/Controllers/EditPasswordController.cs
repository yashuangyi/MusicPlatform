// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 修改密码界面的控制器.
    /// </summary>
    public class EditPasswordController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入修改密码界面.
        /// </summary>
        /// <returns>修改密码界面.</returns>
        public ActionResult EditPassword()
        {
            return View();
        }

        /// <summary>
        /// 修改信息.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="password">用户新密码.</param>
        /// <returns>Json.</returns>
        public ActionResult EditUserPassword(int id, string password)
        {
            var user = Db.Queryable<User>().Where(it => it.Id == id).Single();
            user.Password = password;
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改信息.
        /// </summary>
        /// <param name="id">用户id.</param>
        /// <param name="password">用户新密码.</param>
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