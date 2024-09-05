package com.blogapp.Blog_Backend.Model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    private String email;
    private String fname;
    private String lname;
    private String password;
    private String gender;
    private String image;
    private Date date;
    private Long number;
}
