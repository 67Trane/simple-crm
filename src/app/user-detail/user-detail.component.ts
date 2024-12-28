import { Component, OnInit } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id')
      console.log('got id ', this.userId)
      this.getUser();
    })
  }

  getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    docData(userDocRef).subscribe(
      (user: any) => {
        this.user = user;
        console.log('Fetched user:', this.user);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }


  editMenu() {

  }

  editUserDetail() {
    
  }
}
