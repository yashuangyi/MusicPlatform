using SqlSugar;

namespace MusicPlatform.Models
{
    /// <summary>
    /// 评论实体类.
    /// </summary>
    [SugarTable("comment")]
    public partial class Comment
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 用户id.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets 歌曲id.
        /// </summary>
        public int SongId { get; set; }

        /// <summary>
        /// Gets or sets 评论时间.
        /// </summary>
        public string Time { get; set; }

        /// <summary>
        /// Gets or sets 评论内容.
        /// </summary>
        public string Content { get; set; }
    }
}