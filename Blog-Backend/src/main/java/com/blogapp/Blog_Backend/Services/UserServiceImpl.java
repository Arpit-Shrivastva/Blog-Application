package com.blogapp.Blog_Backend.Services;


import com.blogapp.Blog_Backend.Model.User;
import com.blogapp.Blog_Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User saveUser(User user) {
        user.setDate(new Date());
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public boolean deleteUser(String email) {
        return true;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findById(email);
    }

    @Override
    public User getUserByEmailAndPassword(String email, String Password) {
        return userRepository.findByEmailAndPassword(email, Password);
    }
}
