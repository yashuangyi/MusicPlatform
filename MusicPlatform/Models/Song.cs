using SqlSugar;

namespace MusicPlatform.Models
{
    /// <summary>
    /// 歌曲实体类.
    /// </summary>
    [SugarTable("song")]
    public partial class Song
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 歌名.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets 歌手.
        /// </summary>
        public string SingerName { get; set; }

        /// <summary>
        /// Gets or sets 语言.
        /// </summary>
        public string Language { get; set; }

        /// <summary>
        /// Gets or sets 风格.
        /// </summary>
        public string Style { get; set; }

        /// <summary>
        /// Gets or sets 是否推荐.
        /// </summary>
        public int IsRecommend { get; set; }

        /// <summary>
        /// Gets or sets 发布时间.
        /// </summary>
        public string Time { get; set; }

        /// <summary>
        /// Gets or sets 播放量.
        /// </summary>
        public int Times { get; set; }

        /// <summary>
        /// Gets or sets 歌曲路径.
        /// </summary>
        public string SongPath { get; set; }

        /// <summary>
        /// Gets or sets 歌词路径.
        /// </summary>
        public string WordPath { get; set; }
    }
}