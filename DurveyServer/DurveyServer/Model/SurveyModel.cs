using DurveyServer.Helper;
using DurveyServer.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;

namespace DurveyServer
{
    public class SurveyModel
    {
        
        internal (List<Survey>, HttpStatusCode) GetSurveys()
        {
            try
            {
                string sql = $"select * from surveys";

                List<Survey> surveys;
                using (var db = new MySqlHelper())
                {
                    surveys = db.Query<Survey>(sql, this);

                }

                if(surveys == null)
                {
                    return (null, HttpStatusCode.NotFound);
                }

                return (surveys, HttpStatusCode.OK);

            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }

        private List<Choice> GetChoices(int questionIdx)
        {
            try
            {
                string sql = $"select * from choices where quetionIdx ='{questionIdx}'";

                List<Choice> choices;
                using(var db = new MySqlHelper())
                {
                    choices = db.Query<Choice>(sql, this);
                }

                if(choices == null)
                {
                    throw new Exception("");
                }

                return choices;
            }
            catch
            {
                throw new Exception("");
            }
        }

        internal (List<Question>, HttpStatusCode) GetQuestions(int surveyIdx)
        {
            try
            {
                string sql = $"select * from questions where surveyIdx = '{surveyIdx}'";

                List<Question> questions;
                using(var db = new MySqlHelper())
                {
                    questions = db.Query<Question>(sql, this);
                }

                foreach(Question question in questions)
                {
                    question.Choices = GetChoices(question.Idx);
                }

                if(questions == null)
                {
                    return (null, HttpStatusCode.NotFound);
                }

                return (questions, HttpStatusCode.OK);
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }

        internal (int?, HttpStatusCode) SubmitSurvey(List<SurveyResult> surveyResults)
        {
            try
            {
                string sql = "";
                int count = 0;

                using(var db = new MySqlHelper())
                {                    
                    foreach (var surveyResult in surveyResults)
                    {
                        sql = $"insert into user (surveyIdx, questionIdx, answerUserIdx, answerText, answerNumber, questionType) " +
                    $"value ('{surveyResult.SurveyIdx}', '{surveyResult.questionIdx}', " +
                    $"'{surveyResult.AnswerUserIdx}', '{surveyResult.AnswerText}', '{surveyResult.AnswerNumber}'" +
                    $"'{surveyResult.QuestionType}')";
                       count += db.Execute(sql, this);
                    }
                    if(count == surveyResults.Count)
                    {
                        return (count, HttpStatusCode.OK);
                    }
                    else
                    {
                        return (count, HttpStatusCode.InternalServerError);
                    }
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }
        
        internal (int?, HttpStatusCode) WriteSurvey(Survey survey)
        {
            try
            {
                string sql = $"insert into surveys (title, creatorIdx, description, createDatetime, startDatetime, endDatetime, IsAnonymous) value ('{survey.Title}', '{survey.CreatorIdx}', '{survey.Description}', '{survey.CreateDatetime}', '{survey.StartDatetime}', '{survey.EndDatetime}')";
                using(var db = new MySqlHelper())
                {
                    return (db.Execute(sql, this), HttpStatusCode.OK);
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }

        internal (int?, HttpStatusCode) AddQuestion(Question question)
        {
            try
            {
                string sql = $"insert into questions (questionContent, surveyIdx, questionType, isNecessary) value ('{question.QuestionContent}', '{question.SurveyIdx}', '{question.QuestionType}', '{question.IsNecessary}')";
                using(var db = new MySqlHelper())
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
