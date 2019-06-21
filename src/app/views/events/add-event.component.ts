import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
// import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
 };
 
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ]
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AvatarDialogComponent, {
  //     height: '400px',
  //     width: '400px',
  //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     this.avatarLink = result.link;
    //   }
    // });
    // }

  resetFields() {
    this.avatarLink = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.eventService.createEvent(value, this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/events']);
      }
    );
  }

}
