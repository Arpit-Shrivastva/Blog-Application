import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private form: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  postForm = this.form.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    content: ["", [Validators.required, Validators.maxLength(5000), Validators.minLength(15)]],
    postedBy: ["", [Validators.required]],
    img: ["", [Validators.required]],
    tags: []
  })


  onSubmit(){
    const postData: Post = this.postForm.value as unknown as Post;
    const fData = new FormData();

    fData.append('userData', JSON.stringify(postData));

    this.postService.createPost(postData).subscribe({
      next: data => {
        this.snackBar.open('Posted Successful', 'Close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'blue']
        });
        this.router.navigateByUrl("/");
      }, error(err) {
        alert("Something Went Wrong");
      }
    })
  }


}
