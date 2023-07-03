import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.userService.setUser();
    this.userForm = this.formBuilder.group({
      name: [userService.user?.name, [Validators.required]],
    });
  }
  setName() {
    if (!this.userForm.valid) {
      alert('Ingresa un Alias');
      return;
    }
    this.userService.updateUser(this.userForm.value['name']);
  }
}
