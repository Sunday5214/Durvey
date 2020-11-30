using DurveyServer.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{
    public class QuestionEntity
    {
        public int Idx { get; set; }
        public string Content { get; set; }
        public QuestionType Type { get; set; }
        public List<OptionEntity> Options { get; set; }
    }

    public class QuestionData
    {
        public List<QuestionEntity> Questions { get; set; }
        public int RegistedSurveyIdx { get; set; }
    }
}
