import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { Register } from 'src/app/model/register';
import { PostService } from 'src/app/services/post.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private postService: PostService
  ) { }

  post: Post[] = [];

  searchTerm: string = '';
  filteredPost: any[] = [];

  ngOnInit(): void {
    // Fetch all posts
    this.postService.getAllPost().subscribe(
      (data) => {
        this.post = data;
        this.filteredPost = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  onSearch() {
    this.filteredPost = this.post.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



}