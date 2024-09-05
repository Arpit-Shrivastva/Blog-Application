package com.blogapp.Blog_Backend.Services;

import com.blogapp.Blog_Backend.Model.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {

    Comment saveComment(Long postId, String postedBy, String content);

    List<Comment> commentPostById(Long id);
}
