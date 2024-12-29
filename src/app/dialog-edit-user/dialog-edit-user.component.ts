import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  loading: boolean = false;
  user: User = new User();
  birthDate: Date = new Date();
  userId: string = '';


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore,) {

  }


  saveUser() {
    this.loading = true;
    const docRef = doc(this.firestore, `users/${this.userId}`);
    updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
