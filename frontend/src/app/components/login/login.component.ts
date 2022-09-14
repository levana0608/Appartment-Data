import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    password: '',
  };
  isLogedd: false;
  errorMessage: any;

  async onSubmit() {
    await this.userService
      .logInUser(this.form.email, this.form.password)
      .subscribe(
        (response) => {
          window.localStorage.setItem('token', response);

          let token = JSON.parse(localStorage.getItem('token'));
         console.log(token);
         

          // this.userService.isUserLoggedIn = true;

          console.log(token["id"]);

          this.router.navigate(['/home']);
          // window.location.reload();
        },
        (error) => {
          //Error callback
          console.error('error caught in component');
          this.errorMessage = error;
          // this.loading = false;

          //throw error;   //You can also throw the error to a global error handler
        }
      );
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
}
