using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DurveyServer.Entities;
using DurveyServer.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DurveyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserModel userModel = new UserModel();
        [HttpGet]
        public ResponseEntity<List<UserModel>> Users()
        {
            
            (List<UserModel> Data, HttpStatusCode Status) userList = userModel.GetUsers();
            if (userList.Data != null)
            {
                return new ResponseEntity<List<UserModel>>()
                {
                    Data = userList.Data,
                    Message = "성공적으로 조회되었습니다",
                    Status = userList.Status
                };
            }
            else if (userList.Status == HttpStatusCode.InternalServerError)
            {
                return new ResponseEntity<List<UserModel>>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = userList.Status
                };
            }
            else
            {
                return new ResponseEntity<List<UserModel>>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = userList.Status
                };
            };
        }



        [Route("[action]")]
        [HttpGet]
        public ResponseEntity<UserModel> Login(string userEmail)
        {
            (UserModel Data, HttpStatusCode Status) loginedUser = userModel.Login(userEmail);
            if (loginedUser.Status == HttpStatusCode.OK)
            {
                return new ResponseEntity<UserModel>()
                {
                    Data = loginedUser.Data,
                    Message = "로그인 성공",
                    Status = loginedUser.Status
                };
            }
            else if(loginedUser.Status == HttpStatusCode.InternalServerError)
            {
                return new ResponseEntity<UserModel>()
                {
                    Data = null,
                    Message = "서버 에러",
                    Status = loginedUser.Status
                };
            }
            else
            {
                return new ResponseEntity<UserModel>()
                {
                    Data = null,
                    Message = "없는 리소스입니다.",
                    Status = loginedUser.Status
                };
            }
        }


        [Route("[action]")]
        [HttpPost]
        public ResponseEntity<Default> Register([FromBody]UserModel user)
        {
            (int? Data, HttpStatusCode Status) registerUser = user.Register(user.Name, user.Email);
            if(registerUser.Data == null)
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "서버 오류",
                    Status = registerUser.Status
                };
            }
            else
            {
                return new ResponseEntity<Default>()
                {
                    Data = null,
                    Message = "성공적으로 가입되었습니다.",
                    Status = registerUser.Status
                };
            }
        }

        
    }

}
           
