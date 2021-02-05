import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";

import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
          catchError(error=>{
              if( error instanceof HttpErrorResponse){
                  const applicationError=error.headers.get("Application-Error");
                  if(applicationError){
                      console.error(applicationError);
                      return throwError(applicationError);
                  }

                  //ModelStateError
                  const serverError=error.error;
                  let ModelStateErrors='';
                  if(serverError && typeof serverError==='object'){
                      for(const key in serverError){
                          if(serverError[key]){
                            ModelStateErrors += serverError[key]+'\n';
                          }
                      }
                  }
                  if(error.status===401){
                      return throwError(error.statusText);
                  }
                  return throwError(ModelStateErrors || serverError || 'Server Error');
              }
          })
      )
    }

}

export const ErrorInterceptorProvider={ 
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass:ErrorInterceptor
}