package com.blogapp.Blog_Backend.Services;

import com.blogapp.Blog_Backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);
    List<User> getAllUser();
    boolean deleteUser(String email);
    Optional<User> getUserByEmail(String email);
    User getUserByEmailAndPassword(String email, String Password);
}
