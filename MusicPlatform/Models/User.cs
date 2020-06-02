using SqlSugar;

namespace MusicPlatform.Models
{
    /// <summary>
    /// 用户实体类.
    /// </summary>
    [SugarTable("user")]
    public partial class User
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 账号.
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// Gets or sets 密码.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets 姓名.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets 喜爱的音乐.
        /// </summary>
        public string Love { get; set; }
    }
}