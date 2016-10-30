import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class SocketService {
  private url = 'http://localhost:8080';
  private socket;
  constructor() {}
  getSocket(userId) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(`${userId}`, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
