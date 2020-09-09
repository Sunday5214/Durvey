using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using DurveyServer.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DurveyServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController : ControllerBase
    {

        private readonly ILogger<SurveyController> _logger;

        public SurveyController(ILogger<SurveyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("[action]")]
        public resultModel<List<Survey>> Surveys()
        {
            SurveyModel surveyModel = new SurveyModel();
            (List<Survey> Data, HttpStatusCode Status) surveyList = surveyModel.GetSurveys();

            if(surveyList.Data != null)
            {
                return new resultModel<List<Survey>>()
                {
                    Data = surveyList.Data,
                    Message = "성공적으로 조회되었습니다",
                    Status = surveyList.Status
                };
            }
            else if (surveyList.Status == HttpStatusCode.InternalServerError)
            {
                return new resultModel<List<Survey>>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = surveyList.Status
                };
            }
            else
            {
                return new resultModel<List<Survey>>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = surveyList.Status
                };
            }
        }


        [HttpGet]
        [Route("question/[action]")]
        public resultModel<List<Question>> Questions(int surveyIdx)
        {
            SurveyModel surveyModel = new SurveyModel();
            (List<Question> Data, HttpStatusCode Status) questionList = surveyModel.GetQuestions(surveyIdx);

            if(questionList.Data != null)
            {
                return new resultModel<List<Question>>()
                {
                    Data = questionList.Data,
                    Message = "성공적으로 조회되었습니다.",
                    Status = questionList.Status
                };
            }
            else if(questionList.Status == HttpStatusCode.InternalServerError)
            {
                return new resultModel<List<Question>>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = questionList.Status
                };
            }
            else
            {
                return new resultModel<List<Question>>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = questionList.Status
                };
            }
        }

        [Route("[action]")]
        [HttpPost]
        public resultModel<Default> Submit([FromBody] List<SurveyResult> surveyResults)
        {
            SurveyModel surveyModel = new SurveyModel();
            (int? Data, HttpStatusCode Status) submitResult = surveyModel.SubmitSurvey(surveyResults);
            if(submitResult.Data == null)
            {
                return new resultModel<Default>()
                {
                    Data = null,
                    Message = "서버 오류",
                    Status = submitResult.Status
                };
            }
            else
            {
                return new resultModel<Default>()
                {
                    Data = null,
                    Message = "성공적으로 제출되었습니다.",
                    Status = submitResult.Status
                };
            }
        }

        [Route("[action]")]
        [HttpPost]
        public resultModel<Default> Write([FromBody]Survey survey)
        {
            SurveyModel surveyModel = new SurveyModel();
            (int? Data, HttpStatusCode Status) writeResult = surveyModel.WriteSurvey(survey);

        }
    }
}
