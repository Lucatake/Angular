import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: string, dismissTimeout?: number) {
    let bsModalRef: BsModalRef = new BsModalRef();
    bsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING);
  }

  showAlertInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO, 1000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    let bsModalRef: BsModalRef = new BsModalRef();
    bsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) bsModalRef.content.okTxt = okTxt;
    if (cancelTxt) bsModalRef.content.cancelTxt = cancelTxt;

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
