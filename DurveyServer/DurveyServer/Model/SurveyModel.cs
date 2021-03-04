using DurveyServer.Helper;
using DurveyServer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;
using Dapper;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace DurveyServer
{
    public class SurveyModel
    {
        
        internal (List<SurveyEntity>, HttpStatusCode) GetSurveys()
        {
            try
            {
                string sql = "select * from surveys";

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
                string sql = "select * from options where questionIdx = @questionIdx";

                List<OptionEntity> choices;
                DynamicParameters param = new DynamicParameters();
                param.Add("@questionIdx", questionIdx);
                using(var db = new MySqlHelper())
                {
                    choices = db.Query<OptionEntity>(sql, param);
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
                string sql = "select * from questions where surveyIdx = @surveyIdx";
                
                List<QuestionEntity> questions;
                DynamicParameters param = new DynamicParameters();
                param.Add("@surveyIdx", surveyIdx);
                using (var db = new MySqlHelper())
                {
                    questions = db.Query<QuestionEntity>(sql, param);
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


        internal (int?, HttpStatusCode) SubmitSurvey(SurveyResultData surveyResult)
        {
            try
            {
                string sql = "";
                int count = 0;
                DynamicParameters param = new DynamicParameters();
                
                using (var db = new MySqlHelper())
                {                    
                    foreach (var result in surveyResult.SurveyResults)
                    {
                        sql = "insert into survey_result (surveyIdx, questionIdx, answerUserIdx, answerText, answerNumber, questionType) " +
                            "value (@surveyIdx, @questionIdx, @answerUserIdx, @answerText, @answerNumber, @questionType)";
                        param.Add("@surveyIdx", surveyResult.SurveyIdx);
                        param.Add("@questionIdx", result.QuestionIdx);
                        param.Add("@answerUserIdx", result.AnswerUserIdx);
                        param.Add("@answerText", result.AnswerText);
                        param.Add("@answerNumber", result.AnswerNumber);
                        param.Add("@questionType", (int)result.QuestionType);
                        count += db.Execute(sql, param);
                        param = new DynamicParameters();
                    }
                    if(count == surveyResult.SurveyResults.Count)
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
                DynamicParameters param = new DynamicParameters();
                string sql = "insert into surveys (title, creatorIdx, createDatetime, startDatetime, endDatetime)" +
                    $"values (@title, @creatorIdx, @createDatetime, @startDatetime, @endDatetime); select LAST_INSERT_ID();";
                param.Add("@title", survey.Title);
                param.Add("@creatorIdx", survey.CreatorIdx);
                param.Add("@createDatetime", MysqlFormatHelper.ConvertDatetime(survey.CreateDatetime));
                param.Add("@startDatetime", MysqlFormatHelper.ConvertDatetime(survey.StartDatetime));
                param.Add("@endDatetime", MysqlFormatHelper.ConvertDatetime(survey.EndDatetime));
                using (var db = new MySqlHelper())
                {
                    return (db.QuerySingle<int>(sql, param), HttpStatusCode.OK);
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
                DynamicParameters questionParam = new DynamicParameters();
                DynamicParameters optionParam = new DynamicParameters();
                foreach (QuestionEntity question in questions)
                {
                    string sql = "insert into questions (content, surveyIdx, type, optionCount) values (@content, @surveyIdx, @type, @optionCount); " +
                    $"select LAST_INSERT_ID();";
                    questionParam.Add("@content", question.Content);
                    questionParam.Add("@surveyIdx", registedSurveyIdx);
                    questionParam.Add("@type", (int)question.Type);
                    questionParam.Add("@optionCount", question.Options != null ? question.Options.Count : 0);
                    using (var db = new MySqlHelper())
                    {
                        int questionIdx = db.QuerySingle<int>(sql, questionParam);
                        questionParam = new DynamicParameters();
                        if (question.Options != null)
                        {
                            string choiceSql = "";
                            int count = 0;
                            foreach (var option in question.Options)
                            {
                                count++;
                                choiceSql = "insert into options (content, questionIdx, number) values (@content, @questionIdx, @number)";
                                optionParam.Add("@content", option.Content);
                                optionParam.Add("@questionIdx", questionIdx);
                                optionParam.Add("@number", count);
                                db.Execute(choiceSql, optionParam);
                                optionParam = new DynamicParameters();
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

        internal List<OrganizedResultData> OrganizeResultData(List<SurveyResultEntity> surveyResults, List<SurveyResultEntity> distinctedQuestions)
        {
            List<OrganizedResultData> organizedResults = new List<OrganizedResultData>();

            for (int i = 0; i < distinctedQuestions.Count; i++)
            {
                organizedResults.Add(new OrganizedResultData 
                { 
                    QuestionIdx = distinctedQuestions[i].QuestionIdx, 
                    QuestionType= distinctedQuestions[i].QuestionType,
                });
                for(int j = 0; j< distinctedQuestions[i].OptionCount; j++)
                {
                    organizedResults[i].AnswerNumberList.Add(0);
                }
                
            }

            foreach(var surveyResult in surveyResults)
            {
                if(surveyResult.AnswerText != null)
                {
                    organizedResults[organizedResults.FindIndex(x => x.QuestionIdx == surveyResult.QuestionIdx)].AnswerTextList.Add(surveyResult.AnswerText);
                }
                else
                {
                    int idx = organizedResults.FindIndex(x => x.QuestionIdx == surveyResult.QuestionIdx);
                    organizedResults[idx].AnswerNumberList[surveyResult.AnswerNumber.Value-1]++;
                }
            }
            return organizedResults;
        }

        internal (List<OrganizedResultData>, HttpStatusCode) GetSurveyResult(int surveyIdx)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                string sql = "select idx, questionIdx, answerUserIdx, answerText, answerNumber, questionType" +
                    " from survey_result where surveyIdx = @surveyIdx";

                string optionCountSql = "select distinct optionCount, questionIdx, content, questionType from (select idx, optionCount, content from questions where surveyIdx=@surveyIdx) as qs " +
                    "join (select questionIdx, questionType from survey_result where surveyIdx=@surveyIdx) as sr on qs.idx=sr.questionIdx";
                param.Add("@surveyIdx", surveyIdx);
                using (var db = new MySqlHelper())
                {
                    return (OrganizeResultData(db.Query<SurveyResultEntity>(sql, param), db.Query<SurveyResultEntity>(optionCountSql, param)), HttpStatusCode.OK);
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }
    }
}
