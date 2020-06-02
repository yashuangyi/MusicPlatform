// Copyright (c) PlaceholderCompany. All rights reserved.

using MusicPlatform.DB;
using MusicPlatform.Models;
using SqlSugar;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MusicPlatform.Controllers
{
    /// <summary>
    /// 评论管理界面的控制器.
    /// </summary>
    public class CommentManageController : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 进入评论管理界面.
        /// </summary>
        /// <returns>评论管理界面.</returns>
        public ActionResult CommentManage()
        {
            return View();
        }

        /// <summary>
        /// 获取评论列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <returns>歌库列表.</returns>
        public ActionResult GetComment(int page, int limit, string search)
        {
            List<CommentDTO> list = null;
            int count;
            // 分页操作，Skip()跳过前面数据项
            if (string.IsNullOrEmpty(search))
            {
                var temp = Db.Queryable<Comment, User>((c, u) => new object[]
            {
                    JoinType.Inner, c.UserId == u.Id,
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
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                var temp = Db.Queryable<Comment, User>((c, u) => new object[]
            {
                    JoinType.Inner, c.UserId == u.Id && u.Name.Contains(search),
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
                list = temp.Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }
    }
}