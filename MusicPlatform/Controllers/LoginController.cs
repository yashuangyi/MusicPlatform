// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 登录界面的控制器.
    /// </summary>
    public class LoginController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入后台登录界面.
        /// </summary>
        /// <returns>后台登录界面.</returns>
        public ActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// 后台登录校验.
        /// </summary>
        /// <param name="user">后台登录信息.</param>
        /// <returns>状态码.</returns>
        public ActionResult Check(User user)
        {
            var account = user.Account;
            var password = user.Password;
            if (string.IsNullOrEmpty(account) || string.IsNullOrEmpty(password))
            {
                return Json(new { code = 401 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var login = Db.Queryable<Admin>().Where(it => it.Account == account && it.Password == password).Single();
                
                // 管理员
                if (login != null)
                {
                    Session.Add("userId", login.Id);
                    Session.Add("userPower", "管理员");
                    return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var login2 = Db.Queryable<User>().Where(it => it.Account == account && it.Password == password).Single();
                    if (login2 != null)
                    {
                        Session.Add("userId", login2.Id);
                        Session.Add("userPower", "用户");
                        return Json(new { code = 201 }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new { code = 404 }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        /// <summary>
        /// 游客登录.
        /// </summary>
        /// <returns>状态码.</returns>
        public ActionResult Tourist()
        {
            Session.Add("userId", 0);
            Session.Add("userPower", "游客");
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新建用户账户.
        /// </summary>
        /// /// <param name="user">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult AddUser(User user)
        {
            var isExist = Db.Queryable<User>().Where(it => it.Account == user.Account).Single();
            if (isExist != null)
            {
                return Json(new { code = 402 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 自增列用法
                Db.Insertable(user).ExecuteReturnIdentity();
                return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}