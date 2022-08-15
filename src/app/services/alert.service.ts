import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";


@Injectable()
export class AlertService {
    constructor() { }

    success(msg: string) {
        this.alert(msg, 'success')
    }

    error(msg: string) {
        this.alert(msg, 'error');
    }

    alert(message?: string, type?: any) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder') as HTMLElement;
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

}