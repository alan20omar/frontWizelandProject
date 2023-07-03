import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  text: string = '';
  socketSub!: Subscription;
  @ViewChild('alerta') alerta!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.userService.setUser();
    this.userForm = this.formBuilder.group({
      name: [userService.user?.name, [Validators.required]],
    });
    this.socketSub = this.userService.socketMsgSubject.subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.text = res;
        this.activateMsg();
      }
    });
  }
  setName() {
    if (!this.userForm.valid) {
      alert('Ingresa un Alias');
      return;
    }
    this.userService.updateUser(this.userForm.value['name']);
  }
  ngOnInit(): void {
    
  };
  activateMsg() {
    this.alerta.nativeElement.classList.remove('d-none');
    this.alerta.nativeElement.classList.add('d-block');
    setTimeout(() => {
      this.alerta.nativeElement.classList.remove('d-block');
      this.alerta.nativeElement.classList.add('d-none');
    }, 5000);
  };
  ngOnDestroy(): void {
    this.socketSub.unsubscribe();
  };
}
