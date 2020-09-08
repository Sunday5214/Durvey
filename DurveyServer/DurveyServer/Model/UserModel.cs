using DurveyServer.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DurveyServer.Model
{
    public class UserModel
    {
        public int Idx { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        /// <summary>
        /// 회원가입 처리 로직, 회원가입에 성공하면 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        internal (int?, HttpStatusCode) Register(string name, string email)
        {
            try
            {
                string sql = $"insert into users (name, email) value ('{name}', '{email}')";

                using (var db = new MySqlHelper())
                {
                    return (db.Execute(sql, this), HttpStatusCode.OK);
                }
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }

        }

        /// <summary>
        /// 로그인 처리 로직, 로그인에 성공하면 사용자 객체를 반환함
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        internal (UserModel, HttpStatusCode) Login(string email)
        {
            try
            {
                string sql = $"select * from users where email = '{email}'";

                UserModel user;

                using (var db = new MySqlHelper())
                {
                    user = db.QuerySingle<UserModel>(sql, this);
                }

                if (user == null)
                {
                    return (null, HttpStatusCode.NotFound);
                }

                return (user, HttpStatusCode.OK);

            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
            
        }

        internal (List<UserModel>, HttpStatusCode) GetUsers()
        {
            try
            {
                string sql = @"select * from users";

                List<UserModel> users;

                using (var db = new MySqlHelper())
                {
                    users = db.Query<UserModel>(sql, this);
                }
                if (users == null)
                {
                    return (users, HttpStatusCode.NotFound);
                }

                return (users, HttpStatusCode.OK);
            }
            catch
            {
                return (null, HttpStatusCode.InternalServerError);
            }
        }
    }
}
