package com.blogapp.Blog_Backend.Controller;


import com.blogapp.Blog_Backend.Model.Post;
import com.blogapp.Blog_Backend.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@RequestMapping("api/v1/post")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/save")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return new ResponseEntity<>(postService.savePost(post), HttpStatus.CREATED);
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<Post>> getAllPost() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getAllPost());
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(post);
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        postService.likePost(id);
        return ResponseEntity.ok(new String[]{"Post liked successfully"});
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> searchByName(@PathVariable String name) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getPostByName(name));
    }

}
