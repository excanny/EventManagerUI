import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../_environments";

import { Event } from '../_models';

@Injectable({ providedIn: 'root' })

export class EventService {

  apiURL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };

    getEvents(): Observable<Event> {
        return this.http
          .get<Event>(this.apiURL + '/Event/GetEvents')
          .pipe(retry(1), catchError(this.handleError));
    }

    createEvent(event: any): Observable<Event> {
        return this.http
          .post<Event>(
            this.apiURL + '/Event/CreateEvent',
            JSON.stringify(event),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      getEvent(id: any): Observable<Event> {
        return this.http
          .get<Event>(this.apiURL + '/Event/GetEvent?id=' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateEvent(id: any, event: any): Observable<Event> {
        return this.http
          .put<Event>(
            this.apiURL + '/Event/UpdateEvent?id=' + id,
            JSON.stringify(event),
            this.httpOptions
          )
          .pipe(retry(1), catchError(this.handleError));
      }

      deleteEvent(id: any) {
        return this.http
          .delete<Event>(this.apiURL + '/Event/DeleteEvent?id=' + id, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
      }

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) 
            errorMessage = error.error.message;
        else
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        
        window.alert(errorMessage);

        return throwError(() => {
            return errorMessage;
        });
    }
}