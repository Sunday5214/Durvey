using DurveyServer.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{

    public class SurveyResultEntity
    {
        public int Idx { get; set; }
        public int QuestionIdx { get; set; }
        public int AnswerUserIdx { get; set; }
        public string? AnswerText { get; set; }
        public int? AnswerNumber { get; set; }
        public QuestionType QuestionType { get; set; }
    }

    public class SurveyResultData
    {
        public int SurveyIdx { get; set; }
        public List<SurveyResultEntity> SurveyResults { get; set; }
    }
}
