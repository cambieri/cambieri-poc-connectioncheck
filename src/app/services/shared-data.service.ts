import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private ONLINE_OBJ: any = { isOnline: true, status: "ONLINE", message: "I'm online" };
  private OFFLINE_OBJ: any = { isOnline: false, status: "OFFLINE", message: "I'm offline" };

  // Observable sources
  private connectionObjectSource = new Subject<any>();

  // Observable streams
  public connectionObject$ = this.connectionObjectSource.asObservable();

  public IS_ONLINE: boolean;
  public NETWORK_STATUS: string;

  constructor() {
    this.setConnectionProperties(navigator.onLine);
    window.addEventListener('online', (e) => {
      this.setConnectionProperties(true);
    });
    window.addEventListener('offline', (e) => {
      this.setConnectionProperties(false);
    });
  }

  // Service connection message commands
  private updateConnectionObject(connectionObj: any) {
    this.connectionObjectSource.next(connectionObj);
  }

  private setConnectionProperties(isOnline: boolean) {
    let connectionObj = isOnline ? this.ONLINE_OBJ : this.OFFLINE_OBJ;
    this.IS_ONLINE = connectionObj.isOnline;
    this.NETWORK_STATUS = connectionObj.status;
    this.updateConnectionObject(connectionObj);
  }

  public forceOnline() {
    this.setConnectionProperties(true);
  }

  public forceOffline() {
    this.setConnectionProperties(false);
  }

}
