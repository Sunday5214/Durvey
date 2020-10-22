using DurveyServer.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DurveyServer.Model
{
    public class RTVoteModel
    {
        public int Idx { get; set; }
        public string Title { get; set; }
        public string FirstContent { get; set; }
        public string SecondContent { get; set; }
        public DateTime StartDatetime { get; set; }
        public DateTime EndDatetime { get; set; }
        public DateTime CreateDatetime { get; set; }
        public int FirstSelectedCount { get; set; }
        public int SecondSelectedCount { get; set; }

        internal (int?, HttpStatusCode) WriteRTVote(RTVoteModel rTVote)
        {
            try
            {
                string sql = @"INSERT INTO rtvotes(title, firstContent, secondContent, startDatetime, endDatetime, createDatetime) " +
                            "VALUES(@title, @firstContent, @secondContent,@startDatetime, @endDatetime, @createDatetime) " +
                            "RETURNING idx";
                using (var db = new MySqlHelper())
                {
                    return (db.QuerySingle<int>(sql, new {title=rTVote.Title, firstContent=rTVote.FirstContent,
                        secondContent = rTVote.SecondContent, startDatetime= MysqlFormatHelper.ConvertDatetime(rTVote.StartDatetime),
                        endDatetime= MysqlFormatHelper.ConvertDatetime(rTVote.EndDatetime),
                        createDatetime = MysqlFormatHelper.ConvertDatetime(rTVote.CreateDatetime)}), HttpStatusCode.OK);
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }

        }

        internal (int?, HttpStatusCode) Vote(int selectedNum, int idx)
        {
            try
            {
                string sql = "";
                if (selectedNum == 1)
                {
                    sql = $"update rtvotes set firstSelectedCount = firstSelectedCount + 1" +
                        $"where idx='{idx}'";
                }
                else
                {
                    sql = $"update rtvotes set secondSelectedCount = secondSelectedCount + 1" +
                        $"where idx='{idx}'";
                }
                using (var db = new MySqlHelper())
                {
                    return (db.Execute(sql, this), HttpStatusCode.OK);
                }

            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }

    }
}
