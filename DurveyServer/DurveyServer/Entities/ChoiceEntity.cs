using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{
    public class ChoiceEntity
    {
        public int Idx { get; set; }
        public string Content { get; set; }
        public int QuestionIdx { get; set; }
        public int Number { get; set; }
        public int SelectCount { get; set; }
    }
}
