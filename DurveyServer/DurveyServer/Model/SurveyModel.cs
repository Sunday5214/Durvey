using DurveyServer.Helper;
using DurveyServer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;

namespace DurveyServer
{
    public class SurveyModel
    {
        
        internal (List<SurveyEntity>, HttpStatusCode) GetSurveys()
        {
            try
            {
                string sql = $"select * from surveys";

                List<SurveyEntity> surveys;
                using (var db = new MySqlHelper())
                {
                    surveys = db.Query<SurveyEntity>(sql, this);

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



        private List<OptionEntity> GetOptions(int questionIdx)
        {
            try
            {
                string sql = $"select * from options where questionIdx ='{questionIdx}'";

                List<OptionEntity> choices;
                using(var db = new MySqlHelper())
                {
                    choices = db.Query<OptionEntity>(sql, this);
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

        internal (List<QuestionEntity>, HttpStatusCode) GetQuestions(int surveyIdx)
        {
            try
            {
                string sql = $"select * from questions where surveyIdx = '{surveyIdx}'";

                List<QuestionEntity> questions;
                using(var db = new MySqlHelper())
                {
                    questions = db.Query<QuestionEntity>(sql, this);
                }

                foreach(QuestionEntity question in questions)
                {
                    question.Options = GetOptions(question.Idx);
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


        internal (int?, HttpStatusCode) SubmitSurvey(List<SurveyResultEntity> surveyResults)
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
        
        internal (int?, HttpStatusCode) WriteSurvey(SurveyEntity survey)
        {
            try
            {
                string sql = $"insert into surveys (title, creatorIdx, createDatetime, startDatetime, endDatetime)" +
                    $"values ('{survey.Title}', '{survey.CreatorIdx}', '{MysqlFormatHelper.ConvertDatetime(survey.CreateDatetime)}', " +
                    $"'{MysqlFormatHelper.ConvertDatetime(survey.StartDatetime)}', " +
                    $"'{MysqlFormatHelper.ConvertDatetime(survey.EndDatetime)}'); select LAST_INSERT_ID();";
                using(var db = new MySqlHelper())
                {
                    return (db.QuerySingle<int>(sql, this), HttpStatusCode.OK);
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }

        internal (int?, HttpStatusCode) WriteQuestion(List<QuestionEntity> questions, int registedSurveyIdx)
        {
            try
            {
                foreach(QuestionEntity question in questions)
                {
                    string sql = $"insert into questions (Content, surveyIdx, Type) values " +
                    $"('{question.Content}', '{registedSurveyIdx}', '{(int)question.Type}'); " +
                    $"select LAST_INSERT_ID();";

                    using (var db = new MySqlHelper())
                    {
                        int questionIdx = db.QuerySingle<int>(sql, this);
                        if (question.Options != null)
                        {
                            string choiceSql = "";
                            int count = 0;
                            foreach (var option in question.Options)
                            {
                                count++;
                                choiceSql = $"insert into options (Content, questionIdx, number) values ('{option.Content}', '{questionIdx}', '{count}')";
                                db.Execute(choiceSql, this);
                            }
                        }
                    }   
                }
                return (null, HttpStatusCode.OK);

            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }
    }
}
