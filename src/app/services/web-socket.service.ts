import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SOCKET_BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket?: Socket;
  constructor() { }
  connect(userId: string) {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = new Socket({
      url: SOCKET_BASE_URL,
      options: {
        query: {
          userId,
        },
      },
    });
  };
  getMessage(): any {
    if (!this.socket){
      return;
    }
    return this.socket.fromEvent('message');
    // return this.socket.on('message', (res:any) => {
    //   console.log('res', res)
    // })
  }
}
