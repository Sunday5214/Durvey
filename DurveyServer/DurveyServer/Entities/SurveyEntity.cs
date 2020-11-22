using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{
    public class SurveyEntity
    {
        public int Idx { get; set; }
        public string Title { get; set; }
        public int CreatorIdx { get; set; }
        public DateTime CreateDatetime { get; set; }
        public DateTime StartDatetime { get; set; }
        public DateTime EndDatetime { get; set; }
    }
}
