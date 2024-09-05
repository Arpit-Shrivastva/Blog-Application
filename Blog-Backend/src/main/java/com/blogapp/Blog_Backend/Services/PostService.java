package com.blogapp.Blog_Backend.Services;

import com.blogapp.Blog_Backend.Model.Post;

import java.util.List;

public interface PostService {

    Post savePost(Post post);

    List<Post> getAllPost();

    Post getPostById(Long id);

    Post likePost(Long id);

    List<Post> getPostByName(String name);
}
