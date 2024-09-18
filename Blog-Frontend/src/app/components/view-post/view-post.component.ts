import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  post?: Post;
  submitStatus: boolean = false;
  id: number | undefined = this.post?.id;
  postId: any;
  commentData?: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let postId = paramMap.get('id') ?? 0;

      if (postId) {
        this.postService.getPostById(+postId).subscribe(
          (data) => {
            this.post = data;
            this.id = data.id;
            this.submitStatus = false;

            if (this.id != null) {
              this.commentService.getComment(this.id).subscribe(
                (res) => {
                  this.commentData = res;
                },
                (err) => {
                  console.error('Error fetching comments:', err);
                }
              );
            }
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }


  onlike() {
    if (this.id != null) {  // Checks for both null and undefined
      this.postService.getlikeById(this.id).subscribe(
        (data) => {
          window.location.reload();
        },
        (err) => {
          console.error('Error liking the post:', err);
        }
      );
    } else {
      console.error('Post ID is undefined or null, cannot like the post');
    }
  }


  commentForm = this.formBuilder.group({
    postedBy: ["", Validators.required],
    content: ["", Validators.required]
  })

  comment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    if (!postedBy || !content) {
      console.error('Posted by and content fields cannot be empty');
      return;
    }

    if (this.id != null) {
      this.commentService.postComment(this.id, postedBy, content).subscribe(
        (res) => {
          console.log('Comment posted successfully:', res);
          this.commentForm.reset();
        },
        (err) => {
          console.error('Error posting comment:', err);
        }
      );
    } else {
      console.error('Post ID is null, cannot submit comment');
    }
  }



}
