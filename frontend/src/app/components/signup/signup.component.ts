import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { User } from 'src/app/interfaces/user';
// import { ServerResponse } from 'node:http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy, OnInit {
  form: User = {
    name: '',
    email: '',
    password: '',
  };
  isLogedd: false;
  errorMessage: any;

  async onSubmit() {
    await this.userService
      .addUser(this.form.name, this.form.email, this.form.password)
      .subscribe(
        (response) => {
          //added user success!
          console.log('added user success!');
          
          this.router.navigate(['/log-in']);
        },
        (error) => {
          //Error callback
          console.error('error caught in component');
          this.errorMessage = error;
          // this.loading = false;

          //throw error;   //You can also throw the error to a global error handler
        }
      );

    // this._toastService.info('message');
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
