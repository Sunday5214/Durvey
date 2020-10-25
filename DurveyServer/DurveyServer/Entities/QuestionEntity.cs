﻿using DurveyServer.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Entities
{
    public class QuestionEntity
    {
        public int Idx { get; set; }
        public string QuestionContent { get; set; }
        public int SurveyIdx { get; set; }
        public QuestionType QuestionType { get; set; }
        public bool IsNecessary { get; set; }
        public List<ChoiceEntity> Choices { get; set; }
    }
}