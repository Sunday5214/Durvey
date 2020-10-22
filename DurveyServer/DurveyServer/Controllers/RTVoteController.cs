using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DurveyServer.Hubs;
using DurveyServer.Entities;
using Microsoft.AspNetCore.Mvc;
using DurveyServer.Model;

namespace DurveyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RTVoteController : ControllerBase
    {
        RTVoteModel rTVoteModel = new RTVoteModel();
        RTVoteHub voteHub = new RTVoteHub();

        [Route("[action]")]
        [HttpPost]
        public ResponseEntity<int?> MakeRTVote([FromBody] RTVoteModel rTVoteModelLocal)
        {
            (int? Data, HttpStatusCode Status) makeResult = rTVoteModelLocal.WriteRTVote(rTVoteModelLocal);
            if (makeResult.Data == null)
            {
                return new ResponseEntity<int?>()
                {
                    Data = null,
                    Message = "서버오류",
                    Status = makeResult.Status
                };
            }
            else
            {
                return new ResponseEntity<int?>()
                {
                    Data = makeResult.Data,
                    Message = "성공적으로 만들었습니다.",
                    Status = makeResult.Status
                };
            }
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<ResponseEntity<Default>> Vote(int selectedNum, int roomIdx)
        {
            (int? Data, HttpStatusCode Status) voteResult = rTVoteModel.Vote(selectedNum, roomIdx);

            if(voteResult.Data == null)
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "서버오류",
                    Status = voteResult.Status
                };
            }
            else
            {
                await voteHub.Vote(roomIdx);
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "성공적으로 투표되었습니다.",
                    Status = voteResult.Status

                };
            }
        }
    }
}
