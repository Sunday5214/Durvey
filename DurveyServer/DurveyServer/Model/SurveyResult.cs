using DurveyServer.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Model
{
    public class SurveyResult
    {
        public int Idx { get; set; }
        public int SurveyIdx { get; set; }
        public int questionIdx { get; set; }
        public int AnswerUserIdx { get; set; }
        public string AnswerText { get; set; }
        public int AnswerNumber { get; set; }
        public QuestionType QuestionType { get; set; }
    }
}
