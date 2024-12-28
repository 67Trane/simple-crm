import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatDialogModule, FormsModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  allUsers = [];


  constructor(public dialog: MatDialog, private firestore: Firestore) {

  }

  ngOnInit(): void {
    // Referenz zur 'users'-Sammlung
    const usersCollection = collection(this.firestore, 'users');

    // Echtzeit-Daten abrufen
    collectionData(usersCollection, { idField: 'id' }).subscribe((changes: any) => {
      console.log('Received changes:', changes);
      this.allUsers = changes;
      console.log(this.allUsers);
    });
  }



  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
