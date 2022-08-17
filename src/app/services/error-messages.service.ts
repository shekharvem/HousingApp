import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "./alert.service";

@Injectable()
export class ErrorMessagesService {
    constructor(private alertService: AlertService) { }


    handleError(err: HttpErrorResponse) {
        if (err && err.error.error) {
            this.alertService.error(this.errorMessages[err.error.error.message]);
        } else {
            this.alertService.error(this.errorMessages['UNKNOWN']);
        }
    }

    errorMessages: any = {
        UNKNOWN: 'The UnKnown error occured',
        EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier.The user may have been deleted.",
        INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
        USER_DISABLED: "The user account has been disabled by an administrator.",
        OPERATION_NOT_ALLOWED: "Anonymous user sign-in is disabled for this project",
        INVALID_EMAIL: "Enter A Valid Email."
    }

}