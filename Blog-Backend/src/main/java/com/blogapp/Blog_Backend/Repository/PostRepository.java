package com.blogapp.Blog_Backend.Repository;


import com.blogapp.Blog_Backend.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByName(String name);
}
