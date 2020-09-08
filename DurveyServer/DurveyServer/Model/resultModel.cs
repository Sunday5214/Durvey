using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DurveyServer.Model
{
    public class resultModel<T>
    {
        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }

    public class Default
    {

    }
}
