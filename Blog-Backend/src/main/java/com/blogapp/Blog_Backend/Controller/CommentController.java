package com.blogapp.Blog_Backend.Controller;


import com.blogapp.Blog_Backend.Services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RequestMapping("api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestParam Long postId,
                                           @RequestParam String postedBy,
                                           @RequestParam String content) {
        return ResponseEntity.ok(commentService.saveComment(postId, postedBy, content));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentById(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.commentPostById(id));
    }
}
