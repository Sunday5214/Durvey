using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Threading.Tasks;
using DurveyServer.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.Extensions.Logging;

namespace DurveyServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController : ControllerBase
    {
        SurveyModel surveyModel = new SurveyModel();
        private readonly ILogger<SurveyController> _logger;

        public SurveyController(ILogger<SurveyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("[action]")]
        public ResponseEntity<List<SurveyEntity>> Surveys()
        {
            (List<SurveyEntity> Data, HttpStatusCode Status) surveyList = surveyModel.GetSurveys();

            if(surveyList.Data != null)
            {
                return new ResponseEntity<List<SurveyEntity>>()
                {
                    Data = surveyList.Data,
                    Message = "성공적으로 조회되었습니다",
                    Status = surveyList.Status
                };
            }
            else if (surveyList.Status == HttpStatusCode.InternalServerError)
            {
                return new ResponseEntity<List<SurveyEntity>>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = surveyList.Status
                };
            }
            else
            {
                return new ResponseEntity<List<SurveyEntity>>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = surveyList.Status
                };
            }
        }


        [HttpGet]
        [Route("question/[action]")]
        public ResponseEntity<List<QuestionEntity>> Questions(int surveyIdx)
        {
           
            (List<QuestionEntity> Data, HttpStatusCode Status) questionList = surveyModel.GetQuestions(surveyIdx);

            if(questionList.Data != null)
            {
                return new ResponseEntity<List<QuestionEntity>>()
                {
                    Data = questionList.Data,
                    Message = "성공적으로 조회되었습니다.",
                    Status = questionList.Status
                };
            }
            else if(questionList.Status == HttpStatusCode.InternalServerError)
            {
                return new ResponseEntity<List<QuestionEntity>>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = questionList.Status
                };
            }
            else
            {
                return new ResponseEntity<List<QuestionEntity>>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = questionList.Status
                };
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ResponseEntity<Default> Submit([FromBody] SurveyResultData surveyResults)
        {
            (int? Data, HttpStatusCode Status) submitResult = surveyModel.SubmitSurvey(surveyResults);
            if(submitResult.Data == null)
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "서버 오류",
                    Status = submitResult.Status
                };
            }
            else
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "성공적으로 제출되었습니다.",
                    Status = submitResult.Status
                };
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ResponseEntity<int?> Write([FromBody]SurveyEntity survey)
        {
            (int? Data, HttpStatusCode Status) writeResult = surveyModel.WriteSurvey(survey);
            if(writeResult.Data == null)
            {
                return new ResponseEntity<int?>()
                {
                    Data = null,
                    Message = "서버 오류",
                    Status = writeResult.Status
                };
            }
            else
            {
                return new ResponseEntity<int?>()
                {
                    Data = writeResult.Data,
                    Message = "성공적으로 생성되었습니다.",
                    Status = writeResult.Status
                };
            }
        }

        [Route("question/[action]")]
        [HttpPost]
        public ResponseEntity<Default> Write([FromBody] QuestionData questionData)
        {
            (int? Data, HttpStatusCode Status) addResult = surveyModel.WriteQuestion(questionData.Questions, questionData.RegistedSurveyIdx);
            if (addResult.Data == null)
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "서버 오류",
                    Status = addResult.Status
                };
            }
            else
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "성공적으로 추가되었습니다.",
                    Status = addResult.Status
                };
            }
        }

       

    }
}
