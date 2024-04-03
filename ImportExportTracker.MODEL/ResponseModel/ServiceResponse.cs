using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Reflection.Metadata;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ImportExportTracker.MODEL.Response
{
        public class ServiceResponse
        {
            public object Data { get; set; }
            public ResponseStatus Msg { get; set; }
            public ServiceResponse(bool status = true, string message = "", MessageType messageType = MessageType.Success)
            {
                Msg = new ResponseStatus()
                {
                    Status = status,
                    Message = message,
                    MessageType = messageType.ToString()
                };
            }
        }

        public class ServiceResponse<T> : ServiceResponse
        {
            private T? ResposeData { get; set; }
            public new T Data
            {
                get => ResposeData;
                set => base.Data = ResposeData = value;
            }


            public ServiceResponse(bool status = true, string message = "", MessageType messageType = MessageType.Success)
                : base(status, message, messageType)
            {
            }


        }

        public class ResponseStatus
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public string MessageType { get; set; }
        }
   
}
