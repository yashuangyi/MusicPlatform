using SqlSugar;

namespace MusicPlatform.Models
{
    /// <summary>
    /// 收藏关联实体类.
    /// </summary>
    [SugarTable("star")]
    public partial class Star
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 用户编号.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets 歌曲编号.
        /// </summary>
        public int SongId { get; set; }
    }
}