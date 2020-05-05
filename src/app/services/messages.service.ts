import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }
errorMessage (title: string, message: string ){
  Swal.fire({
    title: title,
    text: message,
    icon: "error"
  })
}

successMessage (title: string, message: string ){
  Swal.fire({
    title: title,
    text: message,
    icon: "success"
  })
}
}
