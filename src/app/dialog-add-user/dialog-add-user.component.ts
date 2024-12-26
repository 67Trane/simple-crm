import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()], // Native Date Adapter bereitstellen
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,

  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  loading = false;
  user = new User();
  birthDate: Date = new Date();

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>){

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    console.log('current user is ', this.user)
    this.loading = true

    this.addUser()
  }

  addUser() {
    const usersCollection = collection(this.firestore, 'users'); // Referenz zur "users"-Collection

    addDoc(usersCollection, this.user.toJSON())
      .then((result) => {
        this.loading = false
        console.log('User added successfully', result);
        this.dialogRef.close()
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });
  }
}
