import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { FollowersComponent } from '../../../followers/followers.component';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {
  userId : number = 0;
  user : User = {} as User;
  followersCount: number = 0;
  followingCount: number = 0;
  blockedCount: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    this.getUserDetails(this.userId).subscribe(data => {
      this.user = data as User;
      console.log(this.user.name);
    });

  }
    // this.route.params.subscribe(params => {
    //   this.userId =+ params['id']; // O '+' converte a string para um número
    // });
  getUserDetails(userId: number) {
      return this.http.get(`/users/${userId}`);
  }

  public createItem(): void {
    // Implementação do método createItem
  }

  public followersButton(): void {
    // Agora, quando este método for chamado, this.userId já terá um valor definido
    this.router.navigate([`/users/${this.userId}/followers`]);
  }

  public followingButton(): void {
    this.router.navigate([`/users/${this.userId}/following`]);
  }

  updateFollowersCount(count: number) {
    this.followersCount = count;
  }
  
  updateFollowingCount(count: number) {
    this.followingCount = count;
  }
  
  updateBlockedCount(count: number) {
    this.blockedCount = count;
  }
}