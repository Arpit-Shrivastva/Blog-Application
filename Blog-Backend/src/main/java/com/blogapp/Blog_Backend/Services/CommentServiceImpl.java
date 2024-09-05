package com.blogapp.Blog_Backend.Services;

import com.blogapp.Blog_Backend.Model.Comment;
import com.blogapp.Blog_Backend.Model.Post;
import com.blogapp.Blog_Backend.Repository.CommentRepository;
import com.blogapp.Blog_Backend.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public Comment saveComment(Long postId, String postedBy, String content) {

        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Comment comment = new Comment();

            comment.setPost(optionalPost.get());
            comment.setContent(content);
            comment.setPostedBy(postedBy);
            comment.setCreatedAt(new Date());

            return commentRepository.save(comment);
        }
        return null;
    }


    @Override
    public List<Comment> commentPostById(Long id) {
        return commentRepository.findByPostId(id);
    }
}