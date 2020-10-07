using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Helper
{
    public class MysqlFormatHelper
    {
        public static string ConvertDatetime(DateTime datetime)
        {
            return datetime.ToString("yyyy-MM-dd hh:mm:ss");
        }

        public static string ConvertBoolean(bool value)
        {
            return (value ? "1" : "0");
        }
    }
}
