using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{
    public class OptionEntity
    {
        public int Idx { get; set; }
        public string optionContent { get; set; }
        public int QuestionIdx { get; set; }
        public int Number { get; set; }
        public int SelectCount { get; set; }
    }
}
