import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator{

  isPasswordContainsNumber (control: AbstractControl) : ValidationErrors{
    const regex = /\d/;
    if (regex.test(control.value) && control.value !==null){
      return null;
    } else{
      return {passwordInvalid:true}
    }
  }

  static isPasswordMatch(control: AbstractControl) : ValidationErrors{
    const password = control.get("password").value;
    const passwordConfirm = control.get("confirmPassword").value;
    if(password=== passwordConfirm && (password !==null && passwordConfirm!==null)){
      return null;
    }else{
      return {passwordNotMatch:true}
    }
  }
}
