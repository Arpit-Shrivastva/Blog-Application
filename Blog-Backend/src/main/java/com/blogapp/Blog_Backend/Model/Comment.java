package com.blogapp.Blog_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;


@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String content;
    private Date createdAt;
    private String postedBy;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private Post post;
}
