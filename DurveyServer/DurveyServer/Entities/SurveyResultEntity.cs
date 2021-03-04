using DurveyServer.Enum;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{

    public class SurveyResultEntity
    {
        public int Idx { get; set; }
        public int QuestionIdx { get; set; }
        public int AnswerUserIdx { get; set; }
#nullable enable
        public string? AnswerText { get; set; }
        public int? AnswerNumber { get; set; }
#nullable disable
        public QuestionType QuestionType { get; set; }
        public int OptionCount { get; set; }
    }

    public class OrganizedResultData
    {
        public int QuestionIdx { get; set; }
        public QuestionType QuestionType { get; set; }
        public string Content { get; set; }
        public List<string> AnswerTextList { get; set; } = new List<string>();
        public List<int> AnswerNumberList { get; set; } = new List<int>();
    }


    public class SurveyResultData
    {
        public int SurveyIdx { get; set; }
        public List<SurveyResultEntity> SurveyResults { get; set; }
    }

    public class SurveyResultComparer : IEqualityComparer<SurveyResultEntity>
    {
        public bool Equals([AllowNull] SurveyResultEntity x, [AllowNull] SurveyResultEntity y)
        {
            if (x.QuestionIdx == y.QuestionIdx) return true;
            else return false;
        }

        public int GetHashCode([DisallowNull] SurveyResultEntity obj)
        {
            if (ReferenceEquals(obj, null)) return 0;
            else return 1;
        }
    }
}
