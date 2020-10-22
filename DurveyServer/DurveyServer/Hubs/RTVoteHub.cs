using DurveyServer.Model;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Hubs
{
    public class RTVoteHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public Task JoinRoom(int roomIdx)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomIdx.ToString());
        }

        public Task LeaveRoom(int roomIdx)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomIdx.ToString());
        }

        public async Task Vote(int roomIdx)
        {
            await Clients.Group(roomIdx.ToString()).SendAsync("vote");
        }
    }
}
