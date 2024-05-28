import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ownerId: string = '';

  setOwnerId(id: string): void {
    this.ownerId = id;
  }

  getOwnerId(): string {
    return this.ownerId;
  }

  constructor() { }
}
